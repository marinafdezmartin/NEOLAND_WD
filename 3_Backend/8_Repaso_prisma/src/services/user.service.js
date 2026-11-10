import { getUserModel, createUserModel } from "../models/user.model.js";

export function getUserService() {
  return getUserModel();
}

export function createUserService(body) {
  const { email, username, name } = body;

  return createUserModel(email, username, name);
}
