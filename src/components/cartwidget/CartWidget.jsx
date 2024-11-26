import React, { useState } from 'react';
import { FaShoppingCart } from "react-icons/fa";
import { useCart } from './CartContext'; // Importar el hook useCart
import CartModal from './CartModal'; // Importar el modal
import './CartWidget.css';

function CartWidget() {
  const { cart } = useCart(); // Obtener el carrito desde el contexto
  const [showModal, setShowModal] = useState(false); // Estado para controlar la visibilidad del modal

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  // Calcular el total de productos en el carrito (sumando las cantidades)

  const totalItems =new Set(cart.map(item => item.id)).size;

  return (
    <div className="carrito" style={{ position: 'relative', cursor: 'pointer' }}>
      {/* Ícono de carrito de compras */}
      <FaShoppingCart size="30px" onClick={handleShow} />
      
      {/* Badge que muestra la cantidad total de productos en el carrito */}
      {totalItems > 0 && (
       <span className="badge">
       {totalItems}
      </span>
)}

      {/* Mostrar el modal si showModal es true */}
      <CartModal show={showModal} handleClose={handleClose} />
    </div>
  );
}

export default CartWidget;
