import express from "express";
import { statusUserController } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/status", statusUserController);

export default router;
