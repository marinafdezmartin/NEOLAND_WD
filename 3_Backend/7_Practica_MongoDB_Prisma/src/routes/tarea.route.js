import express from "express";
import { createTareaController } from "../controller/tarea.controller.js";
import { getTareasController } from "../controller/tarea.controller.js";

const router = express.Router();
router.post("/create", createTareaController);
router.get("/", getTareasController);

export default router;
