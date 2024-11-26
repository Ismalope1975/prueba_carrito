import React from 'react';
import { Modal, Button, ListGroup } from 'react-bootstrap';
import { useCart } from './CartContext';

function CartModal({ show, handleClose }) {
  const { cart, removeItem, clear } = useCart();

  // Formato para mostrar precios correctamente
  const formatoPrecio = new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'USD',
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
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Carrito de Compras</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {cart.length === 0 ? (
          <p>No hay productos en el carrito.</p>
        ) : (
          <ListGroup>
            {cart.map((item) => (
              <ListGroup.Item key={item.id}>
                <div>
                  <span>
                    {item.nombre} - {formatoPrecio.format(item.precio)} x {item.quantity} {/* Muestra la cantidad */}
                  </span>
                  <span style={{ marginLeft: '10px', fontWeight: 'bold' }}>
                    {formatoPrecio.format(item.precio * item.quantity)} {/* Total por el artículo */}
                  </span>
                  <Button 
                    variant="danger" 
                    size="sm" 
                    onClick={() => removeItem(item.id)} 
                    className="ml-3"
                  >Eliminar
                  </Button>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Modal.Body>
      <Modal.Footer>
        <div style={{ flex: 1, textAlign: 'right' }}>
          <span><strong>Total: {formatoPrecio.format(totalCarrito)}</strong></span>
        </div>
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
        <Button variant="danger" onClick={handleClearCart}>
          Limpiar carrito
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CartModal;
