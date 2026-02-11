// controllers/notas.controller.js

import Nota from "../models/Nota.js";

// Obtener todas las notas del usuario
export const obtenerNotas = async (req, res) => {
  try {
    const notas = await Nota.find({ usuario: req.user.id });
    res.json(notas);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las notas", error });
  }
};

// Crear una nueva nota
export const crearNota = async (req, res) => {
  try {
    const { titulo, content, color, tag } = req.body;

    if (!titulo || !content) {
      return res.status(400).json({ message: "Título y contenido son obligatorios" });
    }

    const nueva = await Nota.create({
      usuario: req.user.id,
      titulo,
      content,
      color: color || "#fff8a6",
      tag: tag || "General",
      date: new Date().toLocaleString()
    });

    res.status(201).json(nueva);
  } catch (error) {
    res.status(500).json({ message: "Error al crear la nota", error });
  }
};

// Editar una nota
export const editarNota = async (req, res) => {
  try {
    const { titulo, content, color, tag } = req.body;

    const actualizada = await Nota.findOneAndUpdate(
      { _id: req.params.id, usuario: req.user.id },
      {
        titulo,
        content,
        color,
        tag,
        date: new Date().toLocaleString()
      },
      { new: true }
    );

    if (!actualizada) {
      return res.status(404).json({ message: "Nota no encontrada" });
    }

    res.json(actualizada);
  } catch (error) {
    res.status(500).json({ message: "Error al editar la nota", error });
  }
};

// Eliminar nota
export const eliminarNota = async (req, res) => {
  try {
    const eliminada = await Nota.findOneAndDelete({
      _id: req.params.id,
      usuario: req.user.id
    });

    if (!eliminada) {
      return res.status(404).json({ message: "Nota no encontrada" });
    }

    res.json({ message: "Nota eliminada" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar la nota", error });
  }
};
