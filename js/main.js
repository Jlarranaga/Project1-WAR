/*--------- Constants ----------*/
const suits = ["s", "c", "d", "h"];
const ranks = ["02","03","04", "05", "06", "07", "08", "09", "10", "J", "Q", "K", "A"];
const pCards = []; //<-- Player card deck
const cCards = []; //<-- Comp card deck
const pWarCards = []; //<-- War cards will hold 3 from player deck
const cWarCards = []; //<-- Comp cards will hold 3 from comp deck
const CardAUDIO = new Audio("/audio/CardFlip.mp3");
const introAudio = new Audio("/audio/Medieval-Intro-Audio.mp3");
const loadingScreenAudio = new Audio("/audio/LoadingScreen.mp3");
const warAudio = new Audio("/audio/war-horn.mp3");
const surrenderAudio = new Audio("/audio/hold-your-fire.mp3");

/*----------- Variables --------------*/
let shuffledDeck;
let battlePCard;
let battleCCard;
let cCardCount;
let pCardCount;
let war = false;
let winnerValue = false;
let cardDeck = buildDeck();

/*----------- Cached DOM Elements -----------*/
const duelBtn = document.getElementById("duelBtn");
const battleMsg = document.getElementById("battleResult");
const playerDeck = document.getElementById("playerDeck");
const computerDeck = document.getElementById("computerDeck");
const body = document.getElementById("body");
const videoBack = document.getElementById("backgroundVideo");
const intro = document.getElementById("introVideo");
const introBtn = document.getElementById("intro");

/*--------- Functions -----------*/

function loadingScreen() {
  //<-- First function called when page loads
  intro.classList.add("load");
}

function introVideo() {
  //Called from intro button

  loadingScreenAudio.play();
  intro.classList.add("intro");
  body.style.background = intro;
  intro.play();
  introBtn.style.visibility = "hidden";

  const t = setTimeout(() => {
    intro.classList.add("fade");
    clearTimeout(t);
  }, 6500);

  const o = setTimeout(() => {
    intro.classList.remove("load");
    intro.classList.remove("fade");
    intro.classList.remove("intro");
    intro.classList.add("remove");

    renderGame();
    clearTimeout(o);
  }, 7500);
}

function renderGame() {
  duelBtn.innerText = "Start";
  battleMsg.innerText = "Click Start\n to begin!";
  body.style.background = videoBack;
  renderNewShuffledDeck();
  splitDeck(shuffledDeck);
  renderDeckInContainer(playerDeck, computerDeck);
  totalCardCount();
  introBtn.style.visibility = "hidden";
}

function introAudioPlay() {
  introAudio.play();
}

function totalCardCount() {//Shows on screen how many cards each player has

  const playerCards = document.getElementById("playerCardCount");
  const compCards = document.getElementById("computerCardCount");

  const interval = setInterval(() => {
    playerCards.innerText = `Your Cards: ${pCards.length}`;
    compCards.innerText = `Computer Cards: ${cCards.length}`;
    clearInterval(interval);
  }, 500);

  endOfWar();
}

function buildDeck() {//<-- brought in from card class (Resources)
  const deck = [];
  // Use nested forEach to generate card objects
  suits.forEach(function (suit) {
    ranks.forEach(function (rank) {
      deck.push({
        // The 'face' property maps to the library's CSS classes for cards
        face: `${suit}${rank}`,
      });
    });
  });

  return deck;
}

function renderNewShuffledDeck() {
  shuffledDeck = getShuffledDeck();
}

function getShuffledDeck() {
  const shuffledDeck = [];
  while (cardDeck.length) {
    // Get a random index for a card still in the tempDeck
    const rndIdx = Math.floor(Math.random() * cardDeck.length);
    // Note the [0] after splice - this is because splice always returns an array and we just want the card object in that array
    shuffledDeck.push(cardDeck.splice(rndIdx, 1)[0]);
  }
  return shuffledDeck;
}

function renderDeckInContainer(playerDeck, computerDeck) {
  let cardsHtml = "";

  if (war) {//Setting image of 3 cards for war on player & computer deck spaces
    cardsHtml = `<div class="war"></div>`;

    playerDeck.innerHTML = cardsHtml;
    computerDeck.innerHTML = cardsHtml;
  } else {//Setting card back image for deck

    cardsHtml = `<span class="card back-red"></span>`;

    playerDeck.innerHTML = cardsHtml;
    computerDeck.innerHTML = cardsHtml;
  }
}

function splitDeck(deck) {//<-- splitting card deck

  deck.forEach(function (card) {
    if (pCards.length <= 25) {
      pCards.push(card);
    } else {
      cCards.push(card);
    }
  });
}

function duel() {//Duel handle function for button.

  if (winnerValue === true) {//if there is a winner, restart game. Play again!
    resetGame();
    renderGame();
    return;
  }

  duelBtn.innerText = "Duel!";

  renderDuelHand(); //Shows what 2 cards are going against each other. Images

  let duelWinner;

  //Below: grabbing the rank of the card from the player deck arrays and seeing who wins or
  //if there is a war scenario
  let pCardSplit = battlePCard.split("");
  const pCard = pCardSplit.splice(1, 2);
  const pCardRank = pCard.join("");

  let cCardSplit = battleCCard.split("");
  const cCard = cCardSplit.splice(1, 2);
  const cCardRank = cCard.join("");

  const pRankIndex = ranks.findIndex((i) => i === pCardRank);
  const cRankIndex = ranks.findIndex((i) => i === cCardRank);

  if (pCardRank === cCardRank) {//going to WAR if ranks are the same
    if (war) {
      const interval = setInterval(() => {
        battleMsg.innerText =
          "WAR:\nSame Rank!\nReshuffling";
        clearInterval(interval);
      }, 500);

      renderDuelHand();
    } else {
      goingToWar();
    }
  } else {//Determines who wins the duel since the ranks are not the same

    if (pRankIndex > cRankIndex) {
      duelWinner = "player";

      if (war) {
        const interval = setInterval(() => {
          battleMsg.innerText = "We won \nthe WAR!";
          updatePlayerDecks(duelWinner);
          clearInterval(interval);
        }, 500);
      } else {
        const interval = setInterval(() => {
          battleMsg.innerText = "We've won \nthe duel!";
          updatePlayerDecks(duelWinner);
          clearInterval(interval);
        }, 500);
      }
    } else {
      duelWinner = "computer";

      if (war) {
        const interval = setInterval(() => {
          battleMsg.innerText = "We lost \nthe WAR!";
          updatePlayerDecks(duelWinner);
          clearInterval(interval);
        }, 500);
      } else {
        const interval = setInterval(() => {
          battleMsg.innerText = "We've lost\n the duel!";
          updatePlayerDecks(duelWinner);
          clearInterval(interval);
        }, 500);
      }
    }
  }

  winner(false); //calling winner function with the surrender button value being false
  //Surrender button was not clicked - false
}

function updatePlayerDecks(duelWinner) {//Updates each players card deck array after every duel and war

  if (duelWinner === "player") {
    const opponentCard = cCards.findIndex((card) => card.face === battleCCard);
    pCards.push(cCards[opponentCard]);
    cCards.splice(opponentCard, 1);
  } else {
    const opponentCard = pCards.findIndex((card) => card.face === battlePCard);
    cCards.push(pCards[opponentCard]);
    pCards.splice(opponentCard, 1);
  }

  if (war) {
    //Takes 3 war card deck from opponent and gives to winner and gives winner their 3 cards back as well.
    if (duelWinner === "player") {
      for (i = 0; i < cWarCards.length; i++) {
        pCards.push(cWarCards[i]);
        pCards.push(pWarCards[i]);
      }
    } else {
      for (i = 0; i < pWarCards.length; i++) {
        cCards.push(pWarCards[i]);
        cCards.push(cWarCards[i]);
      }
    }
    for (i = 0; i < 3; i++) {
      //emptying war card decks after they were distributed back to winner above
      cWarCards.pop();
      pWarCards.pop();
    }
  }
  totalCardCount();
}

function renderDuelHand() {
  //Shows image of each players card that is going agaonst each other
  //Pulls from player card deck array and then corresponding image
  let pCardHtml = "";
  let cCardHtml = "";

  const randPlayerIdx = Math.floor(Math.random() * pCards.length);
  const randCompIdx = Math.floor(Math.random() * cCards.length);

  const pCard = pCards[randPlayerIdx];
  const cCard = cCards[randCompIdx];

  battlePCard = pCard.face;
  battleCCard = cCard.face;

  pCardHtml = `<div class="card ${battlePCard}"></div>`;
  cCardHtml = `<div class="card ${battleCCard}"></div>`;

  const i = setInterval(() => {
    battlePlayerCard.innerHTML = pCardHtml;
    battleComputerCard.innerHTML = cCardHtml;
    clearInterval(i);
  }, 500);

  const interval = setInterval(() => {
    CardAUDIO.play(); //<-- Audio for card flipping sound

    clearInterval(interval);
  }, 300);
}

/********************* WAR Functions *************************/

function goingToWar() {
  
  war = true;
  renderPage(war);

  const interval = setInterval(() => {
    battleMsg.innerText = "My Lord!\n We are\n going\n to WAR!";
    clearInterval(interval);
  }, 500);
}

function endOfWar() {
  if (war) {
    war = false;
    renderPage(war);
  }
}

function renderPage(war) {
  if (war) {
    warAudio.play();

    const i = setInterval(() => {
      renderDeckInContainer(playerDeck, computerDeck);
      renderWarDeck();
      clearInterval(i);
    }, 2000);

    const interval = setInterval(() => {
      duelBtn.innerText = "Go to\n WAR!";
      battleMsg.innerText =
        "My King! \nThe enemy has \ngathered an army! \nPrepare for WAR!";
      clearInterval(interval);
    }, 500);
  } else {
    renderDeckInContainer(playerDeck, computerDeck);
    duelBtn.innerText = "Duel!";
  }
}

function renderWarDeck() {
  for (i = 0; i <= 1; i++) {
    if (pCards[i] === undefined || cCards[i] === undefined) {
      //Do nothing, since there are no more cards in deck to access.
    } else {
      pWarCards.push(pCards[i]);
      pCards.splice(i, 1);
      cWarCards.push(cCards[i]);
      cCards.splice(i, 1);
    }
  }

  //Below: puts the dueling card into 3 card deck for war
  //IF: the card was already put into the war deck, it will grab the next available card.
  const pDuelCard = pCards.findIndex((card) => card.face === battlePCard);
  if (pDuelCard === -1) {
    pWarCards.push(pCards[0]);
    pCards.splice(0, 1);
  } else {
    pWarCards.push(pCards[pDuelCard]);
    pCards.splice(pDuelCard, 1);
  }

  const cDuelCard = cCards.findIndex((card) => card.face === battleCCard);
  if (cDuelCard === -1) {
    cWarCards.push(cCards[0]);
    cCards.splice(0, 1);
  } else {
    cWarCards.push(cCards[cDuelCard]);
    cCards.splice(cDuelCard, 1);
  }
}

function winner(surrender) {
  if (surrender) {
    //player surrrendered and computer wins by default
    surrenderAudio.play()
    battleMsg.innerText = "We've\n surrendered";
    winnerValue = true;
    duelBtn.innerText = "Play\n Again?";

  } else {

    if (pCards.length === 0) {
      //computer won
      battleMsg.innerText =
        "We've lost my lord. \nThe enemy will storm\n the castle soon!";
      winnerValue = true;
      duelBtn.innerText = "Play Again?";

    } else if (cCards.length === 0) {
      //player won
      battleMsg.innerText =
        "We've won my lord! \nThey were foolish\n to defy us!";
      winnerValue = true;
      duelBtn.innerText = "Play Again?";
    }
  }
}

function resetGame() {
  let pCardLength = pCards.length;
  let cCardLength = cCards.length;

  for (i = 0; i < pCardLength; i++) {
    pCards.pop();
  }

  for (i = 0; i < cCardLength; i++) {
    cCards.pop();
  }

  cardDeck = buildDeck();
  shuffledDeck = null;
  winnerValue = false;
  duelBtn.innerText = "Duel!";
  battleMsg.innerText = "Time to duel again!";
}

/*------------ Event Listeners ------------*/
loadingScreen();

document.getElementById("duelBtn").addEventListener("click", (e) => {
  //Duel button used to start game, play game, restart game
  e.stopPropagation(); //<-- used to stop button from being run when page loads

  if (duelBtn.innerText === "Start" || duelBtn.innerText === "Play Again?") {
    introAudioPlay();
    battleMsg.innerText = "Welcome\n your\n Majesty!";
    const playTime = setTimeout(() => {
      duel();
      clearTimeout(playTime);
    }, 5500);
  } else {
    duel();
  }
});

document.getElementById("surrenderBtn").addEventListener("click", (e) => {
  //Surrender button, used to give up
  e.stopPropagation(); //<-- used to stop button from being run when page loads
  winner(true);
});

//Start button, used only at loading screen. Disappears once clciked and wont show again until page reloads
document.getElementById("intro").addEventListener("click", (e) => {
  e.stopPropagation(); //<-- used to stop button from being run when page loads
  introVideo();
});
