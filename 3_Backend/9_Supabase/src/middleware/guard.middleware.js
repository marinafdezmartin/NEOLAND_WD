import { verifyToken } from "../services/token/token.service.js";

export function validateUser(req, res, next) {
  const authorization = req.headers.authorization;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(401).json({ mensaje: "Token no proporcionado" });
  }

  const token = authorization.split(" ")[1];

  try {
    const usuario = verifyToken(token);

    req.user = usuario;

    next();
  } catch (error) {
    res.status(401).json({ mensaje: "Token inválido o caducado" });
  }
}
