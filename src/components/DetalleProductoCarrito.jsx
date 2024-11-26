import React, { useState } from 'react';
import productos from "./arrayproductos";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useCart } from './cartwidget/CartContext';

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

    // Validar la cantidad no negativos o inferiores a 1)
    const handleQuantityChange = (e) => {
        const value = Number(e.target.value);
        if (value >= 1) { // Validar que la cantidad sea mayor o igual a 1
            setQuantity(value);
        }
    };

    // Función para agregar al carrito
    const handleAddToCart = () => {
        addItem(producto, quantity); // Aquí pasas el producto y la cantidad
    };

    return (
        <Container>
            <Row>
                <Col xs={12} sm={6} md={4}>
                    <Card>
                        <Card.Img variant="top" src={producto.imagen} />
                        <Card.Body>
                            <Card.Title>{producto.nombre}</Card.Title>
                            <Card.Text>{producto.descripcion}</Card.Text>
                            <Card.Text>{producto.precio}</Card.Text>

                            {/* Control cantidad */}
                            <div>
                                <input
                                    type="number"
                                    value={quantity}
                                    min="1" // que no sea menor a 1
                                    onChange={handleQuantityChange}
                                    max="10" 
                                />
                            </div>

                            {/* Botón para agregar al carrito */}
                            <Button 
                                onClick={handleAddToCart}
                                disabled={isInCart(producto.id)} // Deshabilitar el botón si ya está en el carrito
                            >
                                {isInCart(producto.id) ? 'Ya está en el carrito' : 'Agregar al carrito'}
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default DetalleProductoCarrito;
