import express from "express";
import "dotenv/config";
import tareaRouter from "./src/routes/tarea.route.js";

const api = express();
const PORT = process.env.PORT || 3001;

api.use(express.json());
api.use("/api/tareas", tareaRouter);

api.get("/", (req, res) => {
  res.send("API de tareas funcionando");
});

api.listen(PORT, () => {
  console.log(`Servidor funcionando en http://localhost:${PORT}`);
});
