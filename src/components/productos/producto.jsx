import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'; 
import "./styles.css";

const Producto = ({ id, nombre, descripcion, precio, imagen }) => (
  <Card className="producto-card mb-4">
    {/* Imagen */}
    <Card.Img variant="top" src={imagen} alt={nombre} className="producto-imagen" />
    
    <Card.Body>
      <Card.Title>{nombre}</Card.Title>
      <Card.Text>{descripcion}</Card.Text>
      <Card.Subtitle className="mb-2 text-muted">Precio: ${precio}</Card.Subtitle>
      
      {/* Botón  */}
      <Link to={`/item/${id}`}>
        <Button variant="primary">Ver detalles</Button>
      </Link>
    </Card.Body>
  </Card>
);

export default Producto;
