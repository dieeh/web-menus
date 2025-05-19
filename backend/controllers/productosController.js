import { subirImagenYCrearProducto } from "../models/productosModel.js";
import { insertarProducto } from "../models/productosModel.js";

export const subirProducto = async (req, res) => {
  try {
    const { nombre, base64, filename } = req.body;
    if (!nombre || !base64 || !filename) {
      return res.status(400).json({ error: "Faltan campos requeridos" });
    }

    const result = await subirImagenYCrearProducto({
      nombre,
      base64,
      filename,
    });

    res.status(201).json({ message: "Producto subido", producto: result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const crearProducto = async (req, res) => {
  try {
    const {
      category_id,
      title,
      description,
      image_url,
      hide,
      order_in_category,
    } = req.body;

    if (!category_id || !title || !image_url) {
      return res.status(400).json({ error: "Faltan campos obligatorios" });
    }

    const nuevoProducto = await insertarProducto({
      category_id,
      title,
      description,
      image_url,
      hide: hide ?? false,
      order_in_category: order_in_category ?? 0,
    });

    res
      .status(201)
      .json({ message: "Producto creado", producto: nuevoProducto });
  } catch (err) {
    console.error("Error al crear producto:", err);
    res.status(500).json({ error: "Error al crear producto" });
  }
};
