import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Row, Col, Spinner } from 'react-bootstrap'; 
import productos from "../arrayproductos";
import Producto from "./producto"; 

const Productos = () => {
  const { categoria } = useParams();  // Obtener la categoría desde la URL
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Hook para redireccionar

  useEffect(() => {
    setLoading(true);
    setError(null); // Resetear error cuando se cambia la categoría

    const productosFiltrados = productos.filter(
      (producto) => producto.categoria === categoria
    );

    if (productosFiltrados.length === 0) {
      // Si no hay productos para esa categoría, redirigir a NoPage
      navigate('/nopage', { replace: true });
    } else {
      setProductosFiltrados(productosFiltrados);
    }

    setLoading(false);
  }, [categoria, navigate]);

  if (loading) {
    return <Spinner animation="border" variant="primary" />;
  }

  return (
    <div id="container">
      <h1 className="titulo-blanco">Productos en la categoría: {categoria}</h1>
      {productosFiltrados.length > 0 ? (
        <Row>
          {productosFiltrados.map((producto) => (
            <Col key={producto.id} sm={12} md={6} lg={3}>
              <Producto
                id={producto.id}
                nombre={producto.nombre}
                descripcion={producto.descripcion}
                precio={producto.precio}
                imagen={producto.imagen} 
              />
            </Col>
          ))}
        </Row>
      ) : (
        <p>No se encontraron productos en esta categoría.</p>
      )}
    </div>
  );
};

export default Productos;

