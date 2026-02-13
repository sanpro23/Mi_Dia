import express from "express";
import Contacto from "../model/Contacto.model.js";

const router = express.Router();

// Obtener todos los contactos
router.get("/", async (req, res) => {
  try {
    const contactos = await Contacto.find({ usuario: req.user._id });
    res.json(contactos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Crear un nuevo contacto
router.post("/", async (req, res) => {
  try {
    const nuevo = await Contacto.create({
      usuario: req.user._id,
      nombre: req.body.nombre,
      apellidos: req.body.apellidos,
      telefono: req.body.telefono,
      email: req.body.email,
      ciudad: req.body.ciudad,
      pais: req.body.pais,
      empresa: req.body.empresa,
      puesto: req.body.puesto,
      foto: req.body.foto, //base64
      notas: req.body.notas,
    });
    res.status(201).json(nuevo);
  } catch (error) {
    res.status(500).json({ message: "Error al crear el contacto", error: error.message });
  }
});

//Editar un contacto
router.put("/:id", async (req, res) => {
  try {
    const actualizado = await Contacto.findByIdAndUpdate(
      req.params.id,
      {
        nombre: req.body.nombre,
        apellidos: req.body.apellidos,
        telefono: req.body.telefono,
        email: req.body.email,
        ciudad: req.body.ciudad,
        empresa: req.body.empresa,
        puesto: req.body.puesto,
        foto: req.body.foto, //base64
        notas: req.body.notas,
      },
      { new: true },
    );
    res.json(actualizado);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el contacto", error });
  }
});

// Eliminar un contacto
router.delete("/:id", async (req, res) => {
  try {
    await Contacto.findByIdAndDelete(req.params.id);
    res.json({ message: "Contacto eliminado" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el contacto", error });
  }
});

export default router;