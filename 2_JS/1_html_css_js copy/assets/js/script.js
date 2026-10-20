const cuerpo = document.body;

// EJERCICIO 1
console.log(cuerpo.style);

const botonColorFondo = document.getElementById("boton-color-fondo");

botonColorFondo.addEventListener("click", () => {
  cuerpo.style.background = "#d3271a";
  console.log("Color cambiado");
});

// EJERCICIO 2
const tituloPrincipal = document.querySelector("h1");

console.log(tituloPrincipal);

const botonTamanioTitulo = document.getElementById("boton-tamanio-titulo");

botonTamanioTitulo.addEventListener("click", () => {
  tituloPrincipal.style.fontSize = "50px";
  console.log("Tamaño cambiado");
});

// EJERCICIO 3
const parrafoAlign = document.getElementById("parrafo-align");
console.log(parrafoAlign.style);

const botonAlinearParrafo = document.getElementById("boton-alinear-parrafo");

botonAlinearParrafo.addEventListener("click", () => {
  parrafoAlign.style.textAlign = "center";
  console.log("Párrafo alineado");
});

// EJERCICIO 4
const contenedorDiv = document.getElementById("contenedor-div");

console.log(contenedorDiv.style);

const botonRedondearEsquinas = document.getElementById(
  "boton-redondear-esquinas",
);
botonRedondearEsquinas.addEventListener("click", () => {
  contenedorDiv.style.borderRadius = "16px";
  console.log("Esquinas redondeadas");
});

// EJERCICIO 5
const parrafoInvisible = document.getElementById("parrafo-invisible");

const botonParrafoInvisible = document.getElementById(
  "boton-parrafo-invisible",
);

botonParrafoInvisible.addEventListener("click", () => {
  const colorFondo = getComputedStyle(cuerpo).backgroundColor;
  parrafoInvisible.style.color = colorFondo;
  console.log("Parrafo invisible");
});

// EJERCICIO 6
const botonFantasma = document.getElementById("boton-fantasma");

botonFantasma.addEventListener("click", () => {
  botonFantasma.remove();
  console.log("Botón fantasma");
});

// EJERCICIO 7
const imagenPerro = document.getElementById("imagen-perro");

const botonAnimales = document.getElementById("boton-animales");

botonAnimales.addEventListener("click", () => {
  imagenPerro.src =
    "https://images.unsplash.com/photo-1574144611937-0df059b5ef3e?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D";
  console.log("Imagen cambiada (perro-gato)");
});

// EJERCICIO 8
const enlaceDisney = document.getElementById("enlace-disney");

const botonEnlaceMentiroso = document.getElementById("boton-enlace-mentiroso");

botonEnlaceMentiroso.addEventListener("click", () => {
  enlaceDisney.href = "https://es.wikipedia.org/wiki/Wikipedia:Portada";
  console.log("Enlace mentiroso (disney-wikipedia)");
});

// EJERCICIO 9
const inputNombre = document.getElementById("input-nombre");

console.log(inputNombre);

const botonRellenoAutomatico = document.getElementById(
  "boton-relleno-automatico",
);

botonRellenoAutomatico.addEventListener("click", () => {
  inputNombre.value = "¡Hola, soy un robot!";
  console.log("Input completado");
});

// EJEMPLO 10
const botonCongelado = document.getElementById("boton-congelado");

botonCongelado.addEventListener("click", () => {
  botonCongelado.disabled = true;
  console.log("Botón deshabilitado");
});

// EJERCICIO 11
const botonClonador = document.getElementById("boton-clonador");
const divBotonClonador = document.getElementById("div-boton-clonador");

botonClonador.addEventListener("click", () => {
  const parrafoClonado = document.createElement("p");
  parrafoClonado.textContent = "¡Me he clonado!";

  divBotonClonador.appendChild(parrafoClonado);
  console.log("Parrafo clonado");
});

// EJERCICIO 12
const botonNuevoJS = document.createElement("button");
botonNuevoJS.textContent = "Soy nuevo";

cuerpo.appendChild(botonNuevoJS);

// EJERCICIO 13
const tituloSorpresa = document.createElement("h2");
tituloSorpresa.textContent = "¡Sorpresa!";

const divSorpresa = document.getElementById("div-sorpresa");

divSorpresa.appendChild(tituloSorpresa);

// EJERCICIO 14
const imagenInvocada = document.createElement("img");
imagenInvocada.src =
  "https://images.unsplash.com/photo-1788260762631-975846a1e3b3?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D";

cuerpo.appendChild(imagenInvocada);

// EJERCICIO 15
const parrafoVacio = document.getElementById("parrafo-vacio");
parrafoVacio.innerHTML = "<strong>Hola</strong>";

// EJERCICIO 16
const botonAsustadizo = document.getElementById("boton-austadizo");

console.log(botonAsustadizo.style);

botonAsustadizo.addEventListener("mouseover", () => {
  botonAsustadizo.style.backgroundColor = "#dbdba9";
});

// EJERCICIO 17
botonAsustadizo.addEventListener("mouseout", () => {
  botonAsustadizo.style.backgroundColor = "#e5e5e5";
});

// EJERCICIO 18
const tituloDuro = document.getElementById("titulo-duro");

tituloDuro.addEventListener("dblclick", () => {
  tituloDuro.textContent = "¡Me rompiste!";
});

// EJERCICIO 19
const inputFondo = document.getElementById("input-fondo");

inputFondo.addEventListener("keyup", () => {
  cuerpo.style.backgroundColor = "#d9dfd8";
});

// EJERCICIO 20
const tituloMagico = document.querySelector("h1");

tituloMagico.addEventListener("click", () => {
  tituloMagico.classList.add("clase-magica");
});

// EJERCICIO 21
const botonNoche = document.getElementById("boton-noche");

botonNoche.addEventListener("click", () => {
  document.body.classList.toggle("noche");
});

// EJERCICIO 22
const cartaSecreta = document.getElementById("carta-secreta");

const botonCarta = document.getElementById("boton-carta");

botonCarta.addEventListener("click", () => {
  cartaSecreta.style.opacity = "1";
});

// EJERCICIO 23
const personaje = document.getElementById("personaje");

const botonFuego = document.getElementById("boton-fuego");
const botonHielo = document.getElementById("boton-hielo");
const botonBosque = document.getElementById("boton-bosque");

botonFuego.addEventListener("click", () => {
  personaje.className = "personaje fuego";
});

botonHielo.addEventListener("click", () => {
  personaje.className = "personaje hielo";
});

botonBosque.addEventListener("click", () => {
  personaje.className = "personaje bosque";
});

// EJERCICIO 24
const selectorColor = document.getElementById("selector-color");

const lienzo = document.getElementById("lienzo");

selectorColor.addEventListener("input", () => {
  lienzo.style.backgroundColor = selectorColor.value;
});


