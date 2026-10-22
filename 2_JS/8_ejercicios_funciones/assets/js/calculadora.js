// EJERCICIO 8
const parrafoEj8 = document.getElementById("parrafo-ej8");
const inputEj8A = document.getElementById("input-ej8-A");
const inputEj8B = document.getElementById("input-ej8-B");
const botonEj8Suma = document.getElementById("boton-ej8-suma");
const botonEj8Resta = document.getElementById("boton-ej8-resta");
const botonEj8Multiplicacion = document.getElementById(
  "boton-ej8-multiplicacion",
);
const botonEj8Division = document.getElementById("boton-ej8-division");

export function calculadora() {
  function suma() {
    const resultadoSuma = Number(inputEj8A.value) + Number(inputEj8B.value);
    parrafoEj8.textContent = "Resultado de la suma: " + resultadoSuma;
  }
  function resta() {
    const resultadoResta = Number(inputEj8A.value) - Number(inputEj8B.value);
    parrafoEj8.textContent = "Resultado de la resta: " + resultadoResta;
  }
  function multiplicacion() {
    const resultadoMultiplicacion =
      Number(inputEj8A.value) * Number(inputEj8B.value);
    parrafoEj8.textContent =
      "Resultado de la multiplicación: " + resultadoMultiplicacion;
  }
  function division() {
    const resultadoDivision = Number(inputEj8A.value) / Number(inputEj8B.value);
    parrafoEj8.textContent = "Resultado de la división: " + resultadoDivision;
  }
  botonEj8Suma.addEventListener("click", suma);
  botonEj8Resta.addEventListener("click", resta);
  botonEj8Multiplicacion.addEventListener("click", multiplicacion);
  botonEj8Division.addEventListener("click", division);
}
