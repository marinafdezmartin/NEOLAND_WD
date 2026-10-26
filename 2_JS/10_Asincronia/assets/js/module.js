import pelota from "./json.json" with { type: "json" };
import { asincronia } from "./async.js";
import { promesa } from "./async.js";
import { intento } from "./async.js";

console.log(pelota.fabricante);

const objeto = await asincronia(pelota);
console.log(objeto.textura);

// promesa
promesa()
  .then((response) => {
    console.log(response);
  })
  .catch((err) => {
    console.error(err);
  })
  .finally(console.log("finalmente"));

intento(pelota);

//   consulta FETCH
const resultado = document.getElementById("resultado");
const imagen = document.createElement("img");

const pokeapi = fetch("https://pokeapi.co/api/v2/pokemon/ditto")
  .then((response) => {
    return response.json();
  })
  .then((response) => {
    console.log(response.sprites.other["official-artwork"].front_shiny);
    imagen.src = response.sprites.other["official-artwork"].front_shiny;
    resultado.appendChild(imagen);
  })
  .catch((error) => {
    imagen.scr =
      "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/1280px-Unknown_person.jpg?utm_source=es.wikipedia.org&utm_campaign=index&utm_content=thumbnail";
    resultado.appendChild(imagen);
  });
