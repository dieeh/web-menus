import express from 'express';
import multer from 'multer';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

dotenv.config();

const app = express();
const upload = multer({ dest: 'tmp/' });

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

app.post('/api/upload', upload.single('file'), async (req, res) => {
  try {
    const file = fs.readFileSync(req.file.path);
    const filename = Date.now() + '-' + req.file.originalname;

    const { data, error } = await supabase.storage
      .from(process.env.SUPABASE_BUCKET)
      .upload(filename, file, {
        contentType: req.file.mimetype,
        upsert: true,
      });

    // Limpiar archivo temporal
    fs.unlinkSync(req.file.path);

    if (error) throw error;

    const { data: publicUrlData } = supabase.storage
      .from(process.env.SUPABASE_BUCKET)
      .getPublicUrl(filename);

    res.json({ success: true, url: publicUrlData.publicUrl });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Error al subir archivo' });
  }
});

app.use(express.static('dist'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
);
