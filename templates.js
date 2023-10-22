function generatePokemonCardInfoHTML(id) {
    return `
  <div class="info-container-heading">
    <ul class="nav nav-tabs" id="myTab" role="tablist">
    <li class="nav-item" role="presentation">
      <button class="nav-link active" id="about-tab${id}" data-bs-toggle="tab" data-bs-target="#about-tab-pane${id}" type="button" role="tab" aria-controls="about-tab-pane${id}" aria-selected="true">About</button>
    </li>
    <li class="nav-item" role="presentation">
      <button class="nav-link" id="stats-tab${id}" data-bs-toggle="tab" data-bs-target="#stats-tab-pane${id}" type="button" role="tab" aria-controls="stats-tab-pane${id}" aria-selected="false">Base Stats</button>
    </li>
    <li class="nav-item" role="presentation">
      <button class="nav-link" id="moves-tab${id}" data-bs-toggle="tab" data-bs-target="#moves-tab-pane${id}" type="button" role="tab" aria-controls="moves-tab-pane${id}" aria-selected="false">Moves</button>
    </li>
  </ul>
  </div>
  <div class="tab-content mt-15" id="myTabContent">
    <div class="tab-pane fade show active" id="about-tab-pane${id}" role="tabpanel" aria-labelledby="about-tab" tabindex="0"></div>
    <div class="tab-pane fade" id="stats-tab-pane${id}" role="tabpanel" aria-labelledby="stats-tab" tabindex="0"></div>
    <div class="tab-pane moves-overflow fade" id="moves-tab-pane${id}" role="tabpanel" aria-labelledby="moves-tab" tabindex="0"></div>
  </div>
    `
  }

  function generatePokemonCardStatsHTML(stat) {
    return `
  <div class="stat">
    <div class="statName">
      <span>${stat['stat']['name']}</span>
    </div>  
    <div class="progress">
      <div class="progress-bar progress-bar-striped progress-bar-animated progress-box-shadow" role="progressbar" style="width: ${stat['base_stat']}%" aria-valuenow="${stat['base_stat']}" aria-valuemin="0" aria-valuemax="100">
      </div>
    </div>
  </div>`
  }
  
  function generatePokemonCardHTML(id,name,image) {
      return `
      <div class="pokedex" onclick="stopPropagation(event)">
          <div class="headline-container" id="headline-container${id}">
          <span class="id">#${id}</span>
          <img class="closeButton" src="img/cross.png" onclick="closePokemonCard()">
              <h1 class="headline">${name}</h1>
              <div class="headline-image-container">
                <div id="previousButtonContainer">
                  <img class="arrow" id="previousButton" src="img/arrow-left.png" onclick="previousCard(${id})">
                </div>
                <img class="pokedexImage" src="${image}">
                <div id="nextButtonContainer">
                  <img class="arrow" id="nextButton" src="img/arrow-right.png" onclick="nextCard(${id})">
                </div>
              </div>
          </div>
          <div class="info-container" id="info-container${id}"></div>
      </div>
      `;
  }
  
  function generatePokemonCardMovesHTML(move) {
    return `
    <button type="button" class="btn btn-secondary btn-sm move">${move}</button>`;
  }
  
  function generatePokemonOverviewCardHTML(id,name,image) {
    return `
    <div class="pokedexOverviewCard" id="pokedexOverviewCard${id}" onclick="openPokemonCard(${id})">
      <span class="id">#${id}</span>
      <h1 class="headline">${name}</h1>
      <img class="pokedexImage" src="${image}">
    </div>
    `;
  }
  
  function generatePokemonCardAboutHTML(speciesName,height, weight, abilities) {
    return `
    <div class="about">
      <div class="aboutName">
        <span>Species</span>
      </div>  
      <div class="aboutValue">
        <span>${speciesName}</span>
      </div>
    </div>
    <div class="about">
      <div class="aboutName">
        <span>Height</span>
      </div>  
      <div class="aboutValue">
        <span>${height}"</span>
      </div>
    </div>
    <div class="about">
      <div class="aboutName">
        <span>Weight</span>
      </div>  
      <div class="aboutValue">
        <span>${weight} lbs</span>
      </div>    
    </div>
    <div class="about">
    <div class="aboutName">
      <span>Abilities</span>
    </div>  
    <div class="aboutValue">
      <span>${abilities}</span>
    </div>    
  </div>
    `
  }
  