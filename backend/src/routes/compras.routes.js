import express from "express";
import Compras from "../models/Compras.model.js";

const router = express.Router();

// Obtener todas las categorías con productos
router.get("/", async (req, res) => {
  try {
    const categorias = await Compras.find({ usuario: req.user.id });
    res.json(categorias);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener categorías", error });
  }
});

// Crear nueva categoría
router.post("/", async (req, res) => {
  try {
    const nueva = await Compras.create({
      usuario: req.user.id,
      categoria: req.body.categoria,
      productos: [],
    });

    res.json(nueva);
  } catch (error) {
    res.status(500).json({ message: "Error al crear categoría", error });
  }
});

// Renombrar categoría
router.put("/:id", async (req, res) => {
  try {
    const actualizada = await Compras.findByIdAndUpdate(
      req.params.id,
      { categoria: req.body.categoria },
      { new: true }
    );

    res.json(actualizada);
  } catch (error) {
    res.status(500).json({ message: "Error al renombrar categoría", error });
  }
});

// Eliminar categoría
router.delete("/:id", async (req, res) => {
  try {
    await Compras.findByIdAndDelete(req.params.id);
    res.json({ message: "Categoría eliminada" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar categoría", error });
  }
});

// Añadir producto a una categoría
router.post("/:id/productos", async (req, res) => {
  try {
    const categoria = await Compras.findById(req.params.id);

    categoria.productos.push(req.body.producto);
    await categoria.save();

    res.json(categoria);
  } catch (error) {
    res.status(500).json({ message: "Error al añadir producto", error });
  }
});

// Eliminar producto de una categoría
router.delete("/:id/productos", async (req, res) => {
  try {
    const categoria = await Compras.findById(req.params.id);

    categoria.productos = categoria.productos.filter(
      (p) => p !== req.body.producto
    );

    await categoria.save();

    res.json(categoria);
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar producto", error });
  }
});

export default router;
