import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import LogoutButton from "./LogoutButton";

const links = [
  { to: "/", label: "INICIO" },
  { to: "/calendario", label: "CALENDARIO" },
  { to: "/contactos", label: "CONTACTOS" },
  { to: "/tareas", label: "TAREAS" },
  { to: "/notas", label: "NOTAS" },
  { to: "/compras", label: "COMPRAS" },
];

const Navbar = () => {
  const { isAuthenticated } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <img src="/ImagenPegada.png" alt="Descripción de la imagen" />
        </div>

        {isAuthenticated() && (
          <>
            <ul className="nav-menu">
              {links.map((link) => (
                <li key={link.to} className="navbar-item">
                  <Link to={link.to} className="navbar-link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <LogoutButton />
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
