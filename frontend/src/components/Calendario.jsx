import { useState } from "react";

function Calendario() {
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState({});
  const [selectedDay, setSelectedDay] = useState(null);
  const [eventText, setEventText] = useState("");
  const [eventColor, setEventColor] = useState("#ff0000");

  const year = date.getFullYear();
  const month = date.getMonth();

  const monthNames = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  const firstDay = new Date(year, month, 1).getDay();
  const lastDay = new Date(year, month + 1, 0).getDate();

  // Ajuste para que empiece en lunes
  const offset = firstDay === 0 ? 6 : firstDay - 1;

  const days = [];

  // Días vacíos
  for (let i = 0; i < offset; i++) {
    days.push(<div key={`empty-${i}`} className="empty"></div>);
  }

  // Función para borrar evento
  const deleteEvent = (dayKey, index) => {
    setEvents((prev) => {
      const updated = { ...prev };

      // Crear un nuevo array sin modificar el original
      updated[dayKey] = updated[dayKey].filter((_, i) => i !== index);

      // Si ya no quedan eventos, eliminar la clave
      if (updated[dayKey].length === 0) {
        delete updated[dayKey];
      }

      return updated;
    });
  };

  // Días del mes
  for (let d = 1; d <= lastDay; d++) {
    const dateKey = `${year}-${month + 1}-${d}`;

    days.push(
      <div key={d} className="day" onClick={() => setSelectedDay(dateKey)}>
        <span className="day-number">{d}</span>

        {/* Mostrar eventos */}
        {events[dateKey]?.map((ev, index) => (
          <div
            key={index}
            className="event"
            style={{ backgroundColor: ev.color }}
          >
            <span>{ev.text}</span>

            <button
              className="delete-btn"
              onClick={(e) => {
                e.stopPropagation();
                deleteEvent(dateKey, index);
              }}
            >
              ✕
            </button>
          </div>
        ))}
      </div>,
    );
  }

  // Guardar evento
  const addEvent = () => {
    if (!eventText.trim()) return;

    setEvents((prev) => ({
      ...prev,
      [selectedDay]: [
        ...(prev[selectedDay] || []),
        { text: eventText, color: eventColor },
      ],
    }));

    setEventText("");
    setSelectedDay(null);
  };

  return (
    <div className="calendar-page">
      <div className="calendar">
        <div className="calendar-header">
          <button onClick={() => setDate(new Date(year, month - 1, 1))}>
            Anterior
          </button>
          <h2>
            {monthNames[month]} {year}
          </h2>
          <button onClick={() => setDate(new Date(year, month + 1, 1))}>
            Siguiente
          </button>
        </div>

        <div className="calendar-grid">
          <div className="day-name">Lun</div>
          <div className="day-name">Mar</div>
          <div className="day-name">Mié</div>
          <div className="day-name">Jue</div>
          <div className="day-name">Vie</div>
          <div className="day-name">Sáb</div>
          <div className="day-name">Dom</div>

          {days}
        </div>
      </div>

      {/* Modal para crear evento */}
      {selectedDay && (
        <div className="modal">
          <div className="modal-content">
            <h3>Nuevo evento para {selectedDay}</h3>

            <input
              type="text"
              placeholder="Descripción del evento"
              value={eventText}
              onChange={(e) => setEventText(e.target.value)}
            />

            <label>Color del evento:</label>
            <input
              type="color"
              value={eventColor}
              onChange={(e) => setEventColor(e.target.value)}
            />

            <button onClick={addEvent}>Guardar</button>
            <button onClick={() => setSelectedDay(null)}>Cancelar</button>
          </div>
        </div>
      )}
    </div>
  );
}
export default Calendario;
