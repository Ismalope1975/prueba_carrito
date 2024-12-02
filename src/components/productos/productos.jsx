import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Row, Col, Spinner } from 'react-bootstrap'; 
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from '/src/firebase/config.js'; 
import Producto from "./producto"; 

const Productos = () => {
  const { categoria } = useParams();  
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchProductos = async () => {
      setLoading(true);
      setError(null); 

      try {
        const productosRef = collection(db, "productos");
        const q = query(productosRef, where("categoria", "==", categoria));
        const querySnapshot = await getDocs(q);
        const productosFiltrados = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        if (productosFiltrados.length === 0) {
       
          navigate('/nopage', { replace: true });
        } else {
          setProductosFiltrados(productosFiltrados);
        }
      } catch (error) {
        setError("Error al cargar los productos");
        console.error("Error al obtener los productos: ", error);
      }

      setLoading(false);
    };

    fetchProductos();
  }, [categoria, navigate]);

  if (loading) {
    return <Spinner animation="border" variant="primary" />;
  }

  if (error) {
    return <p>{error}</p>;
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