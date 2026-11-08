// IMPORTACIONES
import express from "express";
import { createUserController } from "../controller/user.controller.js";

// Creamos el router
const router = express.Router();

// Ruta de prueba para ejecutar la creación del usuario
router.get("/", createUserController);

// Exportamos el router
export default router;
