import express from "express";
import {
  getServiceController,
  createServiceController,
  updateServiceController,
  deleteServiceController,
} from "../controller/servicio.controller.js";

const router = express.Router();
router.get("/", getServiceController);
router.post("/", createServiceController);
router.patch("/:id", updateServiceController);
router.delete("/:id", deleteServiceController);

export default router;
