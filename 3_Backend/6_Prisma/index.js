// IMPORTACIONES
import express from "express";
import "dotenv/config";
import userRouter from "./src/routes/user.routes.js";

// CONFIGURACIÓN DEL SERVIDOR
const api = express();
const port = process.env.PORT || 3001;

// Permite recibir JSON
api.use(express.json());

// RUTAS
api.use("/api/users", userRouter);

// ARRANCAR EL SERVIDOR
api.listen(port, () => {
  console.log(`Servidor en http://localhost:${port}`);
});
