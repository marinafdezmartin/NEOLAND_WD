// IMPORTACIONES
import express from "express";
import "dotenv/config";
import userRouter from "./src/routers/user.route.js";

// CONFIGURACIÓN
const app = express();
const port = process.env.PORT || 3001;

// MIDDLEWARES
app.use(express.json());

// RUTAS
app.get("/", (req, res) => {
  res.status(200).send("Servidor funcionando");
});

app.use("/api/user", userRouter);

// ARRANCAR SERVIDOR
app.listen(port, () => {
  console.log(`Servidor en http://localhost:${port}`);
});
