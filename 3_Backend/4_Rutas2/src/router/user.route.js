import express from "express";
import { userProfileController } from "../controller/user.controller.js";

const router = express.Router();

// Así lo haciamos antes sin el controller:
// router.get("/profile", (req, res) => {
//   res.status(200).send("ruta profile");
// });

router.get("/profile", userProfileController);

router.post("/password", (req, res) => {
  res.status(200).send("password post");
});

export default router;
