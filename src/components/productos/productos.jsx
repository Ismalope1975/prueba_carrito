import React from 'react';
import { Row, Col, Spinner } from 'react-bootstrap';
import Producto from "./producto";
import { useProducts } from './useProducts';
import './producto.css'; 

const Productos = () => {
  const { productos, loading, categoria, error } = useProducts();
 
  
  if (loading) {
    return <Spinner animation="border" variant="primary" />;
  }

 
  if (error) {
    return <p>{error}</p>;
  }

  
  let mensaje;
  if (productos.length === 0) {
    if (categoria) {
      mensaje = `No se encontraron productos en la categoría: "${categoria}".`;
    } else {
      mensaje = `No se encontraron productos con ese nombre.`;
    }
  }

  const alignLeft = productos.length < 4;

  return (
    <div id="container">
      <h3 className="titulo-blanco">
        {categoria ? `Productos en la categoría: ${categoria}` : `Resultados de la búsqueda`}
      </h3>

      {mensaje ? (
        <p>{mensaje}</p>
      ) : (
        <Row >
          {productos.map((producto) => (
            <Col key={producto.id} className="producto-columna">
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
      )}
    </div>
  );
};

export default Productos;
