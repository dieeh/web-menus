import express from "express";
import {
  subirProducto,
  crearProducto,
} from "../controllers/productosController.js";

const router = express.Router();

router.post("/upload", subirProducto);

router.post("/create", crearProducto);

export default router;
