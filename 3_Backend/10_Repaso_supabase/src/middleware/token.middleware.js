import jwt from "jsonwebtoken";

export function validateUserToken(req, res, next) {
  // Busca el token
  const authorization = req.headers.authorization;

  //   Comprueba que tenga el formato "Bearer TOKEN"
  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(401).json({ mensaje: "Token no proporcionado" });
  }

  const token = authorization.split(" ")[1];

  try {
    // Comprueba la firma y la caducidad
    const user = jwt.verify(token, process.env.JWT_SECRET);

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ mensaje: "Token inválido o caducado" });
  }
}
