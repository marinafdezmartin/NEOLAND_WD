import express from "express";
import {
  statusUserController,
  getAllUsersController,
  createUserController,
} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/status", statusUserController);
router.get("/", getAllUsersController);
router.post("/", createUserController);

export default router;
