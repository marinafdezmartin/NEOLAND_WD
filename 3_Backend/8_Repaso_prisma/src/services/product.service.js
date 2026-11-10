import {
  getProductModel,
  createProductModel,
  updateProductModel,
  deleteProductModel,
} from "../models/product.model.js";

export function getProductService() {
  return getProductModel();
}

export function createProductService(body) {
  const { nombre, precio, disponible } = body;
  return createProductModel(nombre, precio, disponible);
}

export function updateProductService(id, actualizacion) {
  return updateProductModel(id, actualizacion);
}

export function deleteProductoService(id) {
  return deleteProductModel(id);
}
