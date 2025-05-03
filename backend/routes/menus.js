import { supabase } from "./supabaseClient.js";

export async function fetchMenus() {
  const { data, error } = await supabase
    .from("categories")
    .select(
      `
      id,
      nombre,
      orden,
      products (
        id,
        nombre,
        descripcion,
        precio,
        orden,
        image_url
      )
    `
    )
    .order("orden", { ascending: true }) // orden de categorías
    .order("orden", { foreignTable: "products", ascending: true }); // orden de productos

  if (error) throw new Error(`Error al obtener el menú: ${error.message}`);

  return data;
}
