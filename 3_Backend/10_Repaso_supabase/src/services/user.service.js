import bcrypt from "bcrypt";
import { getAllUsersModel, createUserModel } from "../modules/user.module.js";

export async function getAllUsersService() {
  const users = await getAllUsersModel();
  return users;
}

export async function createUserService(email, username, name, password) {
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await createUserModel(email, username, name, hashedPassword);
  return user;
}
