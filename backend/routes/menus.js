// backend/routes/menus.js
import express from "express";
import { supabase } from "../config/supabaseClient.js"; // Asegúrate de usar la ruta y extensión correctas

const router = express.Router();

// GET /api/menus → Trae todos los menús
router.get("/menus", async (req, res) => {
  const { data, error } = await supabase.from("menus").select("*");

  if (error) {
    console.error(error);
    return res.status(500).json({ error: "Error al obtener los menús" });
  }

  res.json(data);
});

// GET /api/menus/:id → Trae un menú específico
router.get("/menus/:id", async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase
    .from("menus")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    return res.status(500).json({ error: "No se pudo obtener el menú" });
  }

  res.json(data);
});

export default router;
