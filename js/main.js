//TODO add pseudo code!

/*--------- Constants ----------*/

const suits = ['s', 'c', 'd', 'h']
const ranks = ['02', '03', '04', '05', '06', '07', '08', '09', '10', 'J', 'Q', 'K', 'A']
const pCards = []; //<-- Player card deck
const cCards = []; //<-- Comp card deck
const pWarCards = []; //<-- War cards will hold 3 from player deck
const cWarCards = []; //<-- Comp cards will hold 3 from comp deck
let cardBack //<-- trying to access the back image of a card. 
//const c = card.
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
    //TODO need to shuffle deck before splitting
    deck.forEach(function(card) {
        if(pCards.length != 26) //<-- splitting card deck
        {
            pCards.push(card)
        }else{
            cCards.push(card)
        }
        
    }); //TODO split array into 2 even decks, confirm with console log

    // Or, use reduce to 'reduce' the array into a single thing - in this case 
    // a string of HTML markup 
    // const cardsHtml = deck.reduce(function(html, card) {
    //   return html + `<div class="card ${card.face}"></div>`;
    // }, '');
  
    cardsHtml = `<div class="card back-red"></div>`
      
    playerDeck.innerHTML = cardsHtml
    computerDeck.innerHTML = cardsHtml
    
}

function buildDeck() { //<-- brought in from card class (Resources)
    const deck = [];
    // Use nested forEach to generate card objects
    suits.forEach(function(suit) {
      ranks.forEach(function(rank) {
        deck.push({
          // The 'face' property maps to the library's CSS classes for cards
          face: `${suit}${rank}`, //TODO <-- this is where the cards are made
          //back: `${back}`
          // Setting the 'value' property for game of blackjack, not war
          
          
          // value: Number(rank) || (rank === 'A' ? 11 : 10) //TODO <-- do you need this?
          
        });
      });
    });
    
    
   
   // console.log(card.face)
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

  function winner(surrender, duel){//<-- (surrenderFunction, duelFunction)
    //TODO will find out if there is a winner
    //TODO use if statement to see if surrender was pressed with passed value
    //TODO and show player surrender
    //TODO else see if player or computer won the game with zero cards left
    //TODO in their deck. Loser lost all cards. 

    return winnerValue
  }

  function surrender(){
    //TODO will handle surrender button and pass a surrender value to winner to 
    //TODO ...determine if player surrendered or not. 
    return surrenderValue
  }

  function fightToTheDeath (){
    //TODO call duel function and maybe play sound? 

    //TODO get winner from duel function then return that to warWinner
    //TODO return winner of the war round
    return warWinner
  }


  /*------------ Event Listeners ------------*/

  //TODO review event listeners
