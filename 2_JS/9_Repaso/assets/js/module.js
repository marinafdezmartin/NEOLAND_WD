const cuerpo = document.getElementById("cuerpo");
import { cambiarModo } from "./cambiarmodo.js";

// EJERCICIO 1
const parrafoEj1 = document.getElementById("parrafo-ej1");
const inputEj1 = document.getElementById("input-ej1");
const botonEj1 = document.getElementById("boton-ej1");

function contarVocales() {
  const texto = inputEj1.value.toLocaleLowerCase();
  const vocales = "aeiouáéíóú";
  let contador = 0;

  for (let i = 0; i < texto.length; i++) {
    if (vocales.includes(texto[i])) {
      contador++;
    }
  }
  parrafoEj1.textContent = `El texto tiene ${contador} vocales`;
}
botonEj1.addEventListener("click", contarVocales);

// EJERCICIO 2
const colores = ["red", "blue", "green", "yellow", "purple"];

function generarCajas() {
  for (let i = 0; i < colores.length; i++) {
    const caja = document.createElement("div");

    caja.style.width = "100px";
    caja.style.height = "100px";
    caja.style.backgroundColor = colores[i];
    caja.style.margin = "10px";

    document.body.appendChild(caja);
  }
}
generarCajas();

// EJERCICIO 3
const precios = [15, 50, 20, 120, 8, 90];
const listaEj3 = document.getElementById("lista-ej3");

function descuentos() {
  precios.forEach((item) => {
    if (item > 30) {
      const precioFinal = item * 0.9;
      const indicadorPrecioFinal = document.createElement("li");
      indicadorPrecioFinal.textContent = `El precio final es ${precioFinal}€`;
      listaEj3.appendChild(indicadorPrecioFinal);
    }
  });
}
descuentos();

// EJERCICIO 4
const botonEj4 = document.getElementById("boton-ej4");
botonEj4.addEventListener("click", cambiarModo);

// EJERCICIO 5
function palindromo() {
  const texto = "Anita lava la tina";
  const textoDerecho = texto.toLocaleLowerCase().replaceAll(" ", "");
  const textoReves = textoDerecho.split("").reverse().join("");
  console.log(textoDerecho);
  console.log(textoReves);

  const mensaje = document.createElement("p");
  cuerpo.appendChild(mensaje);

  if (textoDerecho === textoReves) {
    mensaje.textContent = "Es palindromo";
  } else {
    mensaje.textContent = "No es palíndromo";
  }
}
palindromo();

// EJERCICIO 6
for (let i = 1; i <= 50; i++) {
  const mensajeFizz = document.createElement("p");

  if (i % 3 === 0 && i % 5 === 0) {
    mensajeFizz.textContent = "FizzBuzz";
    mensajeFizz.style.color = "#cc00cc";
  } else if (i % 3 === 0) {
    mensajeFizz.textContent = "Fizz";
    mensajeFizz.style.color = "#3587ff";
  } else if (i % 5 === 0) {
    mensajeFizz.textContent = "Buzz";
    mensajeFizz.style.color = "#e5021e";
  }
  cuerpo.appendChild(mensajeFizz);
}
