// IMPORTACIONES
import express from "express";
import "dotenv/config";
import userRouter from "./src/router/user.router.js";
import productRouter from "./src/router/product.router.js";
import dashboardRouter from "./src/router/dashboard.router.js";

// CONFIGURACIÓN DEL SERVIDOR
const api = express();
const port = process.env.PORT || 3000;

// Permite recibir y leer datos JSON enviados desde Postman (req.body)
api.use(express.json());

// RUTAS
// Todas las peticiones que empiecen por /api/users se gestionarán desde user.routes.js
api.use("/api/users", userRouter);
api.use("/api/products", productRouter);
api.use("/api/dashboard", dashboardRouter);

// ARRANCAR EL SERVIDOR
api.listen(port, () => {
  console.log(`Servidor en http://localhost:${port}`);
});
