import { consola } from "./funciones.js";
// La default la puedes llamar como quieras xq es la default
import defecto from "./funciones.js";
import { cambiarTexto } from "./funciones.js";
import { inputNombreHandler } from "./funciones.js";

// consola();
// idioma();

const botonConsola = document.getElementById("boton-consola");

botonConsola.addEventListener("click", () => {
  console.log("Funcion nombrada");
  consola();
  console.log("Funcion por defecto");
  defecto();
  console.log("texto del parrafo cambiado");
  cambiarTexto();
  console.log("Saludo");
  inputNombreHandler();
});
