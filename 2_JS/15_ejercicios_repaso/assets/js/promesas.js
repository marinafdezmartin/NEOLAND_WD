export async function saludar() {
  return "Hola";
}

export function rechazarPromesa() {
  return Promise.reject("Error fatal");
}

export function nuevaPromesa() {
  return new Promise((resolve, reject) => {
    resolve(5);
  });
}

export async function lanzarError() {
  throw new Error("Fallo");
}

export function ejercicio13() {
  return new Promise((resolve, reject) => {
    reject("No hay saldo");
  });
}

export function ejercicio15() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Tiempo terminado");
    }, 1000);
  });
}

export function ejercicio17(valor) {
  if (valor === "") {
    return Promise.reject("Está vacío");
  }
  return Promise.resolve(valor.toUpperCase());
}

export function verificarEdad(edad) {
  return new Promise((resolve, reject) => {
    if (edad >= 18) {
      resolve("Pase");
    } else {
      reject("Fuera");
    }
  });
}

export function comprarCoche(ahorros) {
  return new Promise((resolve, reject) => {
    if (ahorros > 5000) {
      resolve({
        coche: "usado",
        restante: ahorros - 5000,
      });
    } else {
      reject("No hay ahorro suficiente");
    }
  });
}

export function simularLanzamientoMoneda() {
  return new Promise((resolve, reject) => {
    const numeroAleatorio = Math.random();
    if (numeroAleatorio > 0.5) {
      resolve("Cara");
    } else {
      reject("Cruz");
    }
  });
}

export function verificarArray(array) {
  return new Promise((resolve, reject) => {
    if (array.length >= 3) {
      resolve(array[array.length - 1]);
    } else {
      reject("Tiene menos de 3 elementos");
    }
  });
}
