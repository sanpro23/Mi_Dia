import  { useState } from 'react';
import CalendarioPage from '../pages/CalendarioPage';

function Calendario() {
  const [date, setDate] = useState(new Date());

    const year = date.getFullYear();
    const month = date.getMonth();
    
    const monthNames = [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];

    const firstDay = new Date(year, month, 1).getDay();
    const lastDay = new Date(year, month + 1, 0).getDate();

    //Ajuste para que el calendario comience el lunes
    const offset = firstDay === 0 ? 6 : firstDays - 1;

    const days = [];

    // Agregar días vacíos para el inicio del mes
    for (let i = 0; i < offset; i++) {
      days.push(<div key ={`empty-${i}`} className="empty"></div>);
    }

    // Agregar los días del mes
    for (let i = 1; i <= lastDay; i++) {
      days.push(
        <div key={i} className="day">
          {i}
        </div>
      );
    }

  return (
    <div className="calendar-page">
      <div className="calendar">
        <div className="calendar-header">
          <button onClick={() => setDate(new Date(year, month - 1, 1))}>Anterior</button>
          <h2>{monthNames[month]} {year}</h2>
          <button onClick={() => setDate(new Date(year, month + 1, 1))}>Siguiente</button>
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
    </div>
  );
}

export default Calendario;


