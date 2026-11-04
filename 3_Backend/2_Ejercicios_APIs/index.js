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

// OTROS EJERCICIOS
// Ejercicio 1
api.post("/nombre-completo", (req, res) => {
  const nombre = req.body.nombre;
  const apellido = req.body.apellido;

  res.send(nombre + " " + apellido);
});

// Ejercicio 2
api.post("/discoteca", (req, res) => {
  const esMayorDeEdad = req.body.esMayorDeEdad;
  const vestimenta = req.body.vestimenta;

  if (esMayorDeEdad && vestimenta === "formal") {
    res.send("Adelante");
  } else {
    res.send("No puedes pasar");
  }
});

// Ejercicio 3
api.post("/area-rectangulo", (req, res) => {
  const base = req.body.base;
  const altura = req.body.altura;

  const resultado = base * altura;

  res.send("El área es " + resultado);
});

// Ejercicio 4
api.post("/cafetera", (req, res) => {
  const granos = req.body.granosDeCafe;
  const agua = req.body.agua;

  if (granos >= 20 && agua >= 100) {
    res.send("Toma tu café");
  } else {
    res.send("Rellena los suministros");
  }
});

// Ejercicio 5
api.post("/perfil", (req, res) => {
  const apodo = req.body.usuario.apodo;
  const nivel = req.body.usuario.nivel;

  res.send(`Bienvenido jugador ${apodo} de nivel ${nivel}`);
});

// Ejercicio 6
api.post("/checkout", (req, res) => {
  const precioOriginal = req.body.precioOriginal;
  const codigoDescuento = req.body.codigoDescuento;

  let precioFinal = precioOriginal;

  if (codigoDescuento === "JS2024") {
    precioFinal = precioOriginal * 0.8;
  } else if (codigoDescuento === "MITAD") {
    precioFinal = precioOriginal * 0.5;
  }

  res.json({ precioFinal: precioFinal });
});

// Ejercicio 7
api.post("/pares", (req, res) => {
  const numeros = req.body.numeros;

  const pares = numeros.filter((numero) => numero % 2 === 0);

  res.json(pares);
});

// Ejercicio 8
api.post("/preparar-pizza", (req, res) => {
  const masas = req.body.masas;
  const queso = req.body.queso;
  const pepperoni = req.body.pepperoni;

  const pizzas = Math.max(
    0,
    Math.floor(Math.min(masas, queso / 2, pepperoni / 5)),
  );

  res.json({ pizzas: pizzas });
});

// Ejercicio 9
api.post("/chat", (req, res) => {
  const mensaje = req.body.mensaje;

  const mensajeCensurado = mensaje.replace(/\b(tonto|tonta)\b/gi, "*****");

  res.send(mensajeCensurado);
});

// Ejercicio 10
api.post("/multiplicar-estricto", (req, res) => {
  const factorA = req.body.factorA;
  const factorB = req.body.factorB;

  if (
    typeof factorA !== "number" ||
    typeof factorB !== "number" ||
    !Number.isFinite(factorA) ||
    !Number.isFinite(factorB)
  ) {
    res.status(400).send("Error: Ambos valores deben ser numéricos reales");
  } else {
    res.json(factorA * factorB);
  }
});

// SERVIDOR
api.listen(port, () => {
  console.log(`Servidor funcionando en http://localhost:${port}`);
});
