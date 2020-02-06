// FRONTEND CODE

axios.get("https://pokeapi.co/api/v2/pokemon").then(response => {
  const pokemonList = response.data.results;
  const ul = document.getElementById("pokemon-list");
  pokemonList.forEach(poke => {
    const li = document.createElement("li");
    li.innerText = poke.name;
    li.onclick = () => {
      getPokemonImage(poke.name);
    };
    ul.appendChild(li);
  });
});

const getPokemonImage = pokeName => {
  axios.get(`https://pokeapi.co/api/v2/pokemon/${pokeName}`).then(response => {
    const imgUrl = response.data.sprites.front_default;

    const img = document.querySelector("img");
    img.setAttribute("src", imgUrl);
  });
};
