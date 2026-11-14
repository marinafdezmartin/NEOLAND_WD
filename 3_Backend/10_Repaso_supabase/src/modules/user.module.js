import { db } from "../prisma/db.ts";

export async function getAllUsersModel() {
  const users = await db.orm.repaso_supabase.User.select(
    "id",
    "email",
    "username",
    "name",
    "createdAt",
  ).all();
  return users;
}

export async function createUserModel(email, username, name, password) {
  const user = await db.orm.repaso_supabase.User.select(
    "id",
    "email",
    "username",
    "name",
    "createdAt",
  ).create({
    email,
    username,
    name,
    password,
  });
  return user;
}
