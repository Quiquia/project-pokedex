import { setPokemon, setImage } from "./pokedex.js";
import "./chart.js";

const $form = document.querySelector("#form");
const $next = document.querySelector("#next-pokemon");
const $prev = document.querySelector("#prev-pokemon");
const $btnRandom = document.querySelector("#btnRandom");
const $nextImage = document.querySelector("#next-image");
const $prevImage = document.querySelector("#prev-image");

let activePokemon = null;

async function handleSubmit(event) {
  event.preventDefault();
  const form = new FormData($form);
  const id = form.get("id");
  activePokemon = await setPokemon(id);
}

async function handleNextPokemon() {
  const id =
    activePokemon === null || activePokemon.id === 898
      ? 1
      : activePokemon.id + 1;

  activePokemon = await setPokemon(id);

  /*if (activePokemon.id === 898) {
    activePokemon = await setPokemon(1);
  }
  if (activePokemon !== null) {
    activePokemon = await setPokemon(activePokemon.id + 1);
  }*/
}

async function handlePrevPokemon() {
  const id =
    activePokemon === null || activePokemon.id === 1
      ? 898
      : activePokemon.id - 1;
  activePokemon = await setPokemon(id);
}

async function handleRandonPokemon() {
  const id = Math.floor(Math.random() * (898 - 1) + 1);
  activePokemon = await setPokemon(id);
}

let activeSprite = 0;
function handleNextImage() {
  if (activePokemon === null) return false;

  if (activeSprite >= activePokemon.sprites.length - 1) {
    activeSprite = 0;
    return setImage(activePokemon.sprites[activeSprite]);
  }
  activeSprite = activeSprite + 1;
  return setImage(activePokemon.sprites[activeSprite]);
}

async function handlePrevImage() {
  if (activePokemon === null) return false;
  if (activeSprite <= 0) {
    activeSprite = activePokemon.sprites.length - 1;
    return setImage(activePokemon.sprites[activeSprite]);
  }

  activeSprite = activeSprite - 1;
  return setImage(activePokemon.sprites[activeSprite]);
}

$form.addEventListener("submit", handleSubmit);
$next.addEventListener("click", handleNextPokemon);
$prev.addEventListener("click", handlePrevPokemon);
$btnRandom.addEventListener("click", handleRandonPokemon);
$nextImage.addEventListener("click", handleNextImage);
$prevImage.addEventListener("click", handlePrevImage);
