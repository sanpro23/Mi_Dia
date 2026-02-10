import express from 'express';
import Tarea from '../models/Tarea.js';
  
const router = express.Router();

// Obtener todas las tareas
router.get('/', async (req, res) => {
  try {
    const tareas = await Tarea.find({ usuario: req.user.id });
    res.json(tareas);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las tareas' });
  }
});

// Crear una nueva tarea            
router.post('/', async (req, res) => {
  try {
    const nueva = await Tarea.create({
        usuario: req.user.id,
        titulo: req.body.titulo,
        descripcion: req.body.descripcion,
        completada: false
    res.json(nueva);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear la tarea', error });
  }
});

//Editar Tarea
router.put('/:id', async (req, res) => {
    try{
        const actualizada = await Tarea.findByIdAndUpdate(
            req.params.id,
            {
                titulo: req.body.titulo,
                descripcion: req.body.descripcion,
                completada: req.body.completada
            },
            { new: true }
        );
        res.json(actualizada);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar la tarea', error });
    }
});

// Eliminar una tarea 
router.delete('/:id', async (req, res) => {
  try {
    await Tarea.findByIdAndDelete(req.params.id);
    res.json({ message: 'Tarea eliminada correctamente' });

  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar la tarea', error });
  }
});

export default router;