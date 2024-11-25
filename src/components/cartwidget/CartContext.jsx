// CartContext.js
import React, { createContext, useContext, useState } from 'react';

// contexto del carrito
const CartContext = createContext();

//  proveedor del carrito
export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);  // array de productos

  const addItem = (producto, cantidad) => {
  const productInCart = cart.find(item => item.id === producto.id);
  
  if (productInCart) {
      setCart(cart.map(item =>
          item.id === producto.id
              ? { ...item, cantidad: item.cantidad + cantidad }
              : item
      ));
  } else {
      setCart([...cart, { ...producto, cantidad }]);
  }

};
    // Función para verificar si un producto ya está en el carrito
    const isInCart = (id) => {
        return cart.some(item => item.id === id);
    };

    return (
        <CartContext.Provider value={{ cart, addItem, isInCart }}>
            {children}
        </CartContext.Provider>
    );
};

// Hook para usar el contexto del carrito
export const useCart = () => useContext(CartContext);
