const BASE_API = "https://pokeapi.co/api/v2/";

export async function getPokemon(id) {
  let data = {};

  try {
    const response = await fetch(`${BASE_API}pokemon/${id}/`);
    data = await response.json();
  } catch (error) {
    data = {
      sprites: {
        front_default: "",
      },
    };
  }

  return data;
}

export async function getSpecies(id) {
  let data = {};
  try {
    const response = await fetch(`${BASE_API}pokemon-species/${id}/`);
    data = await response.json();
  } catch (error) {
    data = {
      flavor_text_entries: [
        {
          flavor_text: "Este Pokémon no existe, prueba otro número.",
          language: {
            name: "es",
          },
        },
      ],
    };
  }

  return data;
}
