// routes/user.routes.js

import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import {
  obtenerPerfil,
  actualizarUsuario,
  cambiarPassword
} from "../controllers/user.controller.js";

const router = express.Router();

router.use(authMiddleware);

// Obtener perfil
router.get("/", obtenerPerfil);

// Actualizar nombre/email
router.put("/", actualizarUsuario);

// Cambiar contraseña
router.put("/password", cambiarPassword);

export default router;
