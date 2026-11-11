import express from "express";
import "dotenv/config";
import userRouter from "./src/routes/user.route.js";

const api = express();
const port = process.env.PORT || 3001;

api.use(express.json());

api.get("/", (req, res) => {
  res.status(200).send("API funcionando");
});

api.use("/api/user", userRouter);

api.listen(port, () => {
  console.log(`Servidor en http://localhost:${port}`);
});
