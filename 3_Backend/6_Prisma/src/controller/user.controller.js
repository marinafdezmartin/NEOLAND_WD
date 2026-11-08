// IMPORTACIONES
import { createUserService } from "../services/user.service.js";

// Función que gestiona la petición
export async function createUserController(req, res) {
  // Esperamos el resultado del servicio y lo enviamos a Postman
  res.status(200).send(await createUserService());
}
