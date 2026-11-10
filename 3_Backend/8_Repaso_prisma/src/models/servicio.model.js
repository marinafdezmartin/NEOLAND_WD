import { db } from "../prisma/db.ts";

export async function getServiceModel() {
  const servicio = await db.orm.servicios.all();
  return servicio;
}

export async function createServiceModel(nombre, precio, activo, descripcion) {
  const producto = await db.orm.servicios.create({
    nombre: nombre,
    precio: precio,
    activo: activo,
    descripcion: descripcion,
  });
  return producto;
}

export async function updateServiceModel(id, actualizacion) {
  const servicio = await db.orm.servicios.where({ id }).update(actualizacion);
  return servicio;
}

export async function deleteServiceModel(id) {
  const servicio = await db.orm.servicios.where({ id }).delete();
  return servicio;
}
