import {
  createProductoModel,
  getProductosModel,
  getProductoByIdModel,
  updateProductoModel,
  deleteProductoModel,
} from "../model/producto.model.js";

export function createProductoService(body) {
  const { nombre, precio, disponible = true } = body;
  return createProductoModel(nombre.trim(), precio, disponible);
}

export function getProductosService() {
  return getProductosModel();
}

export function getProductoByIdService(id) {
  return getProductoByIdModel(id);
}

export function updateProductoService(id, body) {
  const datos = { ...body };
  if (typeof datos.nombre === "string") datos.nombre = datos.nombre.trim();
  return updateProductoModel(id, datos);
}

export function deleteProductoService(id) {
  return deleteProductoModel(id);
}
