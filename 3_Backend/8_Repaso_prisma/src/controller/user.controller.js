import { getUserService, createUserService } from "../services/user.service.js";

export async function getUserController(req, res) {
  const user = await getUserService();
  res.status(200).json(user);
}

export async function createUserController(req, res) {
  try {
    const user = await createUserService(req.body);
    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al crear el usuario" });
  }
}
