import express from "express";
import { validateUser } from "../middleware/guard.middleware.js";
import {
  createProductoController,
  getProductosController,
  getProductoByIdController,
  updateProductoController,
  deleteProductoController,
} from "../controller/producto.controller.js";

const router = express.Router();

// Cualquiera puede consultar productos.
router.get("/", getProductosController);
router.get("/:id", getProductoByIdController);

// Para crear, modificar y eliminar hay que enviar un JWT valido.
router.post("/", validateUser, createProductoController);
router.patch("/:id", validateUser, updateProductoController);
router.delete("/:id", validateUser, deleteProductoController);

export default router;
