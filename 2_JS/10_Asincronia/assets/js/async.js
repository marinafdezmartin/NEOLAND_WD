export async function asincronia(pelota) {
  return pelota;
}

// Promesa
export async function promesa() {
  const validado = true;
  return new Promise((response, reject) => {
    if (validado != false) {
      response("todo bien");
    } else {
      reject("todo mal");
    }
  });
}

export function intento(pelota) {
  try {
    console.log(pelota);
    console.log(pelotas.direccion);
    console.log(pelota.fabricante.direccion);
  } catch (e) {
    console.error(e);
  }
}
