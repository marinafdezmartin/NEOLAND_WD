import { db } from "../prisma/db.ts";

export async function createProductoModel(nombre, precio, disponible) {
  return await db.orm.public.Producto.create({ nombre, precio, disponible });
}

export async function getProductosModel() {
  return await db.orm.public.Producto.all();
}

export async function getProductoByIdModel(id) {
  return await db.orm.public.Producto.where({ id }).first();
}

export async function updateProductoModel(id, datos) {
  return await db.orm.public.Producto.where({ id }).update(datos);
}

export async function deleteProductoModel(id) {
  return await db.orm.public.Producto.where({ id }).delete();
}
