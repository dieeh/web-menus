// backend/config/supabaseClient.js
import { createClient } from '@supabase/supabase-js';
import path from 'path';

// Cargar las variables de entorno
import dotenv from 'dotenv';
dotenv.config();

// Crear cliente Supabase usando la Service Key
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Función para subir una imagen a Supabase Storage
export const uploadImageToSupabase = async (file) => {
  const bucketName = 'images';  // Asegúrate de que tienes un bucket llamado 'images'
  
  // Subir la imagen a Supabase Storage
  const { data, error } = await supabase.storage
    .from(bucketName)
    .upload(`public/${file.filename}`, file.path);

  if (error) {
    throw new Error('Error uploading image to Supabase');
  }

  // Obtener la URL pública de la imagen
  const publicUrl = supabase.storage.from(bucketName).getPublicUrl(`public/${file.filename}`).publicURL;
  
  return publicUrl;
};
