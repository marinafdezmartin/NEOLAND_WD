// // TIPOS DE VARIABLES
// const numero = 12345;
// const caracteres = "un texto";
// const booleano = true;
// const arreglos = ["texto", 1234, false, [""], {}];
// const objeto = {
//   // representas las propiedades
//   forma: "circular",
//   color: "dorado",
//   numero
// };

// console.log(objeto)

const cuerpo = document.getElementById("cuerpo");
const numero = document.getElementById("numero");
const nombre = document.getElementById("nombre");
const botonContar = document.getElementById("boton-contar");

const lista = ["marina", "cayetana", "javi", "enol"];

botonContar.addEventListener("click", () => {
  let contador = parseInt(numero.textContent);
  if (contador >= 4) {
    contador = 0;
  } else {
    contador += 1;
  }
  numero.textContent = contador;
  nombre.textContent = lista[contador];

  // SWITCH
  switch (nombre.textContent) {
    case "marina":
      console.log("Es Marina");
      break;
    case "cayetana":
      console.log("Es Cayeto");
      break;
    case "javi":
      console.log("Es javi");
      break;
    case "enol":
      console.log("Es enol");
      break;
    default:
      console.log("No es nadie");
  }
});
