import React, { useState } from 'react';
import { Modal, Button, ListGroup, Row, Col, Image, Spinner } from 'react-bootstrap';
import { useCart } from './CartContext';
import { FaPen, FaTrash } from 'react-icons/fa';
import InvoiceModal from './invoicemodal';
import { db, addDoc, collection, doc, getDoc, updateDoc } from '/src/firebase/config';
import Swal from 'sweetalert2';

function CartModal({ show, handleClose, currency = 'USD', orderNumber = 'Previa' }) {
  const { cart, removeItem, clear, updateItemQuantity } = useCart();  
  const [customerData, setCustomerData] = useState({
    name: '',
    document: '',
    address: '',
    phone: '',
    observations: '',
  });
  const [showCustomerModal, setShowCustomerModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editingItem, setEditingItem] = useState(null); 
  const [newQuantity, setNewQuantity] = useState(0); 

  const formatoPrecio = new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: currency,
  });

  const handleClearCart = () => {
    if (window.confirm('¿Estás seguro de que deseas limpiar todo el carrito?')) {
      clear();
    }
  };

  const totalCarrito = cart.reduce((total, item) => total + item.precio * item.quantity, 0);

  const handleContinuePurchase = () => {
    setShowCustomerModal(true);
    handleClose(); 
  };

  const handleConfirmPayment = async () => {
    setLoading(true); 
  
    try {
      const totalCarrito = cart.reduce((total, item) => total + item.precio * item.quantity, 0);
      const orderNumber = `ORD-${Date.now()}`;
      
      const orderData = {
        orderNumber: orderNumber,
        totalAmount: totalCarrito,
        customer: customerData,
        items: cart.map(item => ({
          productId: item.id,
          productName: item.nombre,
          quantity: item.quantity,
          price: item.precio,
          subtotal: item.precio * item.quantity,
        })),
        orderDate: new Date().toISOString(),
        status: 'pendiente',
      };
  
      // Guardar el pedido 
      const orderRef = await addDoc(collection(db, 'orders'), orderData);
  
      
      for (const item of cart) {
        const productRef = doc(db, 'productos', item.id);
        const productSnapshot = await getDoc(productRef);
  
        if (productSnapshot.exists()) {
          const productData = productSnapshot.data();
          const updatedStock = productData.stock - item.quantity;
  
          if (updatedStock < 0) {
            throw new Error(`No hay suficiente stock para el producto: ${item.nombre}`);
          }
  
          await updateDoc(productRef, { stock: updatedStock });
        } else {
          throw new Error(`El producto con ID ${item.id} no se encontró en la base de datos.`);
        }
      }
  
      
      Swal.fire({
        icon: 'success',
        title: '¡Pago confirmado!',
        text: `Su pedido ha sido procesado con éxito. Su número de orden es: ${orderNumber}`,
      });
  
     
      clear();
      setShowCustomerModal(false);
      handleClose();
  
    } catch (error) {
      console.error('Error al guardar la orden o actualizar el stock:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: `Hubo un error al procesar su pedido: ${error.message}. Intente de nuevo más tarde.`,
      });
    }
  
   
    setLoading(false);
  };
  
  
  
  const handleEditQuantity = (item) => {
    setEditingItem(item); 
    setNewQuantity(item.quantity);  
  };

 
  const handleSaveQuantity = () => {
    if (newQuantity > 0) {
     
      updateItemQuantity(editingItem.id, newQuantity);  
      setEditingItem(null); 
    } else {
      alert("La cantidad debe ser mayor que 0.");
    }
  };

  return (
    <>
      {/* Modal del carrito */}
      <Modal show={show} onHide={handleClose} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title className="w-100">
            <Row className="w-100">
              <Col xs={6} className="text-start">
                <Image src="/img/designer.png" alt="Logo" fluid style={{ maxHeight: '130px' }} />
              </Col>
              <Col xs={6} className="text-end">
                <h4>Audiomaster</h4>
                <h6>1234 Calle Falsa, Ciudad, País</h6>
                <div>Número de Orden: {orderNumber}</div>
              </Col>
            </Row>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ border: '1px solid #dee2e6', padding: '20px' }}>
          {cart.length === 0 ? (
            <p>No hay productos en el carrito.</p>
          ) : (
            <>
              <Row className="fw-bold mb-3 border-bottom pb-2">
                <Col xs={4} md={4} lg={4}>Nombre</Col>
                <Col xs={2} className="text-center">Precio U.</Col>
                <Col xs={2} className="text-center">Cantidad</Col>
                <Col xs={2} className="text-center">Subtotal</Col>
                <Col xs={2}></Col>
              </Row>

              {cart.map((item) => (
                <ListGroup.Item key={item.id} className="d-flex justify-content-between align-items-center border-bottom">
                  <Row className="w-100">
                    <Col xs={4} className="text-start" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {item.nombre}
                    </Col>
                    <Col xs={2} className="text-center">{formatoPrecio.format(item.precio)}</Col>
                    <Col xs={2} className="text-center">{item.quantity}</Col>
                    <Col xs={2} className="text-center" style={{ fontWeight: 'bold' }}>
                      {formatoPrecio.format(item.precio * item.quantity)}
                    </Col>
                    <Col xs={2} className="text-end">
                      <Button variant="warning" size="sm" onClick={() => handleEditQuantity(item)} className="ms-2">
                        <FaPen /> {/* Icono de lápiz */}
                      </Button>

                      <Button variant="danger" size="sm" onClick={() => removeItem(item.id)} className="ms-2">
                        <FaTrash /> {/* Icono de papelera */}
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClearCart} className="me-2">
            Limpiar carrito
          </Button>
          <Button variant="secondary" onClick={handleClose} className="me-auto">
            Cerrar
          </Button>
          <div style={{ flex: 1, textAlign: 'right' }}>
            <span><strong>Total: {formatoPrecio.format(totalCarrito)}</strong></span>
          </div>
          <Button variant="primary" onClick={handleContinuePurchase} className="ms-2">
            Continuar la compra
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal para la cantidad */}
      <Modal show={editingItem !== null} onHide={() => setEditingItem(null)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Editar cantidad</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Producto: {editingItem?.nombre}</p>
          <p>Precio: {formatoPrecio.format(editingItem?.precio)}</p>
          <div className="d-flex align-items-center">
            <span>Cantidad:</span>
            <input
              type="number"
              min="1"
              value={newQuantity}
              onChange={(e) => setNewQuantity(Number(e.target.value))}
              className="form-control ms-3"
              style={{ width: '80px' }}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setEditingItem(null)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSaveQuantity}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal para la orden */}
      <InvoiceModal
        show={showCustomerModal}
        handleClose={() => setShowCustomerModal(false)}
        customerData={customerData}
        setCustomerData={setCustomerData}
        handleConfirmData={() => setShowCustomerModal(false)}  
        handleCancelPayment={() => setShowCustomerModal(false)}  
        handleConfirmPayment={handleConfirmPayment}
      />

      {/* Spinner mientras guarda todo*/}
      {loading && (
        <div className="d-flex justify-content-center align-items-center fixed-top w-100 h-100 bg-white bg-opacity-50">
          <Spinner animation="border" variant="primary" />
          <span className="ms-3 fs=2">Actualizando datos...</span>
        </div>
      )}
    </>
  );
}

export default CartModal;
