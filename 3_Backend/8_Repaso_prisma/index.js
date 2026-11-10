import express from "express";
import "dotenv/config";
import userRouter from "./src/routes/user.route.js";
import productRouter from "./src/routes/product.route.js";
import serviceRouter from "./src/routes/servicio.route.js";

const api = express();
const PORT = process.env.PORT || 3001;

api.use(express.json());

api.get("/", (req, res) => {
  res.send("API funcionando");
});

api.use("/api/user", userRouter);
api.use("/api/product", productRouter);
api.use("/api/service", serviceRouter);

api.listen(PORT, () => {
  console.log(`Servidor funcionando en http://localhost:${PORT}`);
});
