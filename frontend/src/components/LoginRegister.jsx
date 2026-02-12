import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import apiService from "../services/apiService";

const LoginRegister = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const data = isLogin 
        ? await apiService.login(formData.email, formData.password)
        : await apiService.register(formData);

      login(data.user, data.token);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>{isLogin ? "Iniciar Sesión" : "Registrarse"}</h2>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div>
              <label>Nombre de usuario</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required={!isLogin}
              />
            </div>
          )}
          
          <div>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          
          <div>
            <label>Contraseña</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength="6"
            />
          </div>
          
          <button type="submit" disabled={loading}>
            {loading ? "Procesando..." : (isLogin ? "Iniciar Sesión" : "Registrarse")}
          </button>
        </form>
        
        <p className="auth-switch">
          {isLogin ? "¿No tienes cuenta?" : "¿Ya tienes cuenta?"}
          <button 
            type="button" 
            onClick={() => {
              setIsLogin(!isLogin);
              setError("");
            }}
          >
            {isLogin ? "Registrarse" : "Iniciar Sesión"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginRegister;