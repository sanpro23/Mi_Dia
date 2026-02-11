// controllers/tareas.controller.js

import Tarea from "../models/Tarea.js";

// Obtener todas las tareas del usuario
export const obtenerTareas = async (req, res) => {
  try {
    const tareas = await Tarea.find({ usuario: req.user.id });
    res.json(tareas);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las tareas", error });
  }
};

// Crear una nueva tarea
export const crearTarea = async (req, res) => {
  try {
    const { texto } = req.body;

    if (!texto) {
      return res.status(400).json({ message: "El texto de la tarea es obligatorio" });
    }

    const nueva = await Tarea.create({
      usuario: req.user.id,
      texto,
      completada: false
    });

    res.status(201).json(nueva);
  } catch (error) {
    res.status(500).json({ message: "Error al crear la tarea", error });
  }
};

// Alternar completada / no completada
export const toggleTarea = async (req, res) => {
  try {
    const tarea = await Tarea.findOne({ _id: req.params.id, usuario: req.user.id });

    if (!tarea) {
      return res.status(404).json({ message: "Tarea no encontrada" });
    }

    tarea.completada = !tarea.completada;
    await tarea.save();

    res.json(tarea);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar la tarea", error });
  }
};

// Eliminar tarea
export const eliminarTarea = async (req, res) => {
  try {
    const eliminada = await Tarea.findOneAndDelete({
      _id: req.params.id,
      usuario: req.user.id
    });

    if (!eliminada) {
      return res.status(404).json({ message: "Tarea no encontrada" });
    }

    res.json({ message: "Tarea eliminada" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar la tarea", error });
  }
};
