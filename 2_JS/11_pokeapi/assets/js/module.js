// Obtener pokemon
async function obtenerPokemon() {
  const contenedor = document.getElementById("pokedex");
  //Bucle
  for (let i = 1; i <= 151; i++) {
    // fetch
    const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
    console.log(respuesta);

    // json
    const pokemon = await respuesta.json();
    console.log(pokemon);

    // tipos
    let tiposHTML = "";
    for (const tipo of pokemon.types) {
      tiposHTML += `<span>${tipo.type.name}</span>`;
    }

    // tarjetas
    contenedor.innerHTML += `<div class="pokemon-card">
    <h2>${pokemon.name}</h2>
    <p>N.º ${pokemon.id}</p>
    <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
        <div class="pokemon-types">
      ${tiposHTML}
    </div>
  </div>`;
  }
}
obtenerPokemon();
