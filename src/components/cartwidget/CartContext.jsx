import React, { createContext, useContext, useState } from 'react';

// contexto del carrito
const CartContext = createContext();

// provider del carrito
export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);  // array de productos

    // Función para agregar un producto al carrito
    const addItem = (producto, quantity) => {
        const productInCart = cart.find(item => item.id === producto.id);
                
        if (productInCart) {
            // Si el producto ya está en el carrito, actualizamos la cantidad
            setCart(cart.map(item =>
                item.id === producto.id
                    ? { ...item, quantity: item.quantity + quantity }
                    : item
            ));
        } else {
            // Si el producto no está en el carrito, lo agregamos
            setCart([...cart, { ...producto, quantity }]);
        }
    };

    // Función para limpiar el carrito
    const clear = () => {
        setCart([]);
    };

    // Función para eliminar un producto del carrito por ID
    const removeItem = (id) => {
        setCart(cart.filter(item => item.id !== id)); 
    };

    // Función para verificar si un producto ya está en el carrito
    const isInCart = (id) => {
        return cart.some(item => item.id === id);
    };

    // función para actualizar la cantidad de un producto
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

// Hook para usar el contexto del carrito
export const useCart = () => useContext(CartContext);
