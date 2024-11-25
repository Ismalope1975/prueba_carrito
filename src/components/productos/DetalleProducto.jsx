import productos from "../arrayproductos";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

function DetalleProducto() {
    const { id } = useParams();

    // Verificar si id es un número válido
    const productId = parseInt(id, 10);
    if (isNaN(productId)) {
        return <div>El id proporcionado no es válido.</div>;
    }

    const producto = productos.find(prod => prod.id === productId);

    if (!producto) {
        return <div>El producto no existe!</div>;
    }
    
    const formatoPrecio = new Intl.NumberFormat('es-ES', {
        style: 'currency',
        currency: 'USD',
    }).format(producto.precio);

    return (
        <Container>
            <h1 className="text-center mb-4">Detalle del producto</h1>
            <Row>
                <Col md={8}>
                    <Card.Img
                        variant="top"
                        src={producto.imagen}
                        alt={producto.nombre}
                        className="img-fluid"
                      
                    />
                </Col>
                <Col md={4}>
                    <Card>
                        <Card.Body>
                            <Card.Title>{producto.nombre}</Card.Title>
                            <Card.Text>{producto.descripcion}</Card.Text>
                            <Card.Text>
                                <strong>{formatoPrecio}</strong>
                            </Card.Text>
                            <Button variant="primary">Agregar al carrito</Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default DetalleProducto;
