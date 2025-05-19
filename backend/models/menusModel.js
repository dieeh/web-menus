/* Archivo: backend/models/menusModel.js */
import { supabase } from "./supabaseClient.js";

export const fetchMenus = async () => {
  const { data, error } = await supabase.from("categories").select(`
      id,
      name,
      products (
        id,
        title,
        description,
        image_url,
        prices (
          serving,
          serving_price
        ),
        discount_prices (
          serving,
          serving_disc_price
        )
      )
    `);
  if (error) throw error;
  return data;
};
