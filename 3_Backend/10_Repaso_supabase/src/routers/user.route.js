import express from "express";
import {
  statusUserController,
  getAllUsersController,
  createUserController,
  loginUserController,
  searchUsersController,
} from "../controllers/user.controller.js";

import { validateUserToken } from "../middleware/token.middleware.js";

const router = express.Router();

router.get("/status", statusUserController);
router.get("/", validateUserToken, getAllUsersController);
router.post("/", createUserController);
router.post("/login", loginUserController);
router.post("/getuser", validateUserToken, searchUsersController);

export default router;
