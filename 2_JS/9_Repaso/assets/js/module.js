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

import { calcularOperacion } from "./operaciones.js";

// EJERCICIO 7
const inputEj7A = document.getElementById("input-ej7-A");
const inputEj7B = document.getElementById("input-ej7-B");
const selectEj7 = document.getElementById("select-ej7");
const botonEj7 = document.getElementById("boton-ej7");
const resultadoEj7 = document.getElementById("resultado-ej7");

function calculadoraEj7() {
  if (inputEj7A.value === "" || inputEj7B.value === "") {
    resultadoEj7.textContent = "Introduce los dos números";
    return;
  }

  const numeroA = Number(inputEj7A.value);
  const numeroB = Number(inputEj7B.value);
  const operacion = selectEj7.value;

  if (operacion === "dividir" && numeroB === 0) {
    resultadoEj7.textContent = "No se puede dividir entre cero";
    return;
  }

  const resultado = calcularOperacion(numeroA, numeroB, operacion);

  resultadoEj7.textContent = `Resultado: ${resultado}`;
}

botonEj7.addEventListener("click", calculadoraEj7);

// EJERCICIO 8 -

const inputEj8 = document.getElementById("input-ej8");
const botonEj8 = document.getElementById("boton-ej8");
const resultadoEj8 = document.getElementById("resultado-ej8");

function invertirNombre(nombreCompleto) {
  const palabras = nombreCompleto.trim().split(" ");
  const nombreInvertido = palabras.reverse().join(" ").toUpperCase();

  return nombreInvertido;
}

function mostrarNombreInvertido() {
  resultadoEj8.textContent = invertirNombre(inputEj8.value);
}

botonEj8.addEventListener("click", mostrarNombreInvertido);

// EJERCICIO 9

const inputEj9 = document.getElementById("input-ej9");
const botonEj9 = document.getElementById("boton-ej9");
const tablaEj9 = document.getElementById("tabla-ej9");
const mensajeEj9 = document.getElementById("mensaje-ej9");

function generarTabla() {
  tablaEj9.innerHTML = "";
  mensajeEj9.textContent = "";

  if (inputEj9.value === "") {
    mensajeEj9.textContent = "Introduce un número";
    return;
  }

  const numero = Number(inputEj9.value);

  for (let i = 1; i <= 10; i++) {
    const resultado = numero * i;

    const fila = document.createElement("tr");
    const celdaOperacion = document.createElement("td");
    const celdaResultado = document.createElement("td");

    celdaOperacion.textContent = `${numero} × ${i}`;
    celdaResultado.textContent = resultado;

    fila.appendChild(celdaOperacion);
    fila.appendChild(celdaResultado);

    tablaEj9.appendChild(fila);
  }
}

botonEj9.addEventListener("click", generarTabla);

// EJERCICIO 10

const palabrasEj10 = ["hola", "mundo", "javascript", "es", "genial"];
const resultadoEj10 = document.getElementById("resultado-ej10");

function capitalizarPalabras(palabras) {
  const palabrasCapitalizadas = palabras.map((palabra) => {
    return palabra.charAt(0).toUpperCase() + palabra.slice(1);
  });

  return palabrasCapitalizadas.join(" ");
}

resultadoEj10.textContent = capitalizarPalabras(palabrasEj10);
