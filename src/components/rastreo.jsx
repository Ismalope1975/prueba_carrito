import React, { useState } from 'react';
import { db } from '/src/firebase/config';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { Button, Form, Alert, Spinner, Row, Col, Table } from 'react-bootstrap';
import '../components/rastreo.css'; 

const Rastreo = () => {
  const [searchValue, setSearchValue] = useState('');  
  const [orderData, setOrderData] = useState(null);  
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState('');  

  const handleSearchValueChange = (e) => {
    setSearchValue(e.target.value);  
  };

  const handleSearchOrder = async () => {
    if (!searchValue) {
      setError('Por favor ingrese un número de orden o documento.');
      return;
    }

    setLoading(true);
    setError(''); 
    setOrderData(null);  

    try {
     
      const orderQuery = query(
        collection(db, 'orders'),
        where('orderNumber', '==', searchValue)
      );

      const querySnapshot = await getDocs(orderQuery);

      if (!querySnapshot.empty) {
       
        querySnapshot.forEach((doc) => {
          setOrderData(doc.data());
        });
      } else {
       
        const documentQuery = query(
          collection(db, 'orders'),
          where('customer.document', '==', searchValue)
        );

        const documentSnapshot = await getDocs(documentQuery);

        if (!documentSnapshot.empty) {
          documentSnapshot.forEach((doc) => {
            setOrderData(doc.data());
          });
        } else {
          setError('No se encontró ningún pedido con ese número de orden o documento.');
        }
      }
    } catch (err) {
      setError('Hubo un error al buscar la orden. Intente nuevamente.');
      console.error('Error al buscar la orden:', err);
    } finally {
      setLoading(false);  
    }
  };

  const calculateSubtotalWithoutIVA = (price, quantity) => {
    return (price / 1.22) * quantity; 
  };

  const calculateIVA = (subtotalWithoutIVA) => {
    return subtotalWithoutIVA * 0.22;  // IVA (22%)
  };

  const calculateTotal = () => {
    if (!orderData) return 0;
    return orderData.items.reduce((total, item) => total + calculateSubtotalWithoutIVA(item.price, item.quantity), 0);
  };

  const calculateIVATotal = () => {
    if (!orderData) return 0;
    return orderData.items.reduce((total, item) => total + calculateIVA(calculateSubtotalWithoutIVA(item.price, item.quantity)), 0);
  };

  const calculateGrandTotal = () => {
    return calculateTotal() + calculateIVATotal();
  };

  return (
    <div className="container-fluid mt-2 custom-background"> 
   
      <Row className="mb-4">
        <Col className="d-flex justify-content-start">
          <Form.Control
            type="text"
            placeholder="Número de orden o Documento s/guión"
            value={searchValue}
            onChange={handleSearchValueChange}
            style={{ maxWidth: '320px' }} 
          />
          <Button
            variant="primary"
            onClick={handleSearchOrder}
            disabled={loading}
            className="ml-2"
          >
            {loading ? <Spinner as="span" animation="border" size="sm" /> : 'Buscar'}
          </Button>
        </Col>
      </Row>

      {error && <Alert variant="danger">{error}</Alert>}

      {orderData && (
        <Row>
          <Col md={6}>
            <h4>Detalles del Pedido</h4>
            <Table>
              <tbody>
                <tr>
                  <th>Orden Número</th>
                  <td>{orderData.orderNumber}</td>
                </tr>
                <tr>
                  <th>Total</th>
                  <td>{orderData.totalAmount}</td>
                </tr>
                <tr>
                  <th>Fecha de la Orden</th>
                  <td>{new Date(orderData.orderDate).toLocaleString()}</td>
                </tr>
                <tr>
                  <th>Estado</th>
                  <td>{orderData.status}</td>
                </tr>
                <tr>
                  <th>Detalles del Cliente</th>
                  <td>
                    <ul>
                      <li>Nombre: {orderData.customer.name}</li>
                      <li>Documento: {orderData.customer.document}</li>
                      <li>Dirección: {orderData.customer.address}</li>
                      <li>Email: {orderData.customer.email}</li>
                      <li>Teléfono: {orderData.customer.phone}</li>
                      <li>Observaciones: {orderData.customer.observations}</li>
                    </ul>
                  </td>
                </tr>
              </tbody>
            </Table>
          </Col>

          <Col md={6}>
            <h4>Artículos</h4>
            <Table striped bordered>
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Código</th>
                  <th>Cantidad</th>
                  <th>Precio Unitario</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {orderData.items.map((item, index) => (
                  <tr key={index}>
                    <td>{item.productName}</td>
                    <td>{item.productCode}</td>
                    <td>{item.quantity}</td>
                    <td>{(item.price / 1.22).toFixed(2)}</td> {/* precio sin IVA */}
                    <td>{(calculateSubtotalWithoutIVA(item.price, item.quantity)).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </Table>

            <div className="d-flex justify-content-between">
              <div><strong>Subtotal (sin IVA)</strong></div>
              <div>${calculateTotal().toFixed(2)}</div>
            </div>
            <div className="d-flex justify-content-between">
              <div><strong>IVA (22%)</strong></div>
              <div>${calculateIVATotal().toFixed(2)}</div>
            </div>
            <div className="d-flex justify-content-between mt-2">
              <div><strong>Total</strong></div>
              <div>${calculateGrandTotal().toFixed(2)}</div>
            </div>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default Rastreo;
