// EJERCICIO 7 
export function calcularOperacion(a, b, operacion) {
  switch (operacion) {
    case "sumar":
      return a + b;

    case "restar":
      return a - b;

    case "multiplicar":
      return a * b;

    case "dividir":
      return a / b;

    default:
      return null;
  }
}