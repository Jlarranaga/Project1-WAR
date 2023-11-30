//TODO add pseudo code!

/*--------- Constants ----------*/

const suits = ['s', 'c', 'd', 'h']
const ranks = ['02', '03', '04', '05', '06', '07', '08', '09', '10', 'J', 'Q', 'K', 'A']
const pCards = []; //<-- Player card deck
const cCards = []; //<-- Comp card deck
const pWarCards = []; //<-- War cards will hold 3 from player deck
const cWarCards = []; //<-- Comp cards will hold 3 from comp deck

const cardDeck = buildDeck();
renderDeckInContainer(cardDeck, document.getElementById('playerDeck'), document.getElementById('computerDeck'));

/*----------- Variables --------------*/
let pTotalWins //<-- holds how many rounds player or comp wins. 
let cTotalWins

/*----------- Cached DOM Elements -----------*/


/*--------- Functions -----------*/

function renderDeckInContainer(deck, playerDeck, computerDeck) {
    playerDeck.innerHTML = '';
    computerDeck.innerHTML = '';
    
    let cardsHtml = ''
    
    deck.forEach(function(card) {
        if(pCards.length != 26) //<-- splitting card deck
        {
            pCards.push(card)
        }else{
            cCards.push(card)
        }
      //cardsHtml += `<div class="card ${card.face}"></div>`;
      //playerDeck.innerHTML = ` ${card.back}`;
    }); //TODO split array into 2 even decks

    
    // Or, use reduce to 'reduce' the array into a single thing - in this case 
    // a string of HTML markup 
    // const cardsHtml = deck.reduce(function(html, card) {
    //   return html + `<div class="card ${card.face}"></div>`;
    // }, '');
    console.log(cardsHtml)
    playerDeck.innerHTML = ` ${card.back}`; //TODO display back of card
    // TODO cont... on player and computer deck. Only need to display face when battling. 
  }

function buildDeck() {
    const deck = [];
    // Use nested forEach to generate card objects
    suits.forEach(function(suit) {
      ranks.forEach(function(rank) {
        deck.push({
          // The 'face' property maps to the library's CSS classes for cards
          face: `${suit}${rank}`, //TODO <-- this is where the cards are made
          // Setting the 'value' property for game of blackjack, not war
          // value: Number(rank) || (rank === 'A' ? 11 : 10) //TODO <-- do you need this?
        });
      });
    });
    return deck;
  }

  function duel(){
    //TODO will handle button event and if two ranks are equal
    //TODO ...then call war function and winner function

    

    //TODO return winner of the duel
    return duelWinner
  }

  function war(){
    //TODO will handle war play and see who wins all cards put up for war
  }

  function renderPage(){
    //TODO if going to war render war page. remove deck of cards and 
    //TODO display three cards face down and then have button say
    //TODO "fight to the death" then once button is pressed put
    //TODO down 4th card. see who wins. Call duel function
  }

  function winner(surrender){
    //TODO will find out if there is a winner
    //TODO use if statement to see if surrender was pressed with passed value
    //TODO and show player surrender
    //TODO else see if player or computer won the game with zero cards left
    //TODO in their deck. Loser lost all cards. 

    return winner
  }

  function surrender(){
    //TODO will handle surrender button and pass a surrender value to winner to 
    //TODO ...determine if player surrendered or not. 
  }

  function fightToTheDeath (){
    //TODO call duel function and maybe play sound? 

    //TODO get winner from duel function then return that to warWinner
    //TODO return winner of the war round
    return warWinner
  }


  /*------------ Event Listeners ------------*/
