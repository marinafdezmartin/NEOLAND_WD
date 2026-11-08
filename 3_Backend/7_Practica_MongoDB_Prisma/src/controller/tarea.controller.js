import { createTareaService } from "../services/tarea.service.js";
import { getTareasService } from "../services/tarea.service.js";

export async function createTareaController(req, res) {
  try {
    const tarea = await createTareaService(req.body);
    res.status(201).json(tarea);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al crear la tarea" });
  }
}

export async function getTareasController(req, res) {
  try {
    const tareas = await getTareasService();
    res.status(200).json(tareas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al consultar las tareas" });
  }
}
