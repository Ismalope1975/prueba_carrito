import React from 'react';
import './Sucursales.css'; 

function Sucursales() {
  return (
    <div className="sucursales-container">
      <h1 className='titulo_blanco '>Sucursales de AudioMaster en Uruguay</h1>

      <div className="cards-container">
        <div className="card_sucursal">
          <h2>Sucursal Montevideo - Centro</h2>
          <p><strong>Dirección:</strong> 18 de Julio 1234, Ciudad Vieja, Montevideo, C.P. 11100</p>
          <p><strong>Teléfono:</strong> (2) 1234 5678</p>
          <p><strong>Horario:</strong> Lunes a Viernes de 10:00 a 18:00 hrs. Sábados de 10:00 a 13:00 hrs.</p>
          <p><strong>Descripción:</strong> Ubicada en pleno centro de Montevideo, nuestra tienda ofrece una amplia gama de equipos de audio, desde sistemas para el hogar hasta soluciones profesionales. Contamos con atención personalizada y expertos que te ayudarán a elegir lo mejor para tus necesidades.</p>
        </div>

        <div className="card_sucursal">
          <h2>Sucursal Punta Carretas - Montevideo</h2>
          <p><strong>Dirección:</strong> Av. Arocena 6780, Punta Carretas, Montevideo, C.P. 11300</p>
          <p><strong>Teléfono:</strong> (2) 9876 5432</p>
          <p><strong>Horario:</strong> Lunes a Viernes de 10:00 a 19:00 hrs. Sábados de 10:00 a 14:00 hrs.</p>
          <p><strong>Descripción:</strong> Nuestra sucursal en Punta Carretas se encuentra en una de las zonas más dinámicas de Montevideo. Ofrecemos una selección de productos de audio premium, con equipos de las mejores marcas para satisfacer tanto a aficionados como a profesionales del sonido.</p>
        </div>

        <div className="card_sucursal">
          <h2>Sucursal Ciudad de la Costa - Canelones</h2>
          <p><strong>Dirección:</strong> Ruta Interbalnearia 235, Ciudad de la Costa, Canelones, C.P. 15000</p>
          <p><strong>Teléfono:</strong> (3) 2345 6789</p>
          <p><strong>Horario:</strong> Lunes a Viernes de 9:30 a 18:30 hrs. Sábados de 10:00 a 13:00 hrs.</p>
          <p><strong>Descripción:</strong> En nuestra sucursal de Ciudad de la Costa, ofrecemos productos de audio para todo tipo de necesidades, desde equipos para el hogar hasta soluciones para eventos y profesionales del sonido. Un lugar ideal para quienes buscan calidad y buen servicio en una ubicación conveniente.</p>
        </div>
      </div>
    </div>
  );
}

export default Sucursales;
