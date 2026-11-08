// IMPORTACIONES
import express from "express";
import { verifyDashboardController } from "../controller/dashboard.controller.js";

// Creamos el router del dashboard
const router = express.Router();

// Cuando llegue un POST a /api/dashboard/verify ejecutamos la función del controlador
router.post("/verify", verifyDashboardController);

// Exportamos el router para utilizarlo en index
export default router;
