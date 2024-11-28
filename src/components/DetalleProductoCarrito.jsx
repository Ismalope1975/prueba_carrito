import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { Container, Row, Col, Button, Spinner } from 'react-bootstrap';
import { useCart } from './cartwidget/CartContext';
import { doc, getDoc } from "firebase/firestore";
import { db } from '/src/firebase/config.js'; 
import './DetalleProductoCarrito.css'; 
import { useNavigate } from 'react-router-dom';  // Importar useNavigate
import { FaArrowLeft } from 'react-icons/fa';  // Importar el ícono

function DetalleProductoCarrito() {
    const { id } = useParams();
    const { addItem, isInCart } = useCart();  // Obtener funciones del carrito
    const navigate = useNavigate();  // Hook para navegar

    const [producto, setProducto] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [quantity, setQuantity] = useState(1); // Estado para manejar la cantidad

    useEffect(() => {
        const fetchProducto = async () => {
            setLoading(true);
            setError(null);

            try {
                const docRef = doc(db, "productos", id);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setProducto({ id: docSnap.id, ...docSnap.data() });
                } else {
                    setError("¡El producto no existe!");
                }
            } catch (error) {
                setError("Error al cargar el producto");
                console.error("Error al obtener el producto: ", error);
            }

            setLoading(false);
        };

        fetchProducto();
    }, [id]);

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

    if (loading) {
        return <Spinner animation="border" variant="primary" />;
    }

    if (error) {
        return <div>{error}</div>;
    }

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

                    {/* Mostrar mensaje si el producto ya está en el carrito */}
                    {isInCart(producto.id) && (
                        <div className="alert alert-info" role="alert">
                            El producto ya se encuentra en el carrito
                        </div>
                    )}

                    {/* Botón para agregar al carrito */}
                    <Button 
                        onClick={handleAddToCart}
                        variant="primary"
                        className="add-to-cart-button"  
                    >
                        {isInCart(producto.id) ? 'Agregar otra unidad' : 'Agregar al carrito'}
                    </Button>

                    {/* Botón para volver al listado anterior */}
                    <Button 
                        variant="secondary" 
                        className="mt-3" 
                        onClick={() => navigate(-1)}
                    >
                        <FaArrowLeft /> Volver al listado
                    </Button>
                </Col>
            </Row>
        </Container>
    );
}

export default DetalleProductoCarrito;