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
  const [editingId, setEditingId] = useState(null);
  const [viewingContacto, setViewingContacto] = useState(null);

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
      if (editingId) {
        const actualizado = await apiService.updateContacto(editingId, formData);
        setContactos(contactos.map(c => c._id === editingId ? actualizado : c));
        setEditingId(null);
      } else {
        const nuevo = await apiService.createContacto(formData);
        setContactos([...contactos, nuevo]);
      }

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

  const handleEdit = (contacto) => {
    setEditingId(contacto._id);
    setFormData({
      nombre: contacto.nombre,
      apellidos: contacto.apellidos,
      telefono: contacto.telefono,
      email: contacto.email,
      ciudad: contacto.ciudad || "",
      pais: contacto.pais || "",
      empresa: contacto.empresa || "",
      puesto: contacto.puesto || "",
      foto: contacto.foto || "",
      notas: contacto.notas || "",
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!confirm("¿Estás seguro de eliminar este contacto?")) return;
    
    try {
      await apiService.deleteContacto(id);
      setContactos(contactos.filter(c => c._id !== id));
    } catch (error) {
      setError(error.message);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
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

  const exportContactos = () => {
    const dataStr = JSON.stringify(contactos, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "contactos.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const importContactos = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const imported = JSON.parse(event.target.result);
        if (!Array.isArray(imported)) {
          setError("El archivo debe contener un array de contactos");
          return;
        }

        for (const contacto of imported) {
          await apiService.createContacto(contacto);
        }
        
        loadContactos();
        alert("Contactos importados correctamente");
      } catch {
        setError("Error al importar el archivo");
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="contactos-container">
      <h1>Contactos</h1>

      <div className="export-container">
        <button className="export-btn" onClick={exportContactos}>
          📥 Exportar Contactos
        </button>
        <label className="import-btn">
          📤 Importar Contactos
          <input
            type="file"
            accept=".json"
            onChange={importContactos}
            style={{ display: "none" }}
          />
        </label>
      </div>

      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit} className="contactos-form">
        {editingId && <h3>Editando Contacto</h3>}
        
        <div>
          <label>Foto</label>
          <input type="file" accept="image/*" onChange={handleFileChange} />
          {formData.foto && <img src={formData.foto} alt="preview" className="contacto-foto" style={{width: 50, height: 50, objectFit: 'cover'}} />}
        </div>

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

        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Ciudad</label>
          <input
            type="text"
            name="ciudad"
            value={formData.ciudad}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>País</label>
          <input
            type="text"
            name="pais"
            value={formData.pais}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Empresa</label>
          <input
            type="text"
            name="empresa"
            value={formData.empresa}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Puesto</label>
          <input
            type="text"
            name="puesto"
            value={formData.puesto}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Notas</label>
          <textarea
            name="notas"
            value={formData.notas}
            onChange={handleChange}
          />
        </div>

        <div className="form-buttons">
          <button type="submit" disabled={loading}>
            {loading ? "Guardando..." : editingId ? "Actualizar" : "Agregar Contacto"}
          </button>
          {editingId && (
            <button type="button" onClick={handleCancel} className="cancel-btn">
              Cancelar
            </button>
          )}
        </div>
      </form>

      {loading && <div className="loading-message">Guardando...</div>}

      <ul className="contactos-list">
        {contactos.map((contacto) => (
          <li key={contacto._id} className="contacto-item">
            {contacto.foto && (
              <img src={contacto.foto} alt="foto" className="contacto-foto" />
            )}
            <div className="contacto-info">
              <strong>{contacto.nombre} {contacto.apellidos}</strong>
              <br />
              {contacto.email}
              {contacto.telefono && <span> | {contacto.telefono}</span>}
              {contacto.empresa && <span> | {contacto.empresa}</span>}
            </div>
            <div className="contacto-actions">
              <button onClick={() => setViewingContacto(contacto)} className="view-btn">
                👁️
              </button>
              <button onClick={() => handleEdit(contacto)} className="edit-btn">
                ✏️
              </button>
              <button onClick={() => handleDelete(contacto._id)} className="delete-btn">
                🗑️
              </button>
            </div>
          </li>
        ))}
      </ul>

      {viewingContacto && (
        <div className="modal" onClick={() => setViewingContacto(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h3>{viewingContacto.nombre} {viewingContacto.apellidos}</h3>
            {viewingContacto.foto && (
              <img src={viewingContacto.foto} alt="foto" className="contacto-foto" style={{width: 100, height: 100, objectFit: 'cover', borderRadius: '50%'}} />
            )}
            <p><strong>Email:</strong> {viewingContacto.email}</p>
            <p><strong>Teléfono:</strong> {viewingContacto.telefono}</p>
            <p><strong>Ciudad:</strong> {viewingContacto.ciudad}</p>
            <p><strong>País:</strong> {viewingContacto.pais}</p>
            <p><strong>Empresa:</strong> {viewingContacto.empresa}</p>
            <p><strong>Puesto:</strong> {viewingContacto.puesto}</p>
            <p><strong>Notas:</strong> {viewingContacto.notas}</p>
            <button onClick={() => setViewingContacto(null)}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Contactos;