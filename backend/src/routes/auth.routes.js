import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../model/User.model.js';

const router = express.Router();

// Registrar nuevo usuario
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Verificar si el usuario ya existe
    const existeUsuario = await User.findOne({ email });
    if (existeUsuario) {
      return res.status(400).json({ message: 'El email ya está registrado' });
    }

    // Encriptar la contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Crear el usuario
    const nuevoUsuario = await User.create({
      name,
      email,
      password: hashedPassword
    });

    // Crear el token JWT
    const token = jwt.sign(
      { id: nuevoUsuario._id, email: nuevoUsuario.email },
      process.env.JWT_SECRET || 'secret_key_temporal',
      { expiresIn: '30d' }
    );

    res.status(201).json({
      message: 'Usuario registrado exitosamente',
      token,
      user: {
        id: nuevoUsuario._id,
        name: nuevoUsuario.name,
        email: nuevoUsuario.email
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al registrar usuario', error: error.message });
  }
});

// Login de usuario
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Buscar el usuario
    const usuario = await User.findOne({ email });
    if (!usuario) {
      return res.status(400).json({ message: 'Credenciales inválidas' });
    }

    // Verificar la contraseña
    const esValida = await bcrypt.compare(password, usuario.password);
    if (!esValida) {
      return res.status(400).json({ message: 'Credenciales inválidas' });
    }

    // Crear el token JWT
    const token = jwt.sign(
      { id: usuario._id, email: usuario.email },
      process.env.JWT_SECRET || 'secret_key_temporal',
      { expiresIn: '30d' }
    );

    res.json({
      message: 'Login exitoso',
      token,
      user: {
        id: usuario._id,
        name: usuario.name,
        email: usuario.email
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error en el login', error: error.message });
  }
});

// Obtener perfil del usuario (requiere autenticación)
router.get('/profile', async (req, res) => {
  try {
    // El token ya fue verificado en el middleware
    const token = req.header('Authorization')?.replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret_key_temporal');
    
    const usuario = await User.findById(decoded.id).select('-password');
    
    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.json(usuario);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el perfil', error: error.message });
  }
});

export default router;