import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Navbar from "./components/Navbar.jsx";
import Inicio from "./pages/Home.jsx";
import Footer from "./components/Footer.jsx";
import CalendarioPage from "./pages/CalendarioPage.jsx";
import ContactosPage from "./pages/ContactosPage.jsx";
import TareasPage from "./pages/TareasPage.jsx";
import Notaspage from "./pages/Notaspage.jsx";
import ComprasPage from "./pages/ComprasPage.jsx";
import LoginRegister from "./components/LoginRegister.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

function App() {
  return (
    <AuthProvider>
      <div className="mi-app">
        <Navbar />
        <Routes>
          <Route path="/login" element={<LoginRegister />} />
          <Route path="/" element={
            <ProtectedRoute>
              <Inicio />
            </ProtectedRoute>
          } />
          <Route path="/calendario" element={
            <ProtectedRoute>
              <CalendarioPage />
            </ProtectedRoute>
          } />
          <Route path="/contactos" element={
            <ProtectedRoute>
              <ContactosPage />
            </ProtectedRoute>
          } />
          <Route path="/tareas" element={
            <ProtectedRoute>
              <TareasPage />
            </ProtectedRoute>
          } />
          <Route path="/notas" element={
            <ProtectedRoute>
              <Notaspage />
            </ProtectedRoute>
          } />
          <Route path="/compras" element={
            <ProtectedRoute>
              <ComprasPage />
            </ProtectedRoute>
          } />
        </Routes>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
