// IMPORTACIONES
import { createNewUserService } from "../services/user.service.js";

// Función que gestiona la petición POST para crear un usuario
export function createNewUserController(req, res) {
  // Recogemos los datos JSON enviados desde Postman body
  const datosUsuario = req.body;

  // Llamamos al servicio y le pasamos los datos del usuario. Guardamos en resultado lo que nos devuelve el servicio
  const resultado = createNewUserService(datosUsuario);

  // Devolvemos a Postman el resultado en formato JSON 201 significa que se ha creado un recurso
  res.status(201).json(resultado);
}
