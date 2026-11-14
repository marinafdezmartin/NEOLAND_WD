import {
  getAllUsersService,
  createUserService,
} from "../services/user.service.js";

export function statusUserController(req, res) {
  res
    .status(200)
    .json({ mensaje: "Router de usuarios conectado correctamente" });
}

export async function getAllUsersController(req, res) {
  try {
    const users = await getAllUsersService();
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ mensaje: "Error al obtener los usuarios" });
  }
}

export async function createUserController(req, res) {
  try {
    const { email, username, name, password } = req.body;

    if (!email || typeof email !== "string" || !email.trim()) {
      return res.status(400).json({ mensaje: "El email es obligatorio" });
    }

    if (typeof password != "string" || password.length < 8) {
      return res
        .status(400)
        .json({ mensaje: "La contraseña debe tener al menos 8 caracteres" });
    }

    const user = await createUserService(
      email.trim().toLowerCase(),
      username,
      name,
      password,
    );

    res.status(201).json(user);
  } catch (error) {
    console.log(error);

    if (error.sqlState === "23505") {
      return res.status(409).json({ mensaje: "El email ya está registrado" });
    }

    res.status(500).json({ mensaje: "Error al crear el usuario" });
  }
}
