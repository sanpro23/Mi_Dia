// controllers/user.controller.js

import User from "../models/User.model.js";
import bcrypt from "bcrypt";

// Obtener perfil
export const obtenerPerfil = async (req, res) => {
  try {
    const usuario = await User.findById(req.user.id).select("-password");
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener perfil" });
  }
};

// Actualizar datos del usuario
export const actualizarUsuario = async (req, res) => {
  try {
    const { name, email } = req.body;

    const actualizado = await User.findByIdAndUpdate(
      req.user.id,
      { name, email },
      { new: true }
    ).select("-password");

    res.json(actualizado);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar usuario" });
  }
};

// Cambiar contraseña
export const cambiarPassword = async (req, res) => {
  try {
    const { actual, nueva } = req.body;

    const usuario = await User.findById(req.user.id);

    const coincide = await bcrypt.compare(actual, usuario.password);
    if (!coincide) {
      return res.status(400).json({ message: "Contraseña actual incorrecta" });
    }

    const hashed = await bcrypt.hash(nueva, 10);
    usuario.password = hashed;
    await usuario.save();

    res.json({ message: "Contraseña actualizada" });
  } catch (error) {
    res.status(500).json({ message: "Error al cambiar contraseña" });
  }
};
