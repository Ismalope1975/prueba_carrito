import React, { useState } from 'react';
import { db } from '/src/firebase/config';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { Button, Form, Alert, Spinner, Row, Col, Table } from 'react-bootstrap';
import './Rastreo.css';  // Importa el archivo CSS con los estilos personalizados

const Rastreo = () => {
  const [searchValue, setSearchValue] = useState('');  // Estado para guardar el número de orden o documento ingresado
  const [orderData, setOrderData] = useState(null);  // Estado para guardar la data del pedido
  const [loading, setLoading] = useState(false);  // Estado para manejar el spinner de carga
  const [error, setError] = useState('');  // Estado para manejar los errores

  const handleSearchValueChange = (e) => {
    setSearchValue(e.target.value);  // Actualiza el valor cuando cambia el input
  };

  const handleSearchOrder = async () => {
    if (!searchValue) {
      setError('Por favor ingrese un número de orden o documento.');
      return;
    }

    setLoading(true);
    setError('');  // Limpiar errores previos
    setOrderData(null);  // Limpiar los datos previos de la orden

    try {
      // Buscar primero por el número de orden (si es un número)
      const orderQuery = query(
        collection(db, 'orders'),
        where('orderNumber', '==', searchValue)
      );

      const querySnapshot = await getDocs(orderQuery);

      if (!querySnapshot.empty) {
        // Si se encuentra alguna orden con el número de orden
        querySnapshot.forEach((doc) => {
          setOrderData(doc.data());
        });
      } else {
        // Si no se encuentra por número de orden, buscar por documento del cliente
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
      setLoading(false);  // Detener el estado de carga
    }
  };

  const calculateSubtotalWithoutIVA = (price, quantity) => {
    return (price / 1.22) * quantity;  // Calculamos el subtotal sin IVA
  };

  const calculateIVA = (subtotalWithoutIVA) => {
    return subtotalWithoutIVA * 0.22;  // Calculamos el IVA (22%)
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
    <div className="container-fluid mt-2 custom-background"> {/* Aplicar clase personalizada */}
      {/* Fila para el formulario de búsqueda */}
      <Row className="mb-4">
        <Col className="d-flex justify-content-start">
          <Form.Control
            type="text"
            placeholder="Número de orden o Documento s/guión"
            value={searchValue}
            onChange={handleSearchValueChange}
            style={{ maxWidth: '320px' }} // Hacemos el input más pequeño
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
                    <td>{(item.price / 1.22).toFixed(2)}</td> {/* Mostrar precio sin IVA */}
                    <td>{(calculateSubtotalWithoutIVA(item.price, item.quantity)).toFixed(2)}</td> {/* Subtotal sin IVA */}
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
