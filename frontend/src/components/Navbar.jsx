import { Link } from "react-router-dom";

const links = [
  { to: "/", label: "INICIO" },
  { to: "/calendario", label: "CALENDARIO" },
  { to: "/contactos", label: "CONTACTOS" },
  { to: "/tareas", label: "TAREAS" },
  { to: "/notas", label: "NOTAS" },
  { to: "/compras", label: "COMPRAS" },
];

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <img src="/ImagenPegada.png" alt="Descripción de la imagen" />
        </div>

        <div
          className="navbar-toggle"
          onClick={() => {
            document.querySelector(".nav-menu").classList.toggle("show");
          }}
        >
          ☰
        </div>

        <ul className="nav-menu">
          {links.map((link) => (
            <li key={link.to} className="navbar-item">
              <Link to={link.to} className="navbar-link">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
