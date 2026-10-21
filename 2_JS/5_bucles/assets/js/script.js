const tituloNombre = document.getElementById("titulo-nombre");
const botonEnviar = document.getElementById("boton-enviar");
const inputNombre = document.getElementById("input-nombre");
console.log(inputNombre);

botonEnviar.addEventListener("click", () => {
  console.log(inputNombre.value);
  tituloNombre.textContent = inputNombre.value;
});

// MANIPULACION LISTAS

const frutas = ["pera", "manzana", "mango", "aguacate"];
console.log(frutas);

console.log(frutas[3]);

// añadir elemento a la lista
frutas[6] = "sandía";
console.log(frutas);

// eliminar la ultima posicion
frutas.pop();
console.log(frutas);

// eliminar la primera
frutas.shift();
console.log(frutas);

// anadir en primera posicion
frutas.unshift("kiwi");
console.log(frutas);

// añadir al final
frutas.push("banana");
console.log(frutas);

// borrar los vacios
frutas.splice(4, 2);
console.log(frutas);

// MANIPULACION CARACTERES
const prof = "otorrinolaringólogo";
console.log(prof);
console.log(prof.length);
console.log(prof.replace("logo", "logía"));
console.log(prof.split(""));
console.log(prof.slice(0, 8));

// BUCLE FOR
const cuerpo = document.getElementById("cuerpo");

for (let i = 0; i <= 10; i++) {
  const contadorFor = document.createElement("p");
  contadorFor.textContent = i;
  cuerpo.appendChild(contadorFor);
}

const titulo2 = document.createElement("h3");
titulo2.textContent = "While";
cuerpo.appendChild(titulo2);

// BUCLE WHILE
let i = 0;
while (i <= 10) {
  const contadorFor = document.createElement("p");
  contadorFor.textContent = i;
  cuerpo.appendChild(contadorFor);
  i++;
}

const titulo3 = document.createElement("h3");
titulo3.textContent = "Do while";
cuerpo.appendChild(titulo3);

// BUCLE DO WHILE
do {
  const contadorFor = document.createElement("p");
  contadorFor.textContent = i;
  cuerpo.appendChild(contadorFor);
  i--;
} while (i >= 10);

const titulo4 = document.createElement("h3");
titulo4.textContent = "For each";
cuerpo.appendChild(titulo4);

// FOR EACH
frutas.forEach((item, index) => {
  console.log(item);
});

// .MAP
console.log("/////////////")
const frutasN = frutas.map((item) => {
  if (item.includes("n")) {
    return item;
  }
});
console.log(frutas)
console.log(frutasN); 
