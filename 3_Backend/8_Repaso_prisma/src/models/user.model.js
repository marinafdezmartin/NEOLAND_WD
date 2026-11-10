import { db } from "../prisma/db.ts";

export async function getUserModel() {
  const user = await db.orm.users.all();
  return user;
}

export async function createUserModel(email, username, name) {
  const user = await db.orm.users.create({
    email: email,
    username: username,
    name: name,
  });

  return user;
}
