import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { embedding } from "./embedding.service.js";

import {
  getAllUsersModel,
  createUserModel,
  getUserByEmailModel,
  getNearestUsersModel,
} from "../modules/user.module.js";

export async function getAllUsersService() {
  const users = await getAllUsersModel();
  return users;
}

export async function createUserService(
  email,
  username,
  name,
  password,
  address,
) {
  const hashedPassword = await bcrypt.hash(password, 10);

  const cleanAddress = address ? address.trim() : null;

  const embeddingData = cleanAddress ? await embedding(cleanAddress) : null;

  const user = await createUserModel(
    email,
    username,
    name,
    hashedPassword,
    cleanAddress,
    embeddingData,
  );

  return user;
}

export async function loginUserService(email, password) {
  // 1. Busca el usuario en Supabase
  const user = await getUserByEmailModel(email);

  if (!user || !user.password) {
    return null;
  }

  // 2. Comprueba la contraseña
  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) {
    return null;
  }

  if (!process.env.JWT_SECRET) {
    throw new Error("Falta JWT_SECRET en .env");
  }

  // 3. Genera un token de una hora
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  return {
    token,
    user: {
      id: user.id,
      email: user.email,
      username: user.username,
      name: user.name,
    },
  };
}

export async function searchUsersService(solicitud) {
  const queryVector = await embedding(solicitud);

  const users = await getNearestUsersModel(queryVector);

  return users;
}
