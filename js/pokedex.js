import { getPokemon, getSpecies } from "./api.js";
import { createChart } from "./chart.js";

const $image = document.querySelector("#image");
export function setImage(image) {
  $image.src = image;
}

const $description = document.querySelector("#description");
function setDescription(text) {
  $description.textContent = text;
}

const $screen = document.querySelector("#screen");
function loader(isLoading = false) {
  const img = isLoading ? "url(./images/loading.gif)" : "";

  $screen.style.backgroundImage = img;
}

const $demo = document.querySelector("#demo");
function setPokemonId(text) {
  $demo.value = text;
}

const $light = document.querySelector("#light");
function speech(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "es";
  speechSynthesis.speak(utterance);

  $light.classList.add("is-animated");

  utterance.addEventListener("end", () => {
    $light.classList.remove("is-animated");
  });
}

export async function finPokemon(id) {
  const pokemon = await getPokemon(id);
  const species = await getSpecies(id);
  const flavorobj = species.flavor_text_entries.find(
    (flavor) => flavor.language.name === "es"
  );
  const sprites = [pokemon.sprites.front_default];

  const stats = pokemon.stats.map((item) => item.base_stat);

  for (const item in pokemon.sprites) {
    if (
      item !== "front_default" &&
      item !== "other" &&
      item !== "versions" &&
      pokemon.sprites[item]
    ) {
      sprites.push(pokemon.sprites[item]);
    }
  }
  // console.log(stats);

  return {
    sprites,
    description: flavorobj.flavor_text,
    id: pokemon.id,
    name: pokemon.name,
    stats,
  };
}

let activeChart = null;

export async function setPokemon(id) {
  //prender loader
  loader(true);
  const pokemon = await finPokemon(id);

  loader(false);
  //apagar loader
  setImage(pokemon.sprites[0]);
  setDescription(pokemon.description);
  setPokemonId(pokemon.id);
  speech(`${pokemon.name}.  ${pokemon.description}`);
  if (activeChart instanceof Chart) {
    activeChart.destroy();
  }

  activeChart = createChart(pokemon.stats);

  return pokemon;
}
