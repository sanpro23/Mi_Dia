import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Inicio from "./pages/Home.jsx";
import Footer from "./components/Footer.jsx";
import CalendarioPage from "./pages/CalendarioPage.jsx";
import ContactosPage from "./pages/ContactosPage.jsx";
import TareasPage from "./pages/TareasPage.jsx";
import Notaspage from "./pages/Notaspage.jsx";
import ComprasPage from "./pages/ComprasPage.jsx";

function App() {
  return (
    <>
      <div className="mi-app">
        <h1>Bienvenido a Mi Dia</h1>
      </div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/calendario" element={<CalendarioPage />} />
        <Route path="/contactos" element={<ContactosPage />} />
        <Route path="/tareas" element={<TareasPage />} />
        <Route path="/notas" element={<Notaspage />} />
        <Route path="/compras" element={<ComprasPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
