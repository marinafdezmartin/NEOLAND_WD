import express from "express";
import {
  getUserController,
  setUserController,
  loginController,
  privadoController,
} from "../controller/user.controller.js";

import { validateUser } from "../middleware/guard.middleware.js";

const router = express.Router();
router.get("/", validateUser, getUserController);
router.post("/", setUserController);
router.post("/login", loginController);
router.get("/privado", validateUser, privadoController);

export default router;
