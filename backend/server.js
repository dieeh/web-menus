// backend/server.js
import express from "express";
import path from "path";
import url from "url";
import dotenv from "dotenv";
import multer from "multer";
import { uploadRoute } from "./routes/upload.js"; // Rutas de carga de imágenes

dotenv.config();

// Para obtener __dirname en módulos ES
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Configurar multer para manejar archivos (imagen en este caso)
const upload = multer();

// Usar la ruta de upload
app.use("/api/upload", upload.single("file"), uploadRoute); // `file` es el nombre del campo de formulario

// Ruta para servir los archivos estáticos generados por Astro
app.use(express.static(path.join(__dirname, "../dist")));

// Ruta catch-all para manejar todas las demás peticiones y servir la página estática
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../dist/index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
