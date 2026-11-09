import { createTareaService } from "../services/tarea.service.js";
import { getTareasService } from "../services/tarea.service.js";
import { getTareaByIdService } from "../services/tarea.service.js";
import { updateTareaService } from "../services/tarea.service.js";

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
    console.error("Error" + error);
    res.status(500).json({ mensaje: "Error al consultar las tareas" });
  }
}

export async function getTareaByIdController(req, res) {
  try {
    const { id } = req.params;
    const tarea = await getTareaByIdService(id);
    if (!tarea) {
      return res.status(404).json({ mensaje: "Tarea no encontrada" });
    }
    res.status(200).json(tarea);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al consultar la tarea" });
  }
}

export async function updateTareaController(req, res) {
  try {
    const { id } = req.params;
    const tarea = await getTareaByIdService(id);
    if (!tarea) {
      return res.status(404).json({ mensaje: "Tarea no encontrada" });
    }
    const datos = await updateTareaService(id, req.body);
    res.status(200).json(datos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al actualizar la tarea" });
  }
}
