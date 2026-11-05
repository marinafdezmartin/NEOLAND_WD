// IMPORTACIONES
import express from "express";
import "dotenv/config";
import userRouter from "./src/router/user.route.js";

// CONFIGURACIONES
const api = express();
const port = process.env.PORT || 3001;

api.use(express.json()); // Permite leer JSON del body

// API (de prueba)
api.get("/", (req, res) => {
  res.status(200).send("todo bien");
});

// RUTAS
api.use("/user", userRouter);

api.listen(port, () => {
  console.log(`Servidor en http://localhost:${port}`);
});
