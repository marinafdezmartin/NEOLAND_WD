import express from "express";
import {
  getUserController,
  createUserController,
} from "../controller/user.controller.js";

const router = express.Router();
router.get("/getuser", getUserController);
router.post("/create", createUserController);

export default router;
