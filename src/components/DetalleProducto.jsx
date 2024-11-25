import React, { useState } from 'react';
import productos from "./arrayproductos";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useCart } from './cartwidget/CartContext';

function DetalleProducto() {
    const { id } = useParams();
    const { addItem, isInCart } = useCart();  // Obtener funciones del carrito

    const productId = parseInt(id, 10);
    const producto = productos.find(prod => prod.id === productId);

    // Si el producto no existe, mostrar mensaje de error
    if (!producto) {
        return <div>¡El producto no existe!</div>;
    }

    const [quantity, setQuantity] = useState(1); // Estado para manejar la cantidad

    // Validar la cantidad (ej. no permitir valores negativos o inferiores a 1)
    const handleQuantityChange = (e) => {
        const value = Number(e.target.value);
        if (value >= 1) { // Validar que la cantidad sea mayor o igual a 1
            setQuantity(value);
        }
    };

    // Función para agregar al carrito
    const handleAddToCart = () => {
        addItem(producto, quantity); // Aquí pasas el producto y la cantidad
        console.log('Producto agregado al carrito:', producto);
        console.log('Cantidad seleccionada:', quantity);
        console.log('Estado del carrito:', cart);  // Verificar el estado del carrito
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

                            {/* Control para la cantidad */}
                            <div>
                                <input
                                    type="number"
                                    value={quantity}
                                    min="1" // Asegurarse que no sea menor a 1
                                    onChange={handleQuantityChange}
                                    max="10" // Ejemplo de límite máximo
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

export default DetalleProducto;
