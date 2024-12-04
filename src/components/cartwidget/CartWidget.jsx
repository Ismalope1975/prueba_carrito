import React, { useState } from 'react';
import { FaShoppingCart } from "react-icons/fa";
import { useCart } from './CartContext'; 
import CartModal from './CartModal'; 
import './CartWidget.css';

function CartWidget() {
  const { cart } = useCart(); 
  const [showModal, setShowModal] = useState(false); 

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

 

  const totalItems =new Set(cart.map(item => item.id)).size;

  return (
    <div className="carrito" style={{ position: 'relative', cursor: 'pointer' }}>
      
      <FaShoppingCart size="30px" onClick={handleShow} />
      
      {/* Badge que muestra la cantidad total de productos en el carrito */}
      {totalItems > 0 && (
       <span className="badge">
       {totalItems}
      </span>
)}

     
      <CartModal show={showModal} handleClose={handleClose} />
    </div>
  );
}

export default CartWidget;
