import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authMiddleware from "./middleware/auth.middleware.js";

// Importar rutas
import authRoutes from "./routes/auth.routes.js";
import tareasRoutes from "./routes/tareas.routes.js";
import notasRoutes from "./routes/notas.routes.js";
import eventosRoutes from "./routes/eventos.routes.js";
import contactosRoutes from "./routes/contactos.routes.js";
import comprasRoutes from "./routes/compras.routes.js";

// Configuración
dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' })); // Para imágenes en base64

// Ruta de prueba
app.get("/", (req, res) => {
  res.json({ 
    message: "API Mi Día funcionando correctamente",
    version: "1.0.0"
  });
});

// Rutas públicas (sin autenticación)
app.use("/api/auth", authRoutes);

// Rutas protegidas (requieren autenticación)
app.use("/api/tareas", authMiddleware, tareasRoutes);
app.use("/api/notas", authMiddleware, notasRoutes);
app.use("/api/eventos", authMiddleware, eventosRoutes);
app.use("/api/contactos", authMiddleware, contactosRoutes);
app.use("/api/compras", authMiddleware, comprasRoutes);

// Manejador de errores 404
app.use((req, res) => {
  res.status(404).json({ message: "Ruta no encontrada" });
});

// Manejador de errores global
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: "Error interno del servidor",
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
  console.log(`📝 Documentación: http://localhost:${PORT}/`);
});
