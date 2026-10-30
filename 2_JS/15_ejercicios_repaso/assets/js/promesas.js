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

export function numeroPar(numero) {
  return new Promise((resolve, reject) => {
    if (numero % 2 === 0) {
      setTimeout(() => {
        resolve("Es par");
      }, 1000);
    } else {
      reject("Es impar");
    }
  });
}

export async function login(usuario, password) {
  if (usuario === "admin" && password === "1234") {
    return "Correcto!";
  } else {
    throw new Error("Incorrecto");
  }
}

export function contadorPromesa() {
  return new Promise((resolve, reject) => {
    let contador = 0;
    const intervalo = setInterval(() => {
      contador++;
      console.log(contador);
      if (contador === 5) {
        clearInterval(intervalo);
        resolve(contador);
      }
    }, 1000);
  });
}

export async function ejercicio31(base, multiplicador) {
  return base * multiplicador;
}

export async function ejercicio32(nombre) {
  if (nombre === "juan") {
    return `Usuario: ${nombre.toUpperCase()} verificado`;
  }
}

export async function ejercicio33(clave) {
  if (clave === "secreta") {
    throw new Error("Clave insegura");
  }
}

export async function ejercicio34(precio, descuento) {
  if (descuento === true) {
    return precio * 0.8;
  } else {
    return precio;
  }
}

export async function ejercicio35(numeros) {
  let suma = 0;
  for (const numero of numeros) {
    suma += numero;
  }
  return suma;
}

export async function ejercicio36(estado) {
  if (estado === false) {
    throw new Error("Operación cancelada por el usuario");
  } else {
    return "Operación realizada correctamente";
  }
}

export async function ejercicio37(stock, pedido) {
  if (stock < pedido) {
    throw new Error(`Faltan ${pedido - stock} unidades`);
  } else {
    return `Hay ${stock - pedido} unidades disponibles`;
  }
}

export async function ejercicio38(palabra) {
  const palindrimo = palabra.split("").reverse().join("");
  if (palabra === palindrimo) {
    return `${palabra} es un palíndromo`;
  } else {
    throw new Error(`${palabra} no es un palíndromo`);
  }
}

export async function ejercicio39(a, b) {
  if (b === 0) {
    throw new Error("No se puede dividir por cero");
  } else {
    return a / b;
  }
}

export async function ejercicio40({ nombre, rol }) {
  if (rol === "admin") {
    return "Bienvenida administradora";
  } else {
    throw new Error("No eres administrador");
  }
}

export function ejercicio41(mensaje, tiempoMs) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(mensaje);
    }, tiempoMs);
  });
}

export function ejercicio42(usuarioId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ id: usuarioId, plan: "Premium" });
    }, 1500);
  });
}

export function ejercicio43(saldo, costoCompra) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(saldo - costoCompra);
    }, 1000);
  });
}

export function ejercicio44(array) {
  return new Promise((resolve, reject) => {
    for (let i = 0; i < array.length; i++) {
      if (typeof array[i] !== "number") {
        reject(`Tipo de dato inválido detectado en la posición ${i}`);
        return;
      }
    }
    resolve("Todos los elementos son números");
  });
}

export function ejercicio45(servidorActivo, token) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (servidorActivo === true) {
        setTimeout(() => {
          if (token === "") {
            reject("Token ausente");
          } else {
            resolve("Acceso permitido");
          }
        }, 500);
      } else {
        reject("El servidor no está activo");
      }
    }, 500);
  });
}
