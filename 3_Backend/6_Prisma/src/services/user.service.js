// IMPORTACIONES
import { createUserModel } from "../model/user.model.js";

// Función que llama al modelo para crear un usuario
export function createUserService() {
  return createUserModel();
}
