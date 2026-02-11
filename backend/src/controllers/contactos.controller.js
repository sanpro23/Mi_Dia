// controllers/contactos.controller.js

import Contacto from "../models/Contacto.js";

// Obtener todos los contactos del usuario
export const obtenerContactos = async (req, res) => {
  try {
    const contactos = await Contacto.find({ usuario: req.user.id });
    res.json(contactos);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los contactos", error });
  }
};

// Crear un nuevo contacto
export const crearContacto = async (req, res) => {
  try {
    const nuevo = await Contacto.create({
      usuario: req.user.id,
      ...req.body
    });

    res.status(201).json(nuevo);
  } catch (error) {
    res.status(500).json({ message: "Error al crear el contacto", error });
  }
};

// Editar contacto
export const editarContacto = async (req, res) => {
  try {
    const actualizado = await Contacto.findOneAndUpdate(
      { _id: req.params.id, usuario: req.user.id },
      req.body,
      { new: true }
    );

    if (!actualizado) {
      return res.status(404).json({ message: "Contacto no encontrado" });
    }

    res.json(actualizado);
  } catch (error) {
    res.status(500).json({ message: "Error al editar el contacto", error });
  }
};

// Eliminar contacto
export const eliminarContacto = async (req, res) => {
  try {
    const eliminado = await Contacto.findOneAndDelete({
      _id: req.params.id,
      usuario: req.user.id
    });

    if (!eliminado) {
      return res.status(404).json({ message: "Contacto no encontrado" });
    }

    res.json({ message: "Contacto eliminado" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el contacto", error });
  }
};
