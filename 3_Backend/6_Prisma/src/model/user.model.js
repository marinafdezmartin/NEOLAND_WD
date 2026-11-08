// IMPORTACIONES
import { db } from "../prisma/db.ts";

// Función que crea un usuario en MongoDB
export async function createUserModel() {
  try {
    // Creamos un usuario en la colección "users"
    const user = await db.orm.users.create({
      email: "prueba1@test.com",
      username: "marta",
    });

    // Si se ha creado correctamente
    return "ok";
  } catch (e) {
    // Si ocurre algún error
    console.error(e);
    return "error";
  }
}
