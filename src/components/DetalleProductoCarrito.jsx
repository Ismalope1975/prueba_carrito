import React, { useState } from 'react';
import productos from "./arrayproductos";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useCart } from './cartwidget/CartContext';
import './DetalleProductoCarrito.css'; 

function DetalleProductoCarrito() {
    const { id } = useParams();
    const { addItem, isInCart } = useCart();  // Obtener funciones del carrito

    const productId = parseInt(id, 10);
    const producto = productos.find(prod => prod.id === productId);

    // Si el producto no existe, mostrar mensaje de error
    if (!producto) {
        return <div>¡El producto no existe!</div>;
    }

    const [quantity, setQuantity] = useState(1); // Estado para manejar la cantidad
    const [error, setError] = useState(null); // Estado para manejar errores de cantidad

    // Validar la cantidad no negativos o inferiores a 1
    const handleQuantityChange = (e) => {
        const value = Number(e.target.value);
        if (value < 1) {
            setError('La cantidad no puede ser menor a 1.');
            setQuantity(1);
        } else if (value > 10) {
            setError('La cantidad máxima es 10.');
            setQuantity(10);
        } else {
            setError(null);
            setQuantity(value);
        }
    };

    // Función para agregar al carrito
    const handleAddToCart = () => {
        addItem(producto, quantity); // pasamos el producto y la cantidad
    };

    return (
        <Container>
            <Row className="mt-1">
                {/* Columna de la izquierda: Imagen grande */}
                <Col xs={12} md={6} className="d-flex justify-content-center align-items-center">
                    <img 
                        src={producto.imagen} 
                        alt={producto.nombre}
                        className="img-fluid product-image"  
                    />
                </Col>
                
                {/* Columna de la derecha: Detalles del producto */}
                <Col xs={12} md={6} className="product-details"> 
                    <h2>{producto.nombre}</h2>
                    <p>{producto.descripcion}</p>
                    <p className="product-price">Precio: {producto.precio} US$</p>

                    {/* Control de cantidad minimo 1 maximo 10*/}
                    <div className="mb-3">
                        <label htmlFor="quantity" className="form-label">Cantidad</label>
                        <input
                            id="quantity"
                            type="number"
                            value={quantity}
                            min="1"
                            onChange={handleQuantityChange}
                            max="10"
                            className="form-control"
                            style={{ width: '60px' }} // Ajuste del input mas chico agregado aqui porque no funcionaba desde css
                        />
                        {error && <small className="error-message">{error}</small>} 
                    </div>

                    {/* Botón para agregar al carrito */}
                    <Button 
                        onClick={handleAddToCart}
                        disabled={isInCart(producto.id)} // Deshabilitar si ya está en el carrito
                        variant="primary"
                        className="add-to-cart-button"  
                    >
                        {isInCart(producto.id) ? 'Ya está en el carrito' : 'Agregar al carrito'}
                    </Button>
                </Col>
            </Row>
        </Container>
    );
}

export default DetalleProductoCarrito;
