import { useState } from "react";

function Tareas() {
  const [tarea, setTarea] = useState("");
  const [tareas, setTareas] = useState([]);
  const [mostrarCompletadas, setMostrarCompletadas] = useState(true);

  const agregarTarea = (e) => {
    e.preventDefault();
    if (tarea.trim() === "") return;
    setTareas([...tareas, { id: Date.now(), texto: tarea, completada: false }]);
    setTarea("");
  };

  const toggleCompletada = (id) => {
    setTareas(
      tareas.map((t) =>
        t.id === id ? { ...t, completada: !t.completada } : t,
      ),
    );
  };

  return (
    <div className="tareas-container">
      <h1>Mis Tareas</h1>

      {/*Formulario para agregar tareas*/}
      <form onSubmit={agregarTarea} className="tarea-form">
        <input
          type="text"
          value={tarea}
          onChange={(e) => setTarea(e.target.value)}
          placeholder="Agregar nueva tarea"
          onKeyDown={(e) => e.key === "Enter" && agregarTarea(e)}
        />
        <button type="submit">Agregar</button>
      </form>

      {/*Lista de tareas activas*/}
      <h2>Tareas pendientes</h2>
      <ul className="tareas-lista">
        {tareas
          .filter((t) => !t.completada)
          .map((tarea) => (
            <li key={tarea.id} className="tarea-item">
              <span>{tarea.texto}</span>
              <button onClick={() => toggleCompletada(tarea.id)}>
                Marcar como completada
              </button>
            </li>
          ))}
      </ul>

      {/* BOTÓN PARA MOSTRAR/OCULTAR COMPLETADAS */}
      <button
        className="toggle-btn"
        onClick={() => setMostrarCompletadas(!mostrarCompletadas)}
      >
        {mostrarCompletadas
          ? "Ocultar tareas realizadas"
          : "Mostrar tareas realizadas"}
      </button>

      {/*Lista de tareas completadas*/}
      {mostrarCompletadas && (
        <>
          <h2>Tareas completadas</h2>
          <ul className="tareas-lista completadas">
            {tareas
              .filter((t) => t.completada)
              .map((t) => (
                <li key={t.id}>
                  <input
                    type="checkbox"
                    checked={t.completada}
                    onChange={() => toggleCompletada(t.id)}
                  />
                  <span className="completada">{t.texto}</span>
                </li>
              ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default Tareas;
