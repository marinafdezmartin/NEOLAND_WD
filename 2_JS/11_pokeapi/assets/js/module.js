// Obtener pokemon
async function obtenerPokemon() {
  const contenedor = document.getElementById("contenedor");
  //Bucle
  for (let i = 1; i <= 151; i++) {
    // fetch
    const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);

    // json
    const pokemon = await respuesta.json();

    // tipos
    // voy a ir guardando dentro de esta variable el HTML correspondiente a cada tipo
    let tiposHTML = "";
    // para cada elemento del array pokemon.types, guarda temporalmente ese elemento en la variable "tipo" y ejecuta el codigo que esta dentro del bucle
    for (const tipo of pokemon.types) {
      tiposHTML += `<span class="${tipo.type.name}">${tipo.type.name}</span>`;
    }

    // tarjetas
    contenedor.innerHTML += `
  <div class="pokemon-card" data-id="${pokemon.id}">
    <p>N.º ${pokemon.id}</p>

    <img src="${pokemon.sprites.other["official-artwork"].front_default}" alt="${pokemon.name}">

    <h2>${pokemon.name}</h2>

    <div class="pokemon-types">
      ${tiposHTML}
    </div>
  </div>
`;
  }
}
obtenerPokemon();

// MODAL

const contenedor = document.getElementById("contenedor");
const modal = document.getElementById("pokemon-modal");
const contenidoModal = document.getElementById("modal-contenido");
const botonCerrar = document.getElementById("cerrar-modal");

// Detectamos los clics dentro del contenedor de tarjetas
contenedor.addEventListener("click", async (evento) => {
  // Buscamos la tarjeta sobre la que se ha pulsado
  const tarjeta = evento.target.closest(".pokemon-card");

  // Si no hemos pulsado una tarjeta, salimos de la función
  if (!tarjeta) {
    return;
  }

  // Obtenemos el número del Pokémon usando data-id
  const id = tarjeta.dataset.id;

  // Consultamos la API utilizando ese número
  const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);

  // Convertimos la respuesta en un json
  const pokemon = await respuesta.json();

  // Obtener los tipos del Pokémon seleccionado
  let tiposHTML = "";
  for (const tipo of pokemon.types) {
    tiposHTML += `<span class="${tipo.type.name}">${tipo.type.name}</span>`;
  }

  // Obtener las estadísticas
  let estadisticasHTML = "";
  for (const estadistica of pokemon.stats) {
    estadisticasHTML += `
    <p>${estadistica.stat.name}: ${estadistica.base_stat}</p>
  `;
  }

  // Introducimos los datos del Pokémon dentro del modal
  // Mostrar los datos del Pokémon en el modal
  contenidoModal.innerHTML = `
  <div class="modal-layout">

    <!-- Imagen del Pokémon -->
    <div class="modal-imagen">
      <img
        src="${pokemon.sprites.other["official-artwork"].front_default}"
        alt="${pokemon.name}"
      >
    </div>

    <!-- Información del Pokémon -->
    <div class="modal-info">

      <p class="modal-numero">N.º ${pokemon.id}</p>

      <h2>${pokemon.name}</h2>

      <div class="pokemon-types">
        ${tiposHTML}
      </div>

      <h3>Estadísticas</h3>

      <div class="pokemon-stats">
        ${estadisticasHTML}
      </div>

    </div>
  </div>
`;

  // Abrimos el modal al hacer click
  modal.showModal();

  console.log(pokemon.stats);
  console.log(id);
});

// Cerramos el modal al pulsar el botón
botonCerrar.addEventListener("click", () => {
  modal.close();
});
