// crear y verificar el token
// token: llave que permite saber que la que hace una peticion, e suna persona autorizada

import jwt from "jsonwebtoken";

export function createToken(user) {
  const token = jwt.sign({ id: user.id }, process.env.TOKENKEY, {
    expiresIn: "1h",
  });

  return token;
}

export function verifyToken(token) {
  return jwt.verify(token, process.env.TOKENKEY);
}
