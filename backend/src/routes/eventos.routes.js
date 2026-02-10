import express, { text } from 'express';
import Evento from '../models/Evento.js';

const router = express.Router();

// Obtener todos los eventos
router.get('/', async (req, res) => {
  try {
    const eventos = await Evento.find();
    res.json(eventos);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los eventos', error });
  }
});

//obtener eventos por fecha(YYYY-MM-DD)
router.get('/fecha/:fecha', async (req, res) => {
  try {
    const eventos = await Evento.find({
      usuario: req.user.id,
      fecha: req.params.fecha
    });

    res.json(eventos);
  } catch (error) {
    res.status(500).json({ 
      message: 'Error al obtener los eventos por fecha', 
      error 
    });
  }
});


// Crear un nuevo evento
router.post('/', async (req, res) => {
  try {
    const nuevo  = await Evento.create({
        usuario: req.user.id,
        fecha: req.body.fecha,
        texto: req.body.texto,
        color: req.body.color,
    });
    res.status(201).json(nuevo);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el evento', error });
  }     
    });

    //Editar un evento
    router.put('/:id', async (req, res) => {
      try {
        const actualizado = await Evento.findByIdAndUpdate(
            req.params.id, 
                {
                    texto: req.body.texto,
                    color: req.body.color,
                },
            { new: true }
        );
        res.json(actualizado);
       
      } catch (error) {
        res.status(500).json({ message: 'Error al editar el evento', error });
      }
    });

// Eliminar un evento
router.delete('/:id', async (req, res) => {
  try {
    await Evento.findByIdAndDelete(req.params.id);
    res.json({ message: 'Evento eliminado' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el evento', error });
  }
});
        
   
export default router;