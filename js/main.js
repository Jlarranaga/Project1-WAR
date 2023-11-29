//TODO add pseudo code!

/*--------- Constants ----------*/

const suits = ['s', 'c', 'd', 'h']
const ranks = ['02', '03', '04', '05', '06', '07', '08', '09', '10', 'J', 'Q', 'K', 'A']

const cardDeck = buildDeck();
renderDeckInContainer(cardDeck, document.getElementById('playerDeck'), document.getElementById('computerDeck'));

/*----------- Cached DOM Elements -----------*/


/* --------- Functions -----------*/

function renderDeckInContainer(deck, playerDeck, computerDeck) {
    playerDeck.innerHTML = '';
    computerDeck.innerHTML = '';
    // Let's build the cards as a string of HTML
    let cardsHtml = '';
    deck.forEach(function(card) {
      cardsHtml += `<div class="card ${card.face}"></div>`;
    }); //TODO put cards into an array then split array into 2 even decks

    
    // Or, use reduce to 'reduce' the array into a single thing - in this case 
    // a string of HTML markup 
    // const cardsHtml = deck.reduce(function(html, card) {
    //   return html + `<div class="card ${card.face}"></div>`;
    // }, '');
    console.log(cardsHtml)
    playerDeck.innerHTML = `<div class="card ${card.back}"></div>`; //TODO display back of card
    // TODO cont... on player and computer deck. Only need to display face when battling. 
  }

function buildDeck() {
    const deck = [];
    // Use nested forEach to generate card objects
    suits.forEach(function(suit) {
      ranks.forEach(function(rank) {
        deck.push({
          // The 'face' property maps to the library's CSS classes for cards
          face: `${suit}${rank}`,
          // Setting the 'value' property for game of blackjack, not war
          // value: Number(rank) || (rank === 'A' ? 11 : 10) //TODO <-- do you need this?
        });
      });
    });
    return deck;
  }