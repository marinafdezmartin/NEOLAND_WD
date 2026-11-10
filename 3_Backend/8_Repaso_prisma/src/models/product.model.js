import { db } from "../prisma/db.ts";

export async function getProductModel() {
  const product = await db.orm.productos.all();
  return product;
}

export async function createProductModel(nombre, precio, disponible) {
  const product = await db.orm.productos.create({
    nombre: nombre,
    precio: precio,
    disponible: disponible,
  });
  return product;
}

export async function updateProductModel(id, actualizacion) {
  const producto = await db.orm.productos.where({ id }).update(actualizacion);
  return producto;
}

export async function deleteProductModel(id) {
  const producto = await db.orm.productos.where({ id }).delete();
  return producto;
}
