// backend/routes/menus.js
import express from 'express';
import { supabase } from '../supabaseClient.js';
import multer from 'multer';
import path from 'path';

const router = express.Router();

// GET /api/menus → Trae todos los menús
router.get('/menus', async (req, res) => {
  const { data, error } = await supabase.from('menus').select('*');

  if (error) {
    return res.status(500).json({ error: 'Error al obtener los menús' });
  }

  res.json(data);
});

// GET /api/menus/:id → Trae un menú específico
router.get('/menus/:id', async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase.from('menus').select('*').eq('id', id).single();

  if (error) {
    return res.status(500).json({ error: 'No se pudo obtener el menú' });
  }

  res.json(data);
});

// POST /api/menus/upload → Subir una imagen a Supabase Storage
router.post('/menus/upload', upload.single('image'), async (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
  
    // El archivo subido
    const { path: filePath, originalname } = req.file;
  
    try {
      // Subir la imagen a Supabase Storage
      const bucketName = 'menu-photos'; // Asegúrate de que tengas un bucket 'images' en Supabase
      const file = await supabase.storage.from(bucketName).upload(`public/${originalname}`, filePath);
  
      if (file.error) {
        return res.status(500).json({ error: 'Error al subir el archivo a Supabase' });
      }
  
      // Devuelve la URL pública del archivo subido
      const fileUrl = supabase.storage.from(bucketName).getPublicUrl(`public/${originalname}`).publicURL;
  
      res.json({ message: 'Imagen subida exitosamente', url: fileUrl });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Error al subir la imagen' });
    }
  });

export default router;
