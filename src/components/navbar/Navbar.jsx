import React from 'react';
import { Link } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import Logo from "../Logo/Logo";
import CartWidget from "../cartwidget/CartWidget"; 
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './navbar.css';

function NavScrollExample() {
  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand as={Link} to="/">
          <Logo />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" navbarScroll>
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <NavDropdown title="Productos" id="navbarScrollingDropdown">
              <NavDropdown.Item as={Link} to="category/instrumentos">Instrumentos</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="category/consolas">Consolas</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="category/amplificadores">Amplificación</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="category/accesorios">Accesorios</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="category/varios">Varios speakers y Monitores</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link as={Link} to="/sucursales">Sucursales</Nav.Link>
            <Nav.Link as={Link} to="/nosotros">Sobre Nosotros</Nav.Link>
            <Nav.Link as={Link} to="/contacto">Contacto</Nav.Link>
          </Nav>

          <Outlet />

          {/* Barra de búsqueda con margen a la derecha para crear más espacio para el carrito */}
          <Form className="d-flex me-3"> {/* `me-3` agrega margen a la derecha */}
            <Form.Control
              type="search"
              placeholder="Buscar"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Buscar</Button>
          </Form>

          
          <CartWidget />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavScrollExample;
