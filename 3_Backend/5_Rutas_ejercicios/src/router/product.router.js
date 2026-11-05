// IMPORTACIONES
import express from "express";
import { searchProductController } from "../controller/product.controller.js";

// Creamos un router para agrupar las rutas de productos
const router = express.Router();

// RUTAS
// Cuando llegue un POST a /api/products/search,
// se ejecutará la función searchProductController
router.post("/search", searchProductController);

// Exportamos el router para utilizarlo en index.js
export default router;
