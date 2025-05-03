/* Archivo: backend/models/menusModel.js */
import { supabase } from "./supabaseClient.js";

export const fetchMenus = async () => {
  const { data, error } = await supabase.from("categories").select(`
      id,
      name,
      products (
        id,
        name,
        image_url,
        prices (
          id,
          price
        ),
        discount_prices (
          id,
          discount_price
        )
      )
    `);
  if (error) throw error;
  return data;
};
