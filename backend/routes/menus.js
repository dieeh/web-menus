/* Archivo: backend/routes/menus.js */
import express from "express";
import { getMenus } from "../controllers/menusController.js";

const router = express.Router();

// GET /api/menus -> devuelve todas las categorías con sus productos y precios
router.get("/", getMenus);

export default router;
