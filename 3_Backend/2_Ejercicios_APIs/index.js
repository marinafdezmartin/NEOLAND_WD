import express from "express";

const api = express();
const port = 8080;

api.use(express.json());

// Ejercicio 1
api.get("/saludo", (req, res) => {
  res.send("¡Hola, futuros desarrolladores!");
});

// Ejercicio 2
api.post("/user", (req, res) => {
  const nombreUsuario = req.body.nombre;
  const apellidoUsuario = req.body.apellido;
  res.send(`Usuario registrado: ${nombreUsuario} ${apellidoUsuario}`);
});

// Ejercicio 3
api.post("/resta", (req, res) => {
  const numA = req.body.numA;
  const numB = req.body.numB;
  res.json(numA - numB);
});

// Ejercicio 4
api.post("/limonada", (req, res) => {
  const agua = req.body.agua;
  const limon = req.body.limon;
  if (agua && limon) {
    res.send("¡Zumo de limón listo!");
  } else {
    res.send("Faltan ingredientes, ve al supermercado");
  }
});

// Ejercicio 6
api.get("/multiplicar", (req, res) => {
  const parametroA = Number(req.query.a);
  const parametroB = Number(req.query.b);
  res.json(parametroA * parametroB);
});

// Ejercicio 7
api.get("/usuario/:id", (req, res) => {
  const idUser = req.params.id;
  res.json({
    idUsuario: idUser,
    estado: "Activo",
  });
});

// SERVIDOR
api.listen(port, () => {
  console.log(`Servidor funcionando en http://localhost:${port}`);
});
