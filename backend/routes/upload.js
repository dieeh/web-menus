// backend/routes/upload.js
import express from "express";
import { supabase } from "../supabaseClient.js";

const router = express.Router();

// Ruta para manejar la carga de imágenes
router.post("/", async (req, res) => {
  // Verificar si el archivo existe en la petición
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  // Definir nombre único para la imagen
  const fileName = `${Date.now()}_${req.file.originalname}`;

  try {
    // Subir la imagen a Supabase Storage
    const { data, error } = await supabase.storage
      .from(process.env.SUPABASE_BUCKET_NAME)
      .upload(fileName, req.file.buffer, {
        cacheControl: "3600",
        upsert: false, // No sobrescribir archivos existentes
      });

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    // Obtener la URL pública de la imagen subida
    const { publicURL, error: urlError } = supabase.storage
      .from(process.env.SUPABASE_BUCKET_NAME)
      .getPublicUrl(fileName);

    if (urlError) {
      return res.status(500).json({ error: urlError.message });
    }

    // Responder con la URL de la imagen subida
    res.status(200).json({ url: publicURL });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export { router as uploadRoute };
