import { useState, useEffect, useCallback } from "react";
import apiService from "../services/apiService";
import { validateFile } from "../utils/validation";

function Contactos() {
  const [contactos, setContactos] = useState([]);
  const [formData, setFormData] = useState({
    nombre: "",
    apellidos: "",
    telefono: "",
    email: "",
    ciudad: "",
    pais: "",
    empresa: "",
    puesto: "",
    foto: "",
    notas: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadContactos();
  }, []);

  const loadContactos = async () => {
    try {
      const data = await apiService.getContactos();
      setContactos(data);
    } catch (error) {
      console.error("Error al cargar los contactos:", error);
      setError("Error al cargar los contactos");
    }
  };

  const handleChange = useCallback((e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }, [formData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const nuevo = await apiService.createContacto(formData);
      setContactos([...contactos, nuevo]);

      setFormData({
        nombre: "",
        apellidos: "",
        telefono: "",
        email: "",
        ciudad: "",
        pais: "",
        empresa: "",
        puesto: "",
        foto: "",
        notas: "",
      });
    } catch (error) {
      console.error(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    
    if (!file) return;
    
    const validation = validateFile(file);
    if (!validation.valid) {
      setError(validation.error);
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      setFormData({
        ...formData,
        foto: reader.result,
      });
      setError("");
    };

    reader.onerror = () => {
      setError("Error al leer el archivo");
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="contactos-container">
      <h1>Contactos</h1>

      {/*FORMULARIO*/}
      <form onSubmit={handleSubmit} className="contactos-form">
        {/*campo foto*/}
        <div>
          <label>Foto</label>
          <input type="file" accept="image/*" onChange={handleFileChange} />
        </div>

        {/*campo nombre*/}
        <div>
          <label>Nombre</label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
        </div>

        {/*campo apellidos*/}
        <div>
          <label>Apellidos</label>
          <input
            type="text"
            name="apellidos"
            value={formData.apellidos}
            onChange={handleChange}
            required
          />
        </div>

        {/*campo telefono*/}
        <div>
          <label>Teléfono</label>
          <input
            type="text"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            required
          />
        </div>

        {/*campo email*/}
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

         {/*campo ciudad*/}
         <div>
           <label>Ciudad</label>
           <input
             type="text"
             name="ciudad"
             value={formData.ciudad}
             onChange={handleChange}
             required
           />
         </div>

         {/*campo pais*/}
         <div>
           <label>País</label>
           <input
             type="text"
             name="pais"
             value={formData.pais}
             onChange={handleChange}
             required
           />
         </div>

        {/*campo empresa*/}
        <div>
          <label>Empresa</label>
          <input
            type="text"
            name="empresa"
            value={formData.empresa}
            onChange={handleChange}
            required
          />
        </div>

        {/*campo puesto*/}
        <div>
          <label>Puesto</label>
          <input
            type="text"
            name="puesto"
            value={formData.puesto}
            onChange={handleChange}
            required
          />
        </div>

        {/*campo notas*/}
        <div>
          <label>Notas</label>
           <textarea
             name="notas"
             value={formData.notas}
             onChange={handleChange}
             required
           />
        </div>

        <button type="submit">Agregar Contacto</button>
       </form>
       
       {error && <div className="error-message">{error}</div>}
       
       {loading && <div className="loading-message">Guardando...</div>}
       
       <ul className="contactos-list">
        {contactos.map((contacto) => (
          <li key={contacto.id} className="contacto-item">
            {contacto.foto && (
              <img src={contacto.foto} alt="foto" className="contacto-foto" />
            )}
            <div>
              <strong>
                {contacto.nombre} {contacto.apellidos}
              </strong>
              <br />
              {contacto.email}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Contactos;
