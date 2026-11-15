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

export async function createUserModel(
  email,
  username,
  name,
  password,
  address,
  embeddingData,
) {
  const user = await db.orm.repaso_supabase.User.select(
    "id",
    "email",
    "username",
    "name",
    "address",
    "createdAt",
  ).create({
    email,
    username,
    name,
    password,
    address,
    embedding: embeddingData,
  });

  return user;
}

export async function getUserByEmailModel(email) {
  const user = await db.orm.repaso_supabase.User.where({ email })
    .select("id", "email", "username", "name", "password")
    .first();

  return user;
}

export async function getNearestUsersModel(queryVector) {
  const users = await db.orm.repaso_supabase.User.select(
    "id",
    "name",
    "address",
  )
    .using.embedding_nearest(queryVector)
    .limit(10)
    .all();

  return users.filter((user) => user.address);
}
