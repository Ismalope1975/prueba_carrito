import React, { useState } from 'react'; 
import { Link, useNavigate } from 'react-router-dom';
import Logo from "../logo/Logo";
import CartWidget from "../cartwidget/CartWidget"; 
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './navbar.css';

function NavScrollExample() {
  const [searchTerm, setSearchTerm] = useState(''); 
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <Navbar className="lightcolor" expand="lg">
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
            <Nav.Link as={Link} to="/rastreo">Rastreo de Pedido</Nav.Link>
            <Nav.Link as={Link} to="/sucursales">Sucursales</Nav.Link>
            <Nav.Link as={Link} to="/nosotros">Sobre Nosotros</Nav.Link>
            <Nav.Link as={Link} to="/contacto">Contacto</Nav.Link>
          </Nav>

          {/* Barra de búsqueda */}
          <Form className="d-flex me-3" onSubmit={handleSearch}> 
            <Form.Control
              type="search"
              placeholder="Buscar"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success" type='submit'>Buscar</Button>
          </Form>

          <CartWidget />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavScrollExample;
