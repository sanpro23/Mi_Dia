import express from 'express';
import Notas from '../model/Nota.model.js';

const router = express.Router();

// Obtener todas las notas
router.get('/', async (req, res) => {
  try {
    const notas = await Notas.find({ usuario: req.user.id });
    res.json(notas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }         
});

// Crear una nueva nota
router.post('/', async (req, res) => {
  try {
    const nueva = await Nota.create({
      ususario: req.user.id,
        titulo: req.body.titulo,
      content: req.body.content,
    color: req.body.color,
categoria: req.body.categoria,
date: req.body.date  || new Date().toLocaleString(),
    });

    res.json(nueva);
  } catch (error) {
    res.status(500).json({ message: "error al crear la nota", error });
  }
});

// Editar una nota 
router.put('/:id', async (req, res) => {
  try {
    const actualizada = await Notas.findByIdAndUpdate(
        req.params.id, 
        {
      titulo: req.body.titulo,
      content: req.body.content,
      color: req.body.color,
      categoria: req.body.categoria,
      date: req.body.date || new Date().toLocaleString(),
    }, 
    { new: true });
    res.json(actualizada);
  } catch (error) {
    res.status(500).json({ message: "error al actualizar la nota", error });
  }
});

// Eliminar una nota
router.delete('/:id', async (req, res) => {
  try {
    await Notas.findByIdAndDelete(req.params.id);
    res.json({ message: "Nota eliminada" });
  } catch (error) {
    res.status(500).json({ message: "error al eliminar la nota", error });
  }
});


export default router;