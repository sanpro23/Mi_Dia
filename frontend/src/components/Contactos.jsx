import { useState, useEffect } from "react";

function Contactos() {
  // Estado para almacenar los contactos cargados desde el backend
  const [contactos, setContactos] = useState([]);

  //Estado del formulario
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

  // useEffect se ejecuta una vez al cargar el componente
  // Aquí hacemos la petición GET al backend para obtener los contactos
  useEffect(() => {
    fetch("http://localhost:8080/api/contactos")
      .then((response) => response.json())
      .then((data) => setContactos(data))
      .catch((error) => console.error("Error al cargar los contactos:", error));
  }, []); // El array vacío [] asegura que este efecto solo se ejecute una vez al montar el componente

  // Función para manejar los cambios en el formulario
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/api/contactos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Error al guardar el contacto");

      const nuevo = await response.json();

      setContactos([...contactos, nuevo]);

      // limpiar formulario
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
    }
  };

  //Maneja el input de la foto
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setFormData({
        ...formData,
        foto: reader.result,
      });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
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
            onKeyDown={(e) => e.key === "Enter" && handleSubmit(e)}
            required
          />
        </div>

        <button type="submit">Agregar Contacto</button>
      </form>
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
