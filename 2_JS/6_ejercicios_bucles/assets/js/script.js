// EJERCICIO 1
const colores = ["rojo", "azul"];
colores.push("verde");

console.log(colores);

// EJERCICIO 2
const animales = ["perro", "gato", "loro"];
animales.shift([0]);

console.log(animales);

// EJERCICIO 3
animales.unshift("elefante");
console.log(animales);

// EJERCICIO 4
const numeros = [1, 2, 3, 4, 5];
numeros.splice(2, 2);
console.log(numeros);

// EJERCICIO 5
const programacion = "programacion";
console.log(programacion.indexOf("m"));

// EJERCICIO 6
const esternocleidomastoideo = "esternocleidomastoideo";
console.log(esternocleidomastoideo.length);

// EJERCICIO 7
const saludo = "Hola mundo";
console.log(saludo.replace("mundo", "clase"));

// EJERCICIO 8
const murcielago = "murciélago";
console.log(murcielago.slice(3, 8));

// EJERCICIO 9
const frase = "Aprender JS es genial";
console.log(frase.split(" "));

// EJERCICIO 10
const nombre = "Ana";
const edad = 25;
console.log(`Hola, me llamo ${nombre} y tengo ${edad} años.`);

// EJERCICIO 11
const texto = "Me gusta";
console.log(texto.concat(" programar"));

// EJERCICIO 12
const cuerpo = document.getElementById("cuerpo");
const titulo1 = document.createElement("h1");
titulo1.textContent = "Mi primer DOM";
// Prepend: inserta el elemento directamente como el primer hijo del contenedor
cuerpo.prepend(titulo1);

// EJERCICIO 13
const parrafo = document.getElementById("parrafo");
const input = document.getElementById("input");
const botonEnviar = document.getElementById("boton-enviar");

botonEnviar.addEventListener("click", () => {
  parrafo.textContent = input.value;
});

// EJERCICIO 14
for (let i = 1; i <= 5; i++) {
  console.log(i);
}

console.log("/////////");

// EJERCICIO 5
let i = 5;

while (i >= 1) {
  console.log(i);
  i--;
}

console.log("/////////");

// EJERCICIO 16
const alumnos = ["Juan", "Maria", "Pedro"];
alumnos.forEach((item) => {
  console.log(`Presente: ${item}`);
});

console.log("/////////");

// EJERCICIO 17
const autos = ["Ford", "Fiat"];
autos.map((item) => {
  console.log(`Marca: ${item}`);
});

console.log("/////////");

// EJERCICIO 18
autos.forEach((item) => {
  if (item.includes("a")) {
    console.log(item);
  }
});

console.log("/////////");

// EJERCICIO 19
for (let i = 1; i <= 3; i++) {
  const parrafoBucle = document.createElement("p");
  parrafoBucle.textContent = "Vuelta " + i;
  cuerpo.append(parrafoBucle);
}

// EJERCICIO 20
let e = 0;
do {
  console.log(e);
  e++;
} while (e <= 3);

// FIZZ BUZZ
for (let i = 1; i <= 100; i++) {
  // % devuelve el resto de una división
  // si el resto es 0 -> el numero es multiplo del divisor
  if (i % 3 === 0 && i % 5 === 0) {
    console.log("fizzbuzz");
  } else if (i % 3 === 0) {
    console.log("fizz");
  } else if (i % 5 === 0) {
    console.log("buzz");
  } else {
    console.log(i);
  }
}
