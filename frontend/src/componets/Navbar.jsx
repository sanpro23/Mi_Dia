
import { Link } from "react-router-dom";


const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <img src="/ImagenPegada.png" alt="Descripción de la imagen" />
        </div>
        <ul className="nav-menu">
           <li className="navbar-item">
            <Link to="/" className="navbar-link">
              Inicio
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/calendario" className="navbar-link">
              CALENDARIO
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/eventos" className="navbar-link">
              EVENTOS
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/contacto" className="navbar-link">
              CONTACTO
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/tareas" className="navbar-link">
              TAREAS
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/notas" className="navbar-link">
              NOTAS
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/compras" className="navbar-link">
              COMPRAS
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};
export default Navbar;
