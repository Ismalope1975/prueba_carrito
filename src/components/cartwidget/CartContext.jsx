import React, { createContext, useContext, useState } from 'react';


const CartContext = createContext();


export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);  


    const addItem = (producto, quantity) => {
        const productInCart = cart.find(item => item.id === producto.id);
                
        if (productInCart) {
          
            setCart(cart.map(item =>
                item.id === producto.id
                    ? { ...item, quantity: item.quantity + quantity }
                    : item
            ));
        } else {
          
            setCart([...cart, { ...producto, quantity }]);
        }
    };


    const clear = () => {
        setCart([]);
    };

   
    const removeItem = (id) => {
        setCart(cart.filter(item => item.id !== id)); 
    };


    const isInCart = (id) => {
        return cart.some(item => item.id === id);
    };


    const updateItemQuantity = (id, newQuantity) => {
        setCart(cart.map(item =>
            item.id === id
                ? { ...item, quantity: newQuantity }
                : item
        ));
    };

    return (
        <CartContext.Provider value={{ cart, addItem, isInCart, removeItem, clear, updateItemQuantity }}>
            {children}
        </CartContext.Provider>
    );
};


export const useCart = () => useContext(CartContext);
