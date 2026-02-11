// controllers/compras.controller.js

import Categoria from "../models/Categoria.js";
import Producto from "../models/Producto.js";

// Obtener todas las categorías
export const obtenerCategorias = async (req, res) => {
  try {
    const categorias = await Categoria.find({ usuario: req.user.id });
    res.json(categorias);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener categorías", error });
  }
};

// Crear categoría
export const crearCategoria = async (req, res) => {
  try {
    const { nombre } = req.body;

    if (!nombre) return res.status(400).json({ message: "Nombre requerido" });

    const nueva = await Categoria.create({
      usuario: req.user.id,
      nombre
    });

    res.status(201).json(nueva);
  } catch (error) {
    res.status(500).json({ message: "Error al crear categoría", error });
  }
};

// Renombrar categoría
export const renombrarCategoria = async (req, res) => {
  try {
    const { nuevoNombre } = req.body;

    const categoria = await Categoria.findOneAndUpdate(
      { _id: req.params.id, usuario: req.user.id },
      { nombre: nuevoNombre },
      { new: true }
    );

    if (!categoria) {
      return res.status(404).json({ message: "Categoría no encontrada" });
    }

    res.json(categoria);
  } catch (error) {
    res.status(500).json({ message: "Error al renombrar categoría", error });
  }
};

// Eliminar categoría y sus productos
export const eliminarCategoria = async (req, res) => {
  try {
    const categoria = await Categoria.findOneAndDelete({
      _id: req.params.id,
      usuario: req.user.id
    });

    if (!categoria) {
      return res.status(404).json({ message: "Categoría no encontrada" });
    }

    await Producto.deleteMany({ categoria: categoria._id });

    res.json({ message: "Categoría y productos eliminados" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar categoría", error });
  }
};

// Obtener productos de una categoría
export const obtenerProductos = async (req, res) => {
  try {
    const productos = await Producto.find({
      usuario: req.user.id,
      categoria: req.params.id
    });

    res.json(productos);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener productos", error });
  }
};

// Crear producto
export const crearProducto = async (req, res) => {
  try {
    const { nombre } = req.body;

    const nuevo = await Producto.create({
      usuario: req.user.id,
      categoria: req.params.id,
      nombre
    });

    res.status(201).json(nuevo);
  } catch (error) {
    res.status(500).json({ message: "Error al crear producto", error });
  }
};

// Eliminar producto
export const eliminarProducto = async (req, res) => {
  try {
    const eliminado = await Producto.findOneAndDelete({
      _id: req.params.id,
      usuario: req.user.id
    });

    if (!eliminado) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    res.json({ message: "Producto eliminado" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar producto", error });
  }
};
