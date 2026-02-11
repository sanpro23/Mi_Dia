import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  try {
    // Obtener el token del header Authorization
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ message: 'No hay token, autorización denegada' });
    }

    // Verificar el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret_key_temporal');
    
    // Agregar el usuario decodificado a la request
    req.user = decoded;
    
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token no válido' });
  }
};

export default authMiddleware;