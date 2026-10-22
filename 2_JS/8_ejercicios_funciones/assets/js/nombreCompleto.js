// EJERCICIO 12
const parrafoEj12 = document.getElementById("parrafo-ej12");
const inputEj12Nombre = document.getElementById("input-ej12-nombre");
const inputEj12Apellido = document.getElementById("input-ej12-apellido");
const botonEj12 = document.getElementById("boton-ej12");

export function nombreApellido() {
  parrafoEj12.textContent = inputEj12Nombre.value + " " + inputEj12Apellido.value;
}

botonEj12.addEventListener("click", nombreApellido);
