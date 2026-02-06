import { Routes, Route } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Navbar from "./componets/Navbar.jsx";
import Inicio from "./pages/Home.jsx";
import Footer from "./componets/Footer.jsx";

function App() {
  return (
    <>
      <div className="mi-app">
        <h1>Bienvenido a Mi Dia</h1>
      </div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Inicio />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
