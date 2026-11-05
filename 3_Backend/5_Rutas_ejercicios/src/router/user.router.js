// IMPORTACIONES
import express from "express";
import { createNewUserController } from "../controller/user.controller.js";

// Creamos un router para agrupar las rutas de usuarios
const router = express.Router();

// RUTAS
// Cuando llegue un POST a /api/users, se ejecutará la función createNewUserController
router.post("/", createNewUserController);

// Exportamos el router para utilizarlo en index.js
export default router;
