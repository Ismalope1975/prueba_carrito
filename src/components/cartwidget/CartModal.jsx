import React from 'react';
import { Modal, Button, ListGroup, Row, Col, Image } from 'react-bootstrap';
import { useCart } from './CartContext';

function CartModal({ show, handleClose, currency = 'USD', orderNumber = '12345' }) {
  const { cart, removeItem, clear } = useCart();

  // Formato para mostrar precios correctamente
  const formatoPrecio = new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: currency,
  });

  // Función para confirmar la acción de limpiar el carrito
  const handleClearCart = () => {
    if (window.confirm("¿Estás seguro de que deseas limpiar todo el carrito?")) {
      clear();  // Llamamos a la función clear
    }
  };

  // Calcular el total del carrito considerando las cantidades
  const totalCarrito = cart.reduce((total, item) => total + (item.precio * item.quantity), 0);

  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      size="lg"  // tamaño grande para el modal
    >
      <Modal.Header closeButton>
        <Modal.Title className="w-100">
          <Row className="w-100">
            <Col xs={6} className="text-start">
              <Image src="../public/img/designer.png" alt="Logo" fluid style={{ maxHeight: '130px' }} />
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
            {/* Encabezados para la tabla */}
            <Row className="fw-bold mb-3 border-bottom pb-2">
              <Col xs={4} md={4} lg={4}>Nombre</Col> {/* Columna "Nombre" ajustada */}
              <Col xs={2} className="text-center">Precio U.</Col>
              <Col xs={2} className="text-center">Cantidad</Col>
              <Col xs={2} className="text-center">Subtotal</Col>
              <Col xs={2}></Col> {/* Espacio para el botón eliminar */}
            </Row>

            {/* Productos en el carrito */}
            {cart.map((item) => (
              <ListGroup.Item key={item.id} className="d-flex justify-content-between align-items-center border-bottom">
                <Row className="w-100">
                  <Col xs={4} md={4} lg={4} className="text-start" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {item.nombre}
                  </Col> {/* Alineado a la izquierda, con control de desbordamiento */}
                  <Col xs={2} className="text-center">{formatoPrecio.format(item.precio)}</Col>
                  <Col xs={2} className="text-center">{item.quantity}</Col>
                  <Col xs={2} className="text-center" style={{ fontWeight: 'bold' }}>
                    {formatoPrecio.format(item.precio * item.quantity)}
                  </Col>
                  <Col xs={2} className="text-end">
                    <Button 
                      variant="danger" 
                      size="sm" 
                      onClick={() => removeItem(item.id)} 
                      className="ms-3"
                      style={{ marginTop: '1px', marginBottom: '2px'}}  // Leve separación vertical
                    >
                      Eliminar
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
        <Button variant="primary" onClick={() => alert('Compra finalizada')} className="ms-2">
          Finalizar la compra
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CartModal;