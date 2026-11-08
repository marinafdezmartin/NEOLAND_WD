// Función que simula guardar un usuario en una base de datos
export function createNewUserModel(datos) {
  // Creamos un nuevo objeto con un ID y los datos recibidos
  return {
    id: 1, // ID ficticio que asignamos al usuario
    ...datos, // Copiamos nombre y correo del objeto recibido
  };
}

// EJERCICIO 3
// Recibe el ID del usuario desde el servicio
export function findUserByIdModel(id) {
  // Devolvemos el ID recibido como dato simulado
  return { id };
}
