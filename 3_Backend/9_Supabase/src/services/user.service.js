import { getUserModel, setUserModel, loginModel } from "../model/user.model.js";
import { createToken } from "./token/token.service.js";
import bcrypt from "bcrypt";

export function getUserService() {
  return getUserModel();
}

export async function setUserService(body) {
  const { email, name, username, password } = body;

  const saltRounds = 10;
  //   transforma la contraseña en un hash
  const passwordHash = await bcrypt.hash(password, saltRounds);

  return setUserModel(email, name, username, passwordHash);
}

export async function loginService(body) {
  const { email, password } = body;

  // Comprobamos que se han enviado los datos
  if (!email || !password) {
    return { status: 400, message: "Email y contraseña obligatorios" };
  }

  // Buscamos al usuario en supabase
  const user = await loginModel(email);
  const userdata = {
    name: user.name,
    username: user.username,
    email: user.email,
  };

  if (!user || !user.password) {
    return { status: 401, message: "Email o contraseña incorrectos" };
  }

  // Comparamos la contraseña con el hash guardado
  const passwordCorrecta = await bcrypt.compare(password, user.password);

  if (!passwordCorrecta) {
    return { status: 401, message: "Email o contraseña incorrectos" };
  }

  const token = createToken(userdata);
  // Devolvemos los datos del usuario sin su contraseña
  return {
    status: 200,
    message: {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        username: user.username,
      },
      token: token,
    },
  };
}
