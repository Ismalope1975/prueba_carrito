import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavScrollExample from './components/navbar/Navbar';
import Sucursales from './components/sucursales/sucursales.jsx';
import NoPage from './components/nopage/NoPage.jsx';
import Nosotros from './components/nosotros/Nosotros.jsx';
import Contacto from './components/Contacto.jsx';
import Productos from './components/productos/productos.jsx';
import ItemListContainer from './components/home/Home.jsx';
import Footer from './components/footer/Footer'; 
import DetalleProducto from './components/productos/DetalleProducto.jsx';
import { CartProvider } from './components/cartwidget/CartContext.jsx'; 

function App() {
  return (
    <CartProvider> {/* Aquí envolvemos la aplicación con el CartProvider */}
       
      <Router>
        <NavScrollExample />
        <Routes>
          <Route path="/" element={<ItemListContainer greeting="Bienvenido a nuestra tienda Virtual" />} />
          <Route path="category/:categoria" element={<Productos />} />
          <Route path="/sucursales" element={<Sucursales />} /> 
          <Route path="/contacto" element={<Contacto />} /> 
          <Route path="/nosotros" element={<Nosotros />} /> 
          <Route path="/item/:id" element={<DetalleProducto />} />        
         
          <Route path="*" element={<NoPage />} />
        </Routes>
        <Footer />
      </Router>
    </CartProvider>
  );
}

export default App;
