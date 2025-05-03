import express from "express";
import productosRoutes from "./routes/productos.js";
import menusRoutes from "./routes/menus.js";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" }));

app.use("/api/productos", productosRoutes);
app.use("/api/menus", menusRoutes);

app.listen(3000, () => console.log("Servidor en http://localhost:3000"));
