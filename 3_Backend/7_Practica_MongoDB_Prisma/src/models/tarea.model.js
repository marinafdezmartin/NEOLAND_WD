import { db } from "../prisma/db.ts";

// declaramos una función asíncrona porque acceder a una base de datos requiere esperar una operación
export async function createTareaModel(titulo, descripcion, completada) {
  const tarea = await db.orm.tareas.create({
    titulo: titulo,
    descripcion: descripcion,
    completada: completada,
  });
  return tarea;
}

export async function getTareasModel() {
  const tareas = await db.orm.tareas.all();

  return tareas;
}

export async function getTareaByIdModel(id) {
  // .where({ id: id })
  const tarea = await db.orm.tareas.where({ id }).first();
  return tarea;
}

export async function updateTareaModel(id, datos) {
  const tarea = await db.orm.tareas.where({ id }).update(datos);
  return tarea;
}
