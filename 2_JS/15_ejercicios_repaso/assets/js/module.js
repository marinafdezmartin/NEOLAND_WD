// IMPORTS
import {
  saludar,
  rechazarPromesa,
  nuevaPromesa,
  lanzarError,
  ejercicio13,
  ejercicio15,
  ejercicio17,
  verificarEdad,
  comprarCoche,
  simularLanzamientoMoneda,
  verificarArray,
} from "./promesas.js";

saludar().then((resultado) => {
  console.log(resultado);
});

console.log(await saludar());

rechazarPromesa().catch((error) => console.log(error));

// setTimeout( FUNCION, TIEMPO );
setTimeout(() => {
  console.log("Listo");
}, 2000);

const miIntervalo = setInterval(() => {
  console.log("Tic");
}, 500);

setTimeout(() => {
  clearInterval(miIntervalo);
}, 3000);

nuevaPromesa().then((num) => {
  console.log(num + 5);
});

async function mostrarError() {
  try {
    await lanzarError();
  } catch (error) {
    console.error(error.message);
  }
}
mostrarError();

ejercicio13()
  .then()
  .catch((error) => {
    console.error(error);
  });

ejercicio15().then((resultado) => {
  console.log(resultado);
});

for (let i = 1; i <= 3; i++) {
  await ejercicio15();
  console.log(i);
}

// console.log(await ejercicio17("marina"));

async function ejercicio18() {
  try {
    console.log(await ejercicio17(""));
  } catch (error) {
    console.log(error);
  }
}
ejercicio18();

ejercicio17("hola")
  .then((resultado) => {
    console.log(resultado);
    return resultado;
  })
  .then((texto) => {
    console.log(texto.length);
  });

Promise.resolve("Exito")
  .then(() => {
    throw new Error("Error inesperado");
  })
  .catch((error) => {
    console.error(error.message);
  });

verificarEdad(20)
  .then((resultado) => {
    console.log(resultado);
  })
  .catch((error) => {
    console.error(error);
  });

async function comprobarEdad() {
  try {
    const resultado = await verificarEdad(20);
    console.log(resultado);
  } catch (error) {
    console.error(error);
  }
}
comprobarEdad();

comprarCoche(2000)
  .then((resultado) => {
    console.log(resultado);
  })
  .catch((error) => {
    console.error(error);
  });

simularLanzamientoMoneda()
  .then((resultado) => {
    console.log(resultado);
  })
  .catch((error) => {
    console.log(error);
  });

async function ejercicio24() {
  // lanzamiento 1
  try {
    const resultado = await simularLanzamientoMoneda();
    console.log(resultado);
  } catch (error) {
    console.error(error);
  }
  // lanzamiento 2
  try {
    const resultado = await simularLanzamientoMoneda();
    console.log(resultado);
  } catch (error) {
    console.error(error);
  }
  // lanzamiento 2
  try {
    const resultado = await simularLanzamientoMoneda();
    console.log(resultado);
  } catch (error) {
    console.error(error);
  }
}
ejercicio24();

verificarArray([2, 3, 4])
  .then((resultado) => {
    console.log(resultado);
  })
  .catch((error) => {
    console.error(error);
  });
