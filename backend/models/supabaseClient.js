// backend/config/supabaseClient.js
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

// Cargar las variables de entorno
dotenv.config();

// Inicializar el cliente de Supabase
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export { supabase };
