// export function consola() {
//     const cuerpo = document.getElementById("cuerpo")
//     const botonConsola = document.getElementById("boton-consola")
//     botonConsola.addEventListener("click", () => {
//         const parrafoNuevo = document.createElement("p")
//         parrafoNuevo.textContent = "hola mundo"
//         cuerpo.appendChild(parrafoNuevo)
//     })
// }

export function consola() {
  console.log("Hola mundo");
}

export default function idioma() {
  console.log("castellano");
}

export function cambiarTexto() {
  const texto = document.getElementById("texto");
  texto.textContent = "Hola clase";
}

export function inputNombreHandler() {
  const titulo = document.getElementById("titulo");
  const inputNombre = document.getElementById("input-nombre");

  titulo.textContent += " " + inputNombre.value;
}
