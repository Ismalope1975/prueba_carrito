import React from 'react';
import Logo from "../Logo/Logo";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaTelegram } from 'react-icons/fa';
import './Footer.css';

function Footermp() {
  return (
    <footer className="footer">
      <div className="footer-section">
        <Logo />
      </div>
      <div className="footer-section social-icons">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
          <FaFacebook size={30} />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <FaTwitter size={30} />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          <FaInstagram size={30} />
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
          <FaLinkedin size={30} />
        </a>
        <a href="https://telegram.org" target="_blank" rel="noopener noreferrer">
          <FaTelegram size={30} />
        </a>
      </div>
      <div className="footer-section contact-info">
        <p>Dirección: Calle Falsa 123, Ciudad, País</p>
        <p>Teléfono: +123 456 7890</p>
        <p>Localidad: Montevideo, Uruguay</p>
      </div>
      <div className="footer-section">
        <p>Contacto: contacto@ejemplo.com</p>
        <form>
          <input type="email" placeholder="Tu correo electrónico" />
          <button type="submit">Registrarse</button>
        </form>
      </div>
    </footer>
  );
}

export default Footermp;
