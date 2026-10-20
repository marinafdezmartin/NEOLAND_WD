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
    console.log(Lunes);
    break;
  case 2:
    console.log(Martes);
    break;
  case 3:
    console.log(Miércoles);
    break;
  case 4:
    console.log(Jueves);
    break;
  case 5:
    console.log(Viernes);
    break;
  case 6:
    console.log(Sábado);
    break;
  case 7:
    console.log(Domingo);
    break;
  default:
    console.log("Número inválido. Por favor, usa un número del 1 al 7.");
}
