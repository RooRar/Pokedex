let loadingStartId;
let loadingEndId;
let allPokemons = [];
let loadedPokemonIds = [];

function init() {
  resetOverview();
  loadAllPokemons();
  loadPokemonOverviewCards();
}

async function loadAllPokemons() {
  let url = `https://pokeapi.co/api/v2/pokemon?limit=10000`;
  let response = await fetch(url);
  let responseJson = await response.json();
  allPokemons = await responseJson['results'];
}

function resetOverview() {
  document.getElementById('allPokemons').innerHTML = '';
  loadingStartId = 1;
  loadingEndId = 50;
}

async function searchCards() {
  let input = (document.getElementById('search').value.toLowerCase() + '').replaceAll(' ', '');
  resetOverview();
  document.getElementById(`loadMoreCardsContainer`).classList.add(`displayNone`);
  if (input) {
    loadedPokemonIds = [];
    for (let s = 1; s < allPokemons.length; s++) {
      if ((allPokemons[s]['name']).startsWith(input)) {
        await loadPokemonOverviewCard(allPokemons[s]['url']);
      }
    }
    if (loadedPokemonIds.length < 1) {
      if (document.getElementById(`NoPokemonFoundContainer`).classList.contains(`displayNone`) )
        document.getElementById(`NoPokemonFoundContainer`).classList.remove(`displayNone`)
    };
  }
  else {
    resetSearch();
  }
}


async function resetSearch() {
  loadedPokemonIds = [];
  document.getElementById('search').value = '';
  resetOverview();
  await loadPokemonOverviewCards();
  document.getElementById(`loadMoreCardsContainer`).classList.remove(`displayNone`);
}


function loadMorePokemonCards() {
  loadingStartId = loadingEndId;
  loadingEndId += 20;
  loadPokemonOverviewCards(); 
}


async function loadPokemonOverviewCards() {
  if (loadingEndId > allPokemons['count']) {
    loadingEndId = allPokemons['count'];
  }
  for (id = loadingStartId; id < loadingEndId; id++) {
    await loadPokemonOverviewCard(`https://pokeapi.co/api/v2/pokemon/${id}`);
  }
}


async function loadPokemonOverviewCard(url) {
  if (!document.getElementById(`NoPokemonFoundContainer`).classList.contains(`displayNone`) )
    document.getElementById(`NoPokemonFoundContainer`).classList.add(`displayNone`);
  
  let response = await fetch(url);
  let currentPokemon = await response.json();
  loadedPokemonIds.push(currentPokemon['id']);
  let image = await currentPokemon['sprites']['other']['dream_world']['front_default'];
  if (!image) {
    image = await currentPokemon['sprites']['other']['official-artwork']['front_default'];    
  }
  document.getElementById('allPokemons').innerHTML += generatePokemonOverviewCardHTML(currentPokemon['id'],currentPokemon['name'],image);
  await loadPokemonSpeciesColor(currentPokemon,'pokedexOverviewCard');
}


async function loadPokemonSpeciesColor(currentPokemon,containerName) {
  let response = await fetch(currentPokemon['species']['url']);
  let speciesInfo = await response.json();
  let color = await speciesInfo['color']['name'];
  document.getElementById(`${containerName}${currentPokemon['id']}`).classList.add(`bgr-${color}`);
}


async function openPokemonCard(id) {
  document.getElementById(`allPokemons`).classList.add(`fadeOut`);
  document.getElementById(`allPokemons`).classList.remove(`fadeIn`);
  document.getElementById(`fullscreenCardContainer`).classList.remove(`displayNone`);
  document.getElementById(`pokemonCard`).classList.remove(`displayNone`);

  let url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  let response = await fetch(url);
  currentPokemon = await response.json();
  renderPokemonCard(currentPokemon);
}


function closePokemonCard() {
  document.getElementById(`allPokemons`).classList.add(`fadeIn`);
  document.getElementById(`allPokemons`).classList.remove(`fadeOut`);
  document.getElementById(`fullscreenCardContainer`).classList.add(`displayNone`);
}

function renderPokemonCard(currentPokemon) {
  let id = currentPokemon['id'];

  let image = currentPokemon['sprites']['other']['dream_world']['front_default'];
  if (!image) {
    image = currentPokemon['sprites']['other']['offical-artwork']['front_default'];
  }

  document.getElementById('pokemonCard').innerHTML = generatePokemonCardHTML(id,currentPokemon['name'],image);

  renderPokemonCardTabs(currentPokemon);
  loadPokemonSpeciesColor(currentPokemon,'headline-container');
  PokemonCardNavigatonButtonVisibility(id);
}

function PokemonCardNavigatonButtonVisibility(id) {
  let indexOfLoadedPokemonIds = loadedPokemonIds.indexOf(id);

  if (indexOfLoadedPokemonIds == loadedPokemonIds.length ) {
    document.getElementById(`nextButton`).classList.add(`displayNone`);
  }

  if (indexOfLoadedPokemonIds == 0) {
    document.getElementById(`previousButton`).classList.add(`displayNone`); 
  }
}

function renderPokemonCardTabs(currentPokemon) {
  renderPokemonCardInfo(currentPokemon['id']);
  renderPokemonCardAbout(currentPokemon);
  renderPokemonCardStats(currentPokemon);
  renderPokemonCardMoves(currentPokemon);
}

function renderPokemonCardInfo(id) {
  document.getElementById(`info-container${id}`).innerHTML = generatePokemonCardInfoHTML(id);
}

function renderPokemonCardAbout(currentPokemon) {
  let abilities = '';
  let arrayAbilities = currentPokemon['abilities'];
  for (a = 0; a < arrayAbilities.length ; a++) {
    abilities += arrayAbilities[a]['ability']['name'] + ' ';
  }
  document.getElementById(`about-tab-pane${currentPokemon['id']}`).innerHTML = generatePokemonCardAboutHTML(currentPokemon['species']['name'], currentPokemon['height'], currentPokemon['weight'], abilities);
}

function renderPokemonCardMoves(currentPokemon) {
  let moves = currentPokemon['moves'];
  for (m = 0; m < moves.length; m++) {
    document.getElementById(`moves-tab-pane${currentPokemon['id']}`).innerHTML += generatePokemonCardMovesHTML(moves[m]['move']['name']);
  }
}

function renderPokemonCardStats(currentPokemon) {
    let stats = currentPokemon['stats'];
    for (s = 0; s < stats.length; s++) {
      document.getElementById(`stats-tab-pane${currentPokemon['id']}`).innerHTML += generatePokemonCardStatsHTML(stats[s]);
    }
}

function nextCard(currentId) {
  let currentPokemonIdIndex = loadedPokemonIds.indexOf(currentId);
  closePokemonCard();
  openPokemonCard(loadedPokemonIds[currentPokemonIdIndex +1])
}

function previousCard(currentId) {
  let currentPokemonIdIndex = loadedPokemonIds.indexOf(currentId);
  closePokemonCard();
  openPokemonCard(loadedPokemonIds[currentPokemonIdIndex -1])
}

function stopPropagation(event) {
  event.stopPropagation();
}

function clickPress(event) {
  if (event.keyCode == 13) {
    searchCards();
  }
}