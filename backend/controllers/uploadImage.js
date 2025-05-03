import { supabase } from "../models/supabaseClient.js";

const bucket = import.meta.env.SUPABASE_BUCKET_NAME;

export async function uploadImage(file, filename) {
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(`productos/${filename}`, file.stream(), {
      contentType: file.type,
      upsert: true,
    });

  if (error) throw new Error(`Error al subir imagen: ${error.message}`);

  const publicUrl = supabase.storage
    .from(bucket)
    .getPublicUrl(`productos/${filename}`).data.publicUrl;

  return publicUrl;
}
