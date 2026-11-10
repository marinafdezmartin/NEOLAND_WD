import express from "express";
import {
  getProductController,
  createProductController,
  updateProductController,
  deleteProductController,
} from "../controller/product.controller.js";

const router = express.Router();
router.get("/", getProductController);
router.post("/", createProductController);
router.patch("/:id", updateProductController);
router.delete("/:id", deleteProductController);

export default router;
