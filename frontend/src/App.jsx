import { Outlet} from 'react-router-dom';
import Navbar from "./componets/Navbar.jsx";

function App() {
  return (
    <>
      <div className="mi-app">
        <h1>Bienvenido a Mi Dia</h1>
       </div>
      <Navbar />
      <Outlet />
      <footer>
        <p>&copy; Mi Dia. Todos los derechos reservados para arrobitaSantos.</p>
      </footer>
    </>
  );
}

export default App;
