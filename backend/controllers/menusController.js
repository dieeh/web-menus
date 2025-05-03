/* Archivo: backend/controllers/menusController.js */
import { fetchMenus } from "../models/menusModel.js";

export const getMenus = async (req, res) => {
  try {
    const menus = await fetchMenus();
    res.json(menus);
  } catch (err) {
    console.error("Error al obtener menús:", err);
    res.status(500).json({ error: "Error interno al obtener menús" });
  }
};
