import { Outlet } from "react-router-dom";
import Navbar from "./componets/Navbar.jsx";
import Footer from "./componets/Footer.jsx";

function App() {
  return (
    <>
      <div className="mi-app">
        <h1>Bienvenido a Mi Dia</h1>
      </div>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
