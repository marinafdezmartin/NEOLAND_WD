import {
  getUserService,
  setUserService,
  loginService,
} from "../services/user.service.js";

export async function getUserController(req, res) {
  try {
    const user = await getUserService();
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al consultar el usuario" });
  }
}

export async function setUserController(req, res) {
  try {
    const body = req.body;
    const user = await setUserService(body);
    const { password, ...userSinPassword } = user;
    res.status(201).json(userSinPassword);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al registrar el usuario" });
  }
}

export async function loginController(req, res) {
  try {
    const resultado = await loginService(req.body);

    res.status(resultado.status).json(resultado.message);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error en el login" });
  }
}

export function privadoController(req, res) {
  res.status(200).json({ mensaje: "Acceso permitido" });
}
