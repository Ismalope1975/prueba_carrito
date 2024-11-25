import React from 'react';
import Greetings from '../greetings/greetings';
import { Container, Row, Col } from 'react-bootstrap';
import './home.css';

function ItemListContainer({greeting}) {
  return (
    <div className="item-list-container">
      <video className="background-video" autoPlay loop muted>
        <source src="/img/audiotienda.webm" type="video/webm" />
        Su navegador no soporta el formato de video.
      </video>
      <Container>
        <Row className="justify-content-center mt-5 fs-1 ">
          <Col md="auto">
            <Greetings message={greeting} />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ItemListContainer;
