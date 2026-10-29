// IMPORTAR FUNCIONES

import { consultarStock } from "./promesas.js";

// CONSULTAR UN PRODUCTO

// Mostramos un mensaje antes de iniciar la consulta.

console.log("1. Iniciando consulta de stock...");

// Llamamos a la función indicando el ID del producto.
// La función devuelve una Promise.

consultarStock(1)
  // .then() se ejecuta cuando la promesa
  // se resuelve correctamente.

  .then((producto) => {
    console.log("Producto disponible");
    console.log("Nombre:", producto.nombre);
    console.log("Precio:", producto.precio);
    console.log("Unidades disponibles:", producto.stock);
  })

  // .catch() se ejecuta cuando la promesa
  // se rechaza o aparece un error en la cadena.

  .catch((error) => {
    console.error("Ha ocurrido un error:", error.message);
  });

// Este mensaje no espera a que termine la consulta.

console.log("2. JavaScript continúa ejecutándose...");
