// EJERCICIO 1
function ejercicio1() {
  for (let i = 1; i <= 100; i++) {
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
}
// ejercicio1();

// EJERCICIO 2
function ejercicio2(palabra1, palabra2) {
  const primera = palabra1.toLowerCase();
  const segunda = palabra2.toLowerCase();
  if (primera === segunda) return false;
  return (
    primera.split("").sort().join("") === segunda.split("").sort().join("")
  );
}
// console.log(ejercicio2("amor", "roma"));

// EJERCICIO 3
function ejercicio3() {
  let a = 0;
  let b = 1;
  for (let i = 0; i < 50; i++) {
    console.log(a);
    const siguiente = a + b;
    a = b;
    b = siguiente;
  }
}
// ejercicio3();

// EJERCICIO 4
function ejercicio4(numero) {
  if (numero < 2) return false;
  for (let i = 2; i < numero; i++) {
    if (numero % i === 0) return false;
  }
  return true;
}
// for (let i = 1; i <= 100; i++) {
//   if (ejercicio4(i)) console.log(i);
// }

// EJERCICIO 5
function ejercicio5(poligono) {
  if (poligono.tipo === "triangulo") {
    return (poligono.base * poligono.altura) / 2;
  } else if (poligono.tipo === "cuadrado") {
    return poligono.lado * poligono.lado;
  } else if (poligono.tipo === "rectangulo") {
    return poligono.base * poligono.altura;
  }
  return "Polígono no válido";
}
// console.log(ejercicio5({ tipo: "triangulo", base: 10, altura: 4 }));
// console.log(ejercicio5({ tipo: "cuadrado", lado: 5 }));
// console.log(ejercicio5({ tipo: "rectangulo", base: 10, altura: 3 }));

// EJERCICIO 6
function ejercicio6(url) {
  const imagen = new Image();
  imagen.onload = function () {
    const ancho = imagen.naturalWidth;
    const alto = imagen.naturalHeight;
    let a = ancho;
    let b = alto;
    while (b !== 0) {
      const resto = a % b;
      a = b;
      b = resto;
    }
    console.log(`${ancho / a}:${alto / a}`);
  };
  imagen.onerror = function () {
    console.error("No se ha podido cargar la imagen");
  };
  imagen.src = url;
}
// ejercicio6("https://raw.githubusercontent.com/mouredevmouredev/master/mouredev_github_profile.png");

// EJERCICIO 7
function ejercicio7(texto) {
  let invertido = "";
  for (let i = texto.length - 1; i >= 0; i--) {
    invertido += texto[i];
  }
  return invertido;
}
// console.log(ejercicio7("Hola mundo"));

// EJERCICIO 8
function ejercicio8(texto) {
  const limpio = texto.toLowerCase().replace(/[^\p{L}\p{N}\s]/gu, "");
  const palabras = limpio.split(/\s+/);
  const contador = {};
  for (const palabra of palabras) {
    if (palabra === "") continue;
    if (contador[palabra]) {
      contador[palabra]++;
    } else {
      contador[palabra] = 1;
    }
  }
  return contador;
}
// console.log(ejercicio8("Hola, hola mundo. Mundo!"));

// EJERCICIO 9
function ejercicio9(numero) {
  if (numero === 0) return "0";
  if (!Number.isInteger(numero)) return "Introduce un número entero";
  let binario = "";
  let n = Math.abs(numero);
  while (n > 0) {
    binario = (n % 2) + binario;
    n = Math.floor(n / 2);
  }
  return numero < 0 ? "-" + binario : binario;
}
// console.log(ejercicio9(23));

// EJERCICIO 10
function ejercicio10(texto) {
  const codigo = {
    A: ".—",
    B: "—...",
    C: "—.—.",
    D: "—..",
    E: ".",
    F: "..—.",
    G: "——.",
    H: "....",
    I: "..",
    J: ".———",
    K: "—.—",
    L: ".—..",
    M: "——",
    N: "—.",
    Ñ: "——.——",
    O: "———",
    P: ".——.",
    Q: "——.—",
    R: ".—.",
    S: "...",
    T: "—",
    U: "..—",
    V: "...—",
    W: ".——",
    X: "—..—",
    Y: "—.——",
    Z: "——..",
    0: "—————",
    1: ".————",
    2: "..———",
    3: "...——",
    4: "....—",
    5: ".....",
    6: "—....",
    7: "——...",
    8: "———..",
    9: "————.",
    ".": ".—.—.—",
    ",": "——..——",
    "?": "..——..",
    "!": "—.—.——",
  };

  if (/^[.—\s]+$/.test(texto.trim())) {
    const palabras = texto.trim().split("  ");
    const resultado = [];
    for (const palabra of palabras) {
      let letras = "";
      for (const simbolo of palabra.split(" ")) {
        for (const letra in codigo) {
          if (codigo[letra] === simbolo) letras += letra;
        }
      }
      resultado.push(letras);
    }
    return resultado.join(" ");
  }

  const palabras = texto.toUpperCase().split(" ");
  const resultado = [];
  for (const palabra of palabras) {
    const letras = [];
    for (const letra of palabra) {
      if (codigo[letra]) letras.push(codigo[letra]);
    }
    resultado.push(letras.join(" "));
  }
  return resultado.join("  ");
}
// console.log(ejercicio10("HOLA"));
// console.log(ejercicio10(".... ——— .—.. .—"));

// EJERCICIO 11
function ejercicio11(texto) {
  const pila = [];
  const parejas = { ")": "(", "]": "[", "}": "{" };
  for (const letra of texto) {
    if ("([{".includes(letra)) {
      pila.push(letra);
    } else if (")]}".includes(letra)) {
      if (pila.pop() !== parejas[letra]) return false;
    }
  }
  return pila.length === 0;
}
// console.log(ejercicio11("{ [ a * ( c + d ) ] - 5 }"));

// EJERCICIO 12
function ejercicio12(texto1, texto2) {
  let primero = "";
  let segundo = "";
  for (const letra of texto1) {
    if (!texto2.includes(letra)) primero += letra;
  }
  for (const letra of texto2) {
    if (!texto1.includes(letra)) segundo += letra;
  }
  return { primero, segundo };
}
// console.log(ejercicio12("abcde", "cdefg"));

// EJERCICIO 13
function ejercicio13(texto) {
  const limpio = texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]/g, "");
  return limpio === limpio.split("").reverse().join("");
}
// console.log(ejercicio13("Ana lleva al oso la avellana"));

// EJERCICIO 14
function ejercicio14(numero) {
  if (numero < 0 || !Number.isInteger(numero)) return "Número no válido";
  if (numero === 0 || numero === 1) return 1;
  return numero * ejercicio14(numero - 1);
}
// console.log(ejercicio14(5));

// EJERCICIO 15
function ejercicio15(numero) {
  const digitos = String(numero);
  let suma = 0;
  for (const digito of digitos) {
    suma += Number(digito) ** digitos.length;
  }
  return suma === numero;
}
// console.log(ejercicio15(153));

// EJERCICIO 16
function ejercicio16(fecha1, fecha2) {
  function convertir(texto) {
    if (!/^\d{2}\/\d{2}\/\d{4}$/.test(texto))
      throw new Error("Fecha incorrecta");
    const [dia, mes, anio] = texto.split("/").map(Number);
    const fecha = new Date(0);
    fecha.setFullYear(anio, mes - 1, dia);
    fecha.setHours(0, 0, 0, 0);
    if (
      fecha.getDate() !== dia ||
      fecha.getMonth() !== mes - 1 ||
      fecha.getFullYear() !== anio
    ) {
      throw new Error("Fecha incorrecta");
    }
    return fecha;
  }
  const diferencia = Math.abs(convertir(fecha1) - convertir(fecha2));
  return Math.round(diferencia / (1000 * 60 * 60 * 24));
}
// console.log(ejercicio16("01/01/2024", "11/01/2024"));

// EJERCICIO 17
function ejercicio17(texto) {
  let resultado = "";
  let mayuscula = true;
  for (const letra of texto) {
    if (mayuscula) {
      resultado += letra.toUpperCase();
    } else {
      resultado += letra;
    }
    mayuscula = !/\p{L}/u.test(letra);
  }
  return resultado;
}
// console.log(ejercicio17("hola mundo. adiós"));

// EJERCICIO 18
function ejercicio18(movimientos, pista) {
  if (movimientos.length !== pista.length) return false;
  let resultado = "";
  let correcto = true;
  for (let i = 0; i < movimientos.length; i++) {
    if (movimientos[i] === "run" && pista[i] === "_") {
      resultado += "_";
    } else if (movimientos[i] === "jump" && pista[i] === "|") {
      resultado += "|";
    } else if (movimientos[i] === "jump" && pista[i] === "_") {
      resultado += "x";
      correcto = false;
    } else if (movimientos[i] === "run" && pista[i] === "|") {
      resultado += "/";
      correcto = false;
    } else {
      return false;
    }
  }
  console.log(resultado);
  return correcto;
}
// console.log(ejercicio18(["run", "jump", "run"], "_|_"));

// EJERCICIO 19
function ejercicio19(tablero) {
  if (tablero.length !== 3 || tablero.some((fila) => fila.length !== 3))
    return "Nulo";
  const casillas = tablero.flat();
  if (casillas.some((casilla) => !["X", "O", ""].includes(casilla)))
    return "Nulo";
  const equis = casillas.filter((casilla) => casilla === "X").length;
  const circulos = casillas.filter((casilla) => casilla === "O").length;
  if (equis < circulos || equis > circulos + 1) return "Nulo";

  const lineas = [
    tablero[0],
    tablero[1],
    tablero[2],
    [tablero[0][0], tablero[1][0], tablero[2][0]],
    [tablero[0][1], tablero[1][1], tablero[2][1]],
    [tablero[0][2], tablero[1][2], tablero[2][2]],
    [tablero[0][0], tablero[1][1], tablero[2][2]],
    [tablero[0][2], tablero[1][1], tablero[2][0]],
  ];
  let ganaX = false;
  let ganaO = false;
  for (const linea of lineas) {
    if (linea.every((valor) => valor === "X")) ganaX = true;
    if (linea.every((valor) => valor === "O")) ganaO = true;
  }
  if (ganaX && ganaO) return "Nulo";
  if (ganaX && equis !== circulos + 1) return "Nulo";
  if (ganaO && equis !== circulos) return "Nulo";
  if (ganaX) return "X";
  if (ganaO) return "O";
  if (casillas.includes("")) return "En curso";
  return "Empate";
}
// console.log(ejercicio19([["X", "X", "X"], ["O", "O", ""], ["", "", ""]]));

// EJERCICIO 20
function ejercicio20(dias, horas, minutos, segundos) {
  return (((dias * 24 + horas) * 60 + minutos) * 60 + segundos) * 1000;
}
// console.log(ejercicio20(1, 2, 3, 4));

// EJERCICIO 21
function ejercicio21(a, b, segundos) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(a + b);
    }, segundos * 1000);
  });
}
// ejercicio21(5, 8, 1).then((resultado) => console.log(resultado));

// EJERCICIO 22
async function ejercicio22() {
  const respuesta = await fetch("./Challenge21.txt");
  if (!respuesta.ok) throw new Error("No se pudo leer el archivo");
  const texto = await respuesta.text();
  const lineas = texto
    .trim()
    .split(/\r?\n/)
    .map((linea) => linea.trim());
  if (lineas.length % 2 === 0 || isNaN(Number(lineas[0]))) {
    throw new Error("No se han podido resolver las operaciones");
  }

  let resultado = Number(lineas[0]);
  for (let i = 1; i < lineas.length; i += 2) {
    const operacion = lineas[i];
    const numero = Number(lineas[i + 1]);
    if (lineas[i + 1] === "" || isNaN(numero)) {
      throw new Error("No se han podido resolver las operaciones");
    }
    if (operacion === "+") resultado += numero;
    else if (operacion === "-") resultado -= numero;
    else if (operacion === "*") resultado *= numero;
    else if (operacion === "/" && numero !== 0) resultado /= numero;
    else throw new Error("No se han podido resolver las operaciones");
  }
  return resultado;
}
// ejercicio22().then((resultado) => console.log(resultado)).catch((error) => console.error(error.message));

// EJERCICIO 23
function ejercicio23(array1, array2, comunes) {
  const resultado = [];
  if (comunes) {
    for (const elemento of array1) {
      if (array2.includes(elemento) && !resultado.includes(elemento))
        resultado.push(elemento);
    }
  } else {
    for (const elemento of array1) {
      if (!array2.includes(elemento) && !resultado.includes(elemento))
        resultado.push(elemento);
    }
    for (const elemento of array2) {
      if (!array1.includes(elemento) && !resultado.includes(elemento))
        resultado.push(elemento);
    }
  }
  return resultado;
}
// console.log(ejercicio23([1, 2, 3], [3, 4, 5], true));

// EJERCICIO 24
function ejercicio24MCD(a, b) {
  while (b !== 0) {
    const resto = a % b;
    a = b;
    b = resto;
  }
  return Math.abs(a);
}

function ejercicio24MCM(a, b) {
  if (a === 0 || b === 0) return 0;
  return Math.abs(a * b) / ejercicio24MCD(a, b);
}
// console.log(ejercicio24MCD(24, 36));
// console.log(ejercicio24MCM(24, 36));

// EJERCICIO 25
function ejercicio25() {
  for (let i = 1; i <= 100; i++) console.log(i);

  let j = 1;
  while (j <= 100) {
    console.log(j);
    j++;
  }

  let k = 1;
  do {
    console.log(k);
    k++;
  } while (k <= 100);

  function contar(numero) {
    if (numero > 100) return;
    console.log(numero);
    contar(numero + 1);
  }
  contar(1);
}
// ejercicio25();

// EJERCICIO 26
function ejercicio26(partidas) {
  let puntos1 = 0;
  let puntos2 = 0;
  for (const partida of partidas) {
    const jugador1 = partida[0];
    const jugador2 = partida[1];
    if (jugador1 === jugador2) continue;
    if (
      (jugador1 === "R" && jugador2 === "S") ||
      (jugador1 === "S" && jugador2 === "P") ||
      (jugador1 === "P" && jugador2 === "R")
    ) {
      puntos1++;
    } else {
      puntos2++;
    }
  }
  if (puntos1 > puntos2) return "Player 1";
  if (puntos2 > puntos1) return "Player 2";
  return "Tie";
}
// console.log(ejercicio26([["R", "S"], ["S", "R"], ["P", "S"]]));

// EJERCICIO 27
function ejercicio27(lado, figura) {
  if (figura === "cuadrado") {
    for (let i = 0; i < lado; i++) console.log("*".repeat(lado));
  } else if (figura === "triangulo") {
    for (let i = 1; i <= lado; i++) console.log("*".repeat(i));
  }
}
// ejercicio27(5, "triangulo");

// EJERCICIO 28
function ejercicio28(vector1, vector2) {
  if (vector1.length !== vector2.length) return false;
  let suma = 0;
  for (let i = 0; i < vector1.length; i++) {
    suma += vector1[i] * vector2[i];
  }
  return suma === 0;
}
// console.log(ejercicio28([1, -2], [2, 1]));

// EJERCICIO 29
function ejercicio29(monedas, seleccion) {
  const productos = {
    1: { nombre: "Agua", precio: 75 },
    2: { nombre: "Café", precio: 100 },
    3: { nombre: "Zumo", precio: 125 },
    4: { nombre: "Bocadillo", precio: 200 },
  };
  const monedasValidas = [5, 10, 50, 100, 200];
  for (const moneda of monedas) {
    if (!monedasValidas.includes(moneda)) {
      return { mensaje: "Moneda no válida", monedas };
    }
  }
  const producto = productos[seleccion];
  if (!producto) return { mensaje: "Producto no existe", monedas };

  let dinero = 0;
  for (const moneda of monedas) dinero += moneda;
  if (dinero < producto.precio)
    return { mensaje: "Dinero insuficiente", monedas };

  let restante = dinero - producto.precio;
  const cambio = [];
  for (const moneda of [200, 100, 50, 10, 5]) {
    while (restante >= moneda) {
      cambio.push(moneda);
      restante -= moneda;
    }
  }
  return { producto: producto.nombre, cambio };
}
// console.log(ejercicio29([200], 1));

// EJERCICIO 30
function ejercicio30(numeros, orden) {
  const resultado = [...numeros];
  for (let i = 0; i < resultado.length - 1; i++) {
    for (let j = 0; j < resultado.length - 1; j++) {
      if (
        (orden === "Asc" && resultado[j] > resultado[j + 1]) ||
        (orden === "Desc" && resultado[j] < resultado[j + 1])
      ) {
        const temporal = resultado[j];
        resultado[j] = resultado[j + 1];
        resultado[j + 1] = temporal;
      }
    }
  }
  return resultado;
}
// console.log(ejercicio30([9, 2, 8, 4, 6], "Asc"));
