// IMPORTACIONES
import { createNewUserModel } from "../model/user.model.js";

// Función que recibe los datos enviados por el controlador
export function createNewUserService(datos) {
  // Pasamos los datos al modelo para simular la creación del usuario
  // El modelo devuelve el usuario con un ID y return devuelve ese resultado al controlador
  return createNewUserModel(datos);
}
