import { useState, useEffect } from "react";

function Calendario() {
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState({});
  const [selectedDay, setSelectedDay] = useState(null);
  const [eventText, setEventText] = useState("");
  const [eventColor, setEventColor] = useState("#ff0000");
  const [editingEvent, setEditingEvent] = useState(null);

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

  // pedir permiso de notificaciones
  useEffect(() => {
    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  }, []);

  // cargar eventos desde localStorage
  useEffect(() => {
    const loadEvents = () => {
      try {
        const saved = JSON.parse(localStorage.getItem("calendarEvents")) || {};
        return saved;
      } catch (error) {
        console.error("Error loading calendar events:", error);
        return {};
      }
    };
    
    setEvents(loadEvents());
  }, []);

  // guardar eventos
  useEffect(() => {
    localStorage.setItem("calendarEvents", JSON.stringify(events));
  }, [events]);

  // generar archivo ICS
  const exportICS = () => {
    let ics = "BEGIN:VCALENDAR\nVERSION:2.0\nCALSCALE:GREGORIAN\n";

    Object.keys(events).forEach((day) => {
      const [y, m, d] = day.split("-");
      const start = new Date(y, m - 1, d, 10, 0, 0); // 10:00 por defecto
      const end = new Date(start.getTime() + 60 * 60 * 1000);

      events[day].forEach((ev) => {
        ics += "BEGIN:VEVENT\n";
        ics += `UID:${ev.id}\n`;
        ics += `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, "").split(".")[0]}Z\n`;
        ics += `DTSTART:${start.toISOString().replace(/[-:]/g, "").split(".")[0]}Z\n`;
        ics += `DTEND:${end.toISOString().replace(/[-:]/g, "").split(".")[0]}Z\n`;
        ics += `SUMMARY:${ev.text}\n`;
        ics += "END:VEVENT\n";
      });
    });

    ics += "END:VCALENDAR";

    const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "mi_calendario.ics";
    a.click();

    URL.revokeObjectURL(url);
  };

  // importar archivo ICS
  const importICS = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (event) => {
      const text = event.target.result;

      const lines = text.split("\n");
      let newEvents = {};
      let currentEvent = null;

      lines.forEach((line) => {
        line = line.trim();

        if (line === "BEGIN:VEVENT") {
          currentEvent = {};
        }

        if (line.startsWith("SUMMARY:")) {
          currentEvent.text = line.replace("SUMMARY:", "");
        }

        if (line.startsWith("DTSTART:")) {
          const raw = line.replace("DTSTART:", "");
          const year = raw.substring(0, 4);
          const month = raw.substring(4, 6);
          const day = raw.substring(6, 8);
          currentEvent.date = `${year}-${parseInt(month)}-${parseInt(day)}`;
        }

        if (line === "END:VEVENT") {
          if (currentEvent.date && currentEvent.text) {
            if (!newEvents[currentEvent.date])
              newEvents[currentEvent.date] = [];
            newEvents[currentEvent.date].push({
              id: Date.now() + Math.random(),
              text: currentEvent.text,
              color: "#4285f4",
            });
          }
          currentEvent = null;
        }
      });

      setEvents((prev) => {
        const merged = { ...prev };
        Object.keys(newEvents).forEach((day) => {
          merged[day] = [...(merged[day] || []), ...newEvents[day]];
        });
        return merged;
      });

      alert("Calendario importado correctamente");
    };

    reader.readAsText(file);
  };

  // añadir evento
  const addEvent = () => {
    if (!eventText.trim()) return;

    const newEvent = {
      text: eventText,
      color: eventColor,
      id: Date.now(),
    };

    setEvents((prev) => ({
      ...prev,
      [selectedDay]: [...(prev[selectedDay] || []), newEvent],
    }));

    if (Notification.permission === "granted") {
      new Notification("Nuevo evento añadido", {
        body: `${eventText} (${selectedDay})`,
      });
    }

    setEventText("");
    setSelectedDay(null);
  };

  // editar evento
  const saveEdit = () => {
    setEvents((prev) => {
      const updated = { ...prev };
      updated[selectedDay] = updated[selectedDay].map((ev) =>
        ev.id === editingEvent.id
          ? { ...ev, text: eventText, color: eventColor }
          : ev,
      );
      return updated;
    });

    setEditingEvent(null);
    setEventText("");
    setSelectedDay(null);
  };

  // borrar evento
  const deleteEvent = (dayKey, id) => {
    setEvents((prev) => {
      const updated = { ...prev };
      updated[dayKey] = updated[dayKey].filter((ev) => ev.id !== id);
      if (updated[dayKey].length === 0) delete updated[dayKey];
      return updated;
    });
  };

  // generar calendario mensual
  const firstDay = new Date(year, month, 1).getDay();
  const lastDay = new Date(year, month + 1, 0).getDate();
  const offset = firstDay === 0 ? 6 : firstDay - 1;

  const days = [];
  for (let i = 0; i < offset; i++)
    days.push(<div key={`e-${i}`} className="empty"></div>);

  for (let d = 1; d <= lastDay; d++) {
    const dateKey = `${year}-${month + 1}-${d}`;

    days.push(
      <div key={d} className="day" onClick={() => setSelectedDay(dateKey)}>
        <span className="day-number">{d}</span>

        {events[dateKey]?.map((ev) => (
          <div
            key={ev.id}
            className="event"
            style={{ backgroundColor: ev.color }}
          >
            <span>{ev.text}</span>

            <button
              className="delete-btn"
              onClick={(e) => {
                e.stopPropagation();
                deleteEvent(dateKey, ev.id);
              }}
            >
              ✕
            </button>

            <button
              className="edit-btn"
              onClick={(e) => {
                e.stopPropagation();
                setEditingEvent(ev);
                setEventText(ev.text);
                setEventColor(ev.color);
                setSelectedDay(dateKey);
              }}
            >
              ✎
            </button>
          </div>
        ))}
      </div>,
    );
  }

  return (
    <div className="calendar-page">
     

      {/*IMPORTAR Y EXPORTAR CALENDARIO*/}
      <div className="export-container">
        <button className="export-btn" onClick={exportICS}>
          📅 Exportar calendario completo
        </button>

        <label className="import-btn">
          📥 Importar calendario
          <input
            type="file"
            accept=".ics"
            onChange={importICS}
            style={{ display: "none" }}
          />
        </label>
      </div>

      {/* vista mensual */}
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

      {/* modal */}
      {selectedDay && (
        <div className="modal">
          <div className="modal-content">
            <h3>
              {editingEvent ? "Editar evento" : "Nuevo evento"} para{" "}
              {selectedDay}
            </h3>

            <input
              type="text"
              placeholder="Descripción del evento"
              value={eventText}
              onChange={(e) => setEventText(e.target.value)}
              onKeyDown={(e) =>
                e.key === "Enter" && (editingEvent ? saveEdit() : addEvent())
              }
            />

            <label>Color del evento:</label>
            <input
              type="color"
              value={eventColor}
              onChange={(e) => setEventColor(e.target.value)}
            />

            <button onClick={editingEvent ? saveEdit : addEvent}>
              {editingEvent ? "Guardar cambios" : "Guardar"}
            </button>

            <button onClick={() => setSelectedDay(null)}>Cancelar</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Calendario;
