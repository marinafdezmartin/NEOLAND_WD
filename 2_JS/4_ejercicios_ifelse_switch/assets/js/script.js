// EJERCICIO 1
const pin = 1234;
const cajaAbierta = false;

// EJERCICIO 2
const notas = [5, 8, 7, 10];

// EJERCICIO 3
const producto = {
  nombre: "Auriculares Inalámbricos",
  precio: 49,
  enStock: true,
};

// EJERCICIO 4
const añoNacimiento = 1999;
const añoActual = 2026;

const edad = añoActual - añoNacimiento;
console.log(edad);

// EJRCICIO 5
const mezclaArray = ["casa", 4, true];

// EJERCICIO 6
const dia = 4;

switch (dia) {
  case 1:
    console.log("Lunes");
    break;
  case 2:
    console.log("Martes");
    break;
  case 3:
    console.log("Miércoles");
    break;
  case 4:
    console.log("Jueves");
    break;
  case 5:
    console.log("Viernes");
    break;
  case 6:
    console.log("Sábado");
    break;
  case 7:
    console.log("Domingo");
    break;
  default:
    console.log("Número inválido. Por favor, usa un número del 1 al 7.");
}

// EJERCICIO 7
const operacion = "suma";

const numeroA = 10;
const numeroB = 5;

switch (operacion) {
  case "suma":
    console.log(numeroA + numeroB);
    break;
  case "resta":
    console.log(numeroA - numeroB);
    break;
  default:
    console.log("No hay operación");
}

// EJERCICIO 8
switch (true) {
  case producto.precio >= 100:
    console.log(producto.precio * 0.75);
    break;
  case producto.precio < 100:
    console.log(producto.precio + 5);
    break;
  default:
    console.log("No funciona");
}

// EJERCICIO 9
const piso = 3;

if (piso < 0) {
  console.log("Estás en el sótano");
} else if (piso === 0) {
  console.log("Planta baja");
} else {
  console.log("Pisos superiores");
}

// EJERCICIO 10
const opcion = "A";

switch (opcion) {
  case "A":
    console.log("Iniciando");
    break;
  case "B":
    console.log("Cargando");
    break;
  default:
    console.log("Opción no válida");
}

// EJERCICIO 11
const sumaNotas = notas[0] + notas[3];
console.log(sumaNotas);

// EJERCICIO 12
producto.enStock = false;
console.log(producto.enStock);

// EJERCICIO 13
const arrayCorto = [10, 20];
const multiplicacionArray = arrayCorto[0] * arrayCorto[1];
console.log(multiplicacionArray);

// EJERCICIO 14
const ajustes = {
  volumen: 3,
  controles: [0.25, 0.5],
};

console.log(ajustes);

// EJERCICIO 15
const edadesArray = [10, 25, 40];
console.log(edadesArray[1] - edadesArray[0]);

// LECTURA Y COMPRENSIÓN

// EJERCICIO 16
// "Procesando"

// EJERCICIO 17
// No se hace con [], se hace con un punto
// print(usuario.edad)

// EJERCICIO 18
// Significa que si los "puntos" multiplicados por el "multiplicador" da coomo resultado mayor o igual que 100 se imprimirá "Nivel máximo"
// Si no (else), se imprimirá "Sigue jugando"

// EJERCICIO 19
// 15

// EJERCICIO 20
// Proque no hay "break"
