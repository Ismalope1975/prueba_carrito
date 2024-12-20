import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { Container, Row, Col, Button, Spinner } from 'react-bootstrap';
import { useCart } from './cartwidget/CartContext';
import { doc, getDoc } from "firebase/firestore";
import { db } from '/src/firebase/config.js'; 
import './DetalleProductoCarrito.css'; 
import { useNavigate } from 'react-router-dom';  
import { FaArrowLeft } from 'react-icons/fa'; 
import Swal from 'sweetalert2';  

function DetalleProductoCarrito() {
    const { id } = useParams();
    const { addItem, isInCart } = useCart();  
    const navigate = useNavigate();  

    const [producto, setProducto] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [quantity, setQuantity] = useState(1); 
    const [stockRestante, setStockRestante] = useState(0); 

    useEffect(() => {
        const fetchProducto = async () => {
            setLoading(true);
            setError(null);

            try {
                const docRef = doc(db, "productos", id);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const productoData = docSnap.data();
                    setProducto({ id: docSnap.id, ...productoData });
                    setStockRestante(productoData.stock);  
                } else {
                    
                    Swal.fire({
                        icon: 'error',
                        title: 'Producto no encontrado',
                        text: '¡El producto no existe en nuestra base de datos!',
                    });
                }
            } catch (error) {
               
                Swal.fire({
                    icon: 'error',
                    title: 'Error al cargar el producto',
                    text: 'Hubo un problema al cargar la información del producto.',
                });
            }

            setLoading(false);
        };

        fetchProducto();
    }, [id]);

  
    const handleQuantityChange = (e) => {
        const value = Number(e.target.value);
        if (value < 1) {
            Swal.fire({
                icon: 'error',
                title: 'Cantidad no válida',
                text: 'La cantidad no puede ser menor a 1.',
            });
            setQuantity(1);
        } else if (value > stockRestante) {
            Swal.fire({
                icon: 'error',
                title: 'Stock insuficiente',
                text: `La cantidad máxima es ${stockRestante}.`,
            });
            setQuantity(stockRestante);
        } else {
            setQuantity(value);
        }
    };

   
    const handleAddToCart = () => {
        if (quantity > stockRestante) {
            Swal.fire({
                icon: 'error',
                title: 'Stock insuficiente',
                text: `Puede solicitar hasta ${stockRestante} unidades.`,
            });
            return;
        }

      
        if (producto) {
            addItem(producto, quantity);
           
            const stockActualizado = stockRestante - quantity;
            setStockRestante(stockActualizado);
        }
    };

    
    const isButtonDisabled = stockRestante === 0;

    if (loading) {
        return <Spinner animation="border" variant="primary" />;
    }

    return (
        <Container>
            <Row className="mt-1">
                {/* izquierda: Imagen grande */}
                <Col xs={12} md={6} className="d-flex justify-content-center align-items-center">
                    <img 
                        src={producto.imagen} 
                        alt={producto.nombre}
                        className="img-fluid product-image"  
                    />
                </Col>
                
                {/*  derecha: Detalles del producto */}
                <Col xs={12} md={6} className="product-details"> 
                    <h2>{producto.nombre}</h2>
                    <p>{producto.descripcion}</p>
                    <p className="product-price">Precio: {producto.precio} US$</p>

                  
                    <p className="product-stock">Stock disponible: {stockRestante}</p>

                   
                    <div className="mb-3">
                        <label htmlFor="quantity" className="form-label">Cantidad</label>
                        <input
                            id="quantity"
                            type="number"
                            value={quantity}
                            min="1"
                            onChange={handleQuantityChange}
                            max={stockRestante}
                            className="form-control"
                            style={{ width: '60px' }} 
                        />
                    </div>

                   
                    {isInCart(producto.id) && (
                        <div className="alert alert-info" role="alert">
                            El producto ya se encuentra en el carrito
                        </div>
                    )}

                   
                    {stockRestante === 0 && (
                        <div className="alert alert-warning" role="alert">
                            Temporalmente sin stock
                        </div>
                    )}

                    
                    <Button 
                        onClick={handleAddToCart}
                        variant="primary"
                        className="add-to-cart-button"  
                        disabled={isButtonDisabled}  
                    >
                        {isInCart(producto.id) ? 'Agregar otra unidad' : 'Agregar al carrito'}
                    </Button>

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
