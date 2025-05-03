import express from "express";
import { subirProducto } from "../controllers/productosController.js";

const router = express.Router();

router.post("/upload", subirProducto);

export default router;
