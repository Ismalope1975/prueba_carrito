import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import 'react-credit-cards-2/dist/es/styles-compiled.css';
import Cards from 'react-credit-cards-2';
import Swal from 'sweetalert2';

function InvoiceModal({ show, handleClose, customerData, setCustomerData, handleConfirmData, handleCancelPayment, handleConfirmPayment }) {
  const [cardData, setCardData] = useState({
    number: '',
    expiry: '',
    cvc: '',
  });

  // vaciar los campos cuando se abre el modal
  useEffect(() => {
    if (show) {
      setCustomerData({
        name: '',
        document: '',
        address: '',
        phone: '',
        email: '',  // Agregar campo de correo electrónico
        observations: '',
      });
      setCardData({
        number: '',
        expiry: '',
        cvc: '',
      });
    }
  }, [show, setCustomerData]);

  // manejar el cambio de datos de la tarjeta
  const handleCardChange = (e) => {
    const { name, value } = e.target;
    setCardData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Confirmar los datos del cliente
  const handleConfirmCustomerData = () => {
    if (customerData.name && customerData.document && customerData.address && customerData.phone && customerData.email) {
      handleConfirmData();
      handleConfirmPayment(); 
    } else {
      alert('Por favor, completa todos los campos.');
    }
  };

  // Confirmar pago
  const handlePayment = () => {
    if (cardData.number && cardData.expiry && cardData.cvc) {
      Swal.fire({
        icon: 'success',
        title: '¡Pago confirmado!',
        text: 'Su pedido ha sido procesado con éxito.',
      });
      handleClose(); 
    } else {
      alert('Por favor, completa los datos de la tarjeta.');
    }
  };

  return (
    <>
      {/* Modal para cargar datos del cliente */}
      <Modal show={show} onHide={handleClose} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Datos de facturación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            {/* a la izquierda: Datos del cliente */}
            <Col md={6}>
              <Form>
                <Form.Group controlId="name">
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control
                    type="text"
                    value={customerData.name}
                    onChange={(e) => setCustomerData({ ...customerData, name: e.target.value })}
                    className="border-2 border-primary rounded"
                  />
                </Form.Group>
                <Form.Group controlId="document">
                  <Form.Label>Documento (RUT o C.I.)</Form.Label>
                  <Form.Control
                    type="text"
                    value={customerData.document}
                    onChange={(e) => setCustomerData({ ...customerData, document: e.target.value })}
                    className="border-2 border-primary rounded"
                  />
                </Form.Group>
                <Form.Group controlId="address">
                  <Form.Label>Dirección de Entrega</Form.Label>
                  <Form.Control
                    type="text"
                    value={customerData.address}
                    onChange={(e) => setCustomerData({ ...customerData, address: e.target.value })}
                    className="border-2 border-primary rounded"
                  />
                </Form.Group>
                <Form.Group controlId="phone">
                  <Form.Label>Teléfono de Contacto</Form.Label>
                  <Form.Control
                    type="text"
                    value={customerData.phone}
                    onChange={(e) => setCustomerData({ ...customerData, phone: e.target.value })}
                    className="border-2 border-primary rounded"
                  />
                </Form.Group>
                <Form.Group controlId="email">
                  <Form.Label>Correo Electrónico</Form.Label>
                  <Form.Control
                    type="email"
                    value={customerData.email}
                    onChange={(e) => setCustomerData({ ...customerData, email: e.target.value })}
                    className="border-2 border-primary rounded"
                    placeholder="ejemplo@correo.com"
                  />
                </Form.Group>
                <Form.Group controlId="observations">
                  <Form.Label>Observaciones</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={customerData.observations}
                    onChange={(e) => setCustomerData({ ...customerData, observations: e.target.value })}
                    className="border-2 border-primary rounded"
                  />
                </Form.Group>
              </Form>
            </Col>

            {/* a la derecha: Pasarela de pago */}
            <Col md={6}>
              <Form>
                <Cards
                  cvc={cardData.cvc}
                  expiry={cardData.expiry}
                  focused="number"
                  name={customerData.name}
                  number={cardData.number}
                />
                <Form.Group controlId="cardNumber" className="mt-3">
                  <Form.Label>Número de Tarjeta</Form.Label>
                  <Form.Control
                    type="text"
                    name="number"
                    value={cardData.number}
                    onChange={handleCardChange}
                    maxLength={19}
                    placeholder="XXXX XXXX XXXX XXXX"
                    className="border-2 border-primary rounded"
                  />
                </Form.Group>
                <Form.Group controlId="expiry" className="mt-3">
                  <Form.Label>Fecha de Vencimiento</Form.Label>
                  <Form.Control
                    type="text"
                    name="expiry"
                    value={cardData.expiry}
                    onChange={handleCardChange}
                    maxLength={5}
                    placeholder="MM/AA"
                    className="border-2 border-primary rounded"
                  />
                </Form.Group>
                <Form.Group controlId="cvc" className="mt-3">
                  <Form.Label>CVC</Form.Label>
                  <Form.Control
                    type="text"
                    name="cvc"
                    value={cardData.cvc}
                    onChange={handleCardChange}
                    maxLength={3}
                    placeholder="CVV"
                    className="border-2 border-primary rounded"
                  />
                </Form.Group>
              </Form>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleConfirmCustomerData}>
            Confirmar Datos
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default InvoiceModal;
