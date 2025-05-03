import { supabase } from "./supabaseClient.js";
import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";
dotenv.config();

export const subirImagenYCrearProducto = async ({
  nombre,
  base64,
  filename,
}) => {
  const ext = filename.split(".").pop();
  const path = `${uuidv4()}.${ext}`;
  const bucket = process.env.SUPABASE_BUCKET_NAME;

  const { data, error: uploadError } = await supabase.storage
    .from(bucket)
    .upload(path, Buffer.from(base64, "base64"), {
      contentType: `image/${ext}`,
      upsert: true,
    });

  if (uploadError) throw uploadError;

  const imageUrl = `${process.env.SUPABASE_URL}/storage/v1/object/public/${bucket}/${path}`;

  const { data: producto, error: insertError } = await supabase
    .from("products")
    .insert([{ name: nombre, image_url: imageUrl }])
    .select()
    .single();

  if (insertError) throw insertError;

  return producto;
};
