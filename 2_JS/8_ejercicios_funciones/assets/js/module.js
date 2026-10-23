import { sumar } from "./matematicas.js";
import { calculadora } from "./calculadora.js";
import saludo from "./saludo.js";
import { saludar } from "./TEXTOS.JS";
import { nombreApellido } from "./nombreCompleto.js";

// EJERCICIO 1
console.log(sumar(4, 6));

// EJERCICIO 2
console.log(saludo());

// EJERCICIO 3
const botonEj3 = document.getElementById("boton-ej3");

// Función que se ejecutará al hacer clic
function hacerClick() {
  console.log("Has hecho click");
}

// Asociamos el evento al botón
botonEj3.addEventListener("click", hacerClick);

// EJERCICIO 4
const parrafoEj4 = document.getElementById("parrafo-ej4");
const botonEj4 = document.getElementById("boton-ej4");

function agregarTexto() {
  parrafoEj4.textContent = "¡Magia!";
}
botonEj4.addEventListener("click", agregarTexto);

// EJERCICIO 5
const parrafoEj5 = document.getElementById("parrafo-ej5");
const inputEj5 = document.getElementById("input-ej5");
const botonEj5 = document.getElementById("boton-ej5");

function inputParrafo() {
  parrafoEj5.textContent = inputEj5.value;
}

botonEj5.addEventListener("click", inputParrafo);

// EJERCICIO 6
const inputEj6 = document.getElementById("input-ej6");
const botonEj6 = document.getElementById("boton-ej6");

function borrarInput() {
  inputEj6.value = "";
}

botonEj6.addEventListener("click", borrarInput);

// EJERCICIO 7
const parrafoEj7 = document.getElementById("parrafo-ej7");
const inputEj7A = document.getElementById("input-ej7-A");
const inputEj7B = document.getElementById("input-ej7-B");
const botonEj7 = document.getElementById("boton-ej7");

function calculadoraSuma() {
  const resultadoSuma = Number(inputEj7A.value) + Number(inputEj7B.value);
  parrafoEj7.textContent = "Resultado de la suma: " + resultadoSuma;
}
botonEj7.addEventListener("click", calculadoraSuma);

// EJERCICIO 8
calculadora();

// EJERCICIO 9
(() => {
  const tituloPrincipal = document.querySelector("h1");

  tituloPrincipal.textContent = "Bienvenido a la App";
})();

// EJERCICIO 10
console.log(saludar("marina"));

// EJERCICIO 11
// ***funcion normal
// function borrarInput() {
//   inputEj6.value = "";
// }
// ***funcion flecha
// const inputBorrado = () => {
//   inputEj6.value = "";
// };
// botonEj6.addEventListener("click", borrarInput);

// EJERCICIO 12
nombreApellido();

// EJERCICIO 13
(() => {
  const parrafoEj13 = document.getElementById("parrafo-ej13");
  const botonEj13 = document.getElementById("boton-ej13");

  botonEj13.addEventListener("click", () => {
    if (parrafoEj13.textContent === "Apagado") {
      parrafoEj13.textContent = "Encendido";
    } else {
      parrafoEj13.textContent = "Apagado";
    }
  });
})();

// EJERCICIO 14
const parrafoEj14 = document.getElementById("parrafo-ej14");
const botonEj14 = document.getElementById("boton-ej14");

function borrarTexto() {
  parrafoEj14.textContent = " ";
}

botonEj14.addEventListener("click", borrarTexto);
