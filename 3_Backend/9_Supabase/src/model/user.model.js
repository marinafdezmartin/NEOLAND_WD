import { db } from "../prisma/db.ts";

export async function getUserModel() {
  const usuarios = await db.orm.public.User.select(
    "id",
    "email",
    "username",
    "name",
    "createdAt",
    "updatedAt",
  ).all();

  return usuarios;
}

export async function setUserModel(email, name, username, password) {
  const user = await db.orm.public.User.create({
    email,
    username,
    name,
    password,
  });

  return user;
}

export async function loginModel(email) {
  const user = await db.orm.public.User.where({ email }).first();

  return user;
}
