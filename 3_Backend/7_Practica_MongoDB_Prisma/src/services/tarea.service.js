import { createTareaModel } from "../models/tarea.model.js";
import { getTareasModel } from "../models/tarea.model.js";
import { getTareaByIdModel } from "../models/tarea.model.js";
import { updateTareaModel } from "../models/tarea.model.js";

export function createTareaService(body) {
  // recibimos un objeto body con los datos de la tarea
  const { titulo, descripcion, completada = false } = body;

  //   Le enviamos los datos para que Prisma los guarde en MongoDB
  return createTareaModel(titulo, descripcion, completada);
}

export function getTareasService() {
  return getTareasModel();
}

export function getTareaByIdService(id) {
  return getTareaByIdModel(id);
}

export function updateTareaService(id, datos) {
  return updateTareaModel(id, datos);
}
