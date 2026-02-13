import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import User from '../model/User.model.js';

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ message: 'No hay token, autorización denegada' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret_key_temporal');
    
    // Buscar el usuario en la base de datos para obtener el documento completo
    const user = await User.findById(decoded.id).select('-password');
    
    if (!user) {
      return res.status(401).json({ message: 'Usuario no encontrado' });
    }
    
    // Guardar el usuario completo en la request
    req.user = user;
    
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token no válido' });
  }
};

export default authMiddleware;