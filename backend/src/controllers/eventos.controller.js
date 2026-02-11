// controllers/eventos.controller.js

const Evento = require("../models/evento.model"); // si usas Mongo/Mongoose
// o tu modelo SQL, o un servicio en memoria

// Obtener todos los eventos
exports.getAllEvents = async (req, res) => {
  try {
    const eventos = await Evento.find(); // o tu método
    res.json(eventos);
  } catch (err) {
    res.status(500).json({ error: "Error obteniendo eventos" });
  }
};

// Obtener eventos de un día
exports.getEventsByDay = async (req, res) => {
  try {
    const { date } = req.params;
    const eventos = await Evento.find({ date });
    res.json(eventos);
  } catch (err) {
    res.status(500).json({ error: "Error obteniendo eventos del día" });
  }
};

// Crear evento
exports.createEvent = async (req, res) => {
  try {
    const { date, text, color } = req.body;

    const nuevo = await Evento.create({
      date,
      text,
      color,
      id: Date.now()
    });

    res.status(201).json(nuevo);
  } catch (err) {
    res.status(500).json({ error: "Error creando evento" });
  }
};

// Editar evento
exports.updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const { text, color } = req.body;

    const actualizado = await Evento.findOneAndUpdate(
      { id },
      { text, color },
      { new: true }
    );

    res.json(actualizado);
  } catch (err) {
    res.status(500).json({ error: "Error actualizando evento" });
  }
};

// Borrar evento
exports.deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;

    await Evento.findOneAndDelete({ id });

    res.json({ message: "Evento eliminado" });
  } catch (err) {
    res.status(500).json({ error: "Error eliminando evento" });
  }
};
