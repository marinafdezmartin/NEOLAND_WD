import express from "express";
import { createTareaController } from "../controller/tarea.controller.js";
import { getTareasController } from "../controller/tarea.controller.js";
import { getTareaByIdController } from "../controller/tarea.controller.js";
import { updateTareaController } from "../controller/tarea.controller.js";

const router = express.Router();
router.post("/create", createTareaController);
router.get("/", getTareasController);
router.get("/:id", getTareaByIdController);
router.patch("/:id", updateTareaController);

export default router;
