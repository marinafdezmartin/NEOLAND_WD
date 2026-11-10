import {
  getServiceModel,
  createServiceModel,
  updateServiceModel,
  deleteServiceModel,
} from "../models/servicio.model.js";

export function getServiceService() {
  return getServiceModel();
}

export function createServiceService(body) {
  const { nombre, precio, activo, descripcion } = body;
  return createServiceModel(nombre, precio, activo, descripcion);
}

export function updateServiceService(id, actualizacion) {
  return updateServiceModel(id, actualizacion);
}

export function deleteServiceService(id) {
  return deleteServiceModel(id);
}
