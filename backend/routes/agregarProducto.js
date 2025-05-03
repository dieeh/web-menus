import { supabase } from "../../supabaseClient.js";
import { uploadImage } from "../uploadImage.js";

export async function POST({ request }) {
  const formData = await request.formData();

  const nombre = formData.get("nombre");
  const descripcion = formData.get("descripcion");
  const precio = parseFloat(formData.get("precio"));
  const categoria_id = parseInt(formData.get("categoria_id"));
  const orden = parseInt(formData.get("orden"));
  const file = formData.get("imagen");

  let imageUrl = null;

  try {
    if (file && file.name) {
      const filename = `${Date.now()}-${file.name}`;
      imageUrl = await uploadImage(file, filename);
    }

    const { data, error } = await supabase.from("products").insert([
      {
        nombre,
        descripcion,
        precio,
        categoria_id,
        orden,
        image_url: imageUrl,
      },
    ]);

    if (error) return new Response(error.message, { status: 500 });

    return new Response(JSON.stringify({ success: true, data }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(err.message, { status: 500 });
  }
}
