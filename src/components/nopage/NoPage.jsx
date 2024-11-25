import './NoPage.css'; // Asegúrate de importar los estilos CSS

import { Link } from "react-router-dom"

function NoPage() {
  return (
    
     <div className="error-page">
      <div className="error-content">
        <h1>404</h1>
        <p>¡Oops! La página que buscas no existe.</p>
        <Link to={"/"}>Volver</Link>
    </div>
    </div>
  )
}

export default NoPage