// IMPORTS
import express from "express";

// CONFIGURACIONES
const api = express();
const port = 3000;

// Permite leer JSON de las peticiones
api.use(express.json());

// GET
api.get("/", (req, res) => {
  res.send("lo que nos de la gana");
});

// POST
api.post("/user", (request, response) => {
  console.log(request.body);
  response.send("hola " + request.body.nombre);
});

// INICIAR SERVIDOR
api.listen(port, () => {
  console.log(`conectado a la url http://localhost:${port}`);
});
