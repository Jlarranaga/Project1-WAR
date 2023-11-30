//TODO add pseudo code!

/*--------- Constants ----------*/

const suits = ['s', 'c', 'd', 'h']
const ranks = ['02', '03', '04', '05', '06', '07', '08', '09', '10', 'J', 'Q', 'K', 'A']
const pCards = []; //<-- Player card deck
const cCards = []; //<-- Comp card deck
const pWarCards = []; //<-- War cards will hold 3 from player deck
const cWarCards = []; //<-- Comp cards will hold 3 from comp deck
const cardDeck = buildDeck();

/*----------- Variables --------------*/
let pTotalWins //<-- holds how many rounds player or comp wins. 
let cTotalWins
let shuffledDeck
let battlePCard 
let battleCCard
let cCardCount
let pCardCount
let war = false;
/*----------- Cached DOM Elements -----------*/


/*--------- Functions -----------*/



function renderGame(){
    //TODO need to render cards, shuffle, split deck and display. 
    //all functions no code here. 
    renderNewShuffledDeck();
    splitDeck(shuffledDeck)
    renderDeckInContainer(document.getElementById('playerDeck'), document.getElementById('computerDeck'));
    totalCardCount()
    
}


function totalCardCount(){ //<-- Keeps track of how many cards in each players deck
    const playerCards = document.getElementById('playerCardCount')
    const compCards = document.getElementById('computerCardCount')

    playerCards.innerText = `Your Cards: ${pCards.length}`
    compCards.innerText = `Computer Cards: ${cCards.length}`
}


function buildDeck() { //<-- brought in from card class (Resources)
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
    // console.log(card.face)
    return deck;
  }
  
  function renderNewShuffledDeck() {
    
    shuffledDeck = getShuffledDeck();
  }


function renderDeckInContainer(playerDeck, computerDeck) {
    playerDeck.innerHTML = '';
    computerDeck.innerHTML = '';
    
    let cardsHtml = ''
    
    cardsHtml = `<div class="card back-red"></div>`
      
    playerDeck.innerHTML = cardsHtml
    computerDeck.innerHTML = cardsHtml
    
}


function splitDeck(deck){

    deck.forEach(function(card) {
        if(pCards.length <= 25) //<-- splitting card deck
        {
            pCards.push(card)
            
        }else{
            cCards.push(card)
        }
        
    }); 
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


  function duel(){
    //TODO AUDIO -add card flipping sound
   
    renderDuelHand()

    let pCardSplit = battlePCard.split('')
    const pCard = pCardSplit.splice(1,2)
    const pCardRank = pCard.join('')

    let cCardSplit = battleCCard.split('')
    const cCard = cCardSplit.splice(1,2)
    const cCardRank = cCard.join('')

    if(pCardRank === cCardRank){ //going to WAR if ranks are the same
        if(war){
            //TODO get new war battle cards from the three cards pulled from war. Function probably. 
        }else{
            goingToWar()
        }    
        
    }else{ //Determines who wins the duel
        //TODO winner takes losers card
        const pRankIndex = ranks.findIndex((i) => i === pCardRank)
        const cRankIndex = ranks.findIndex((i) => i === cCardRank)

        if(pRankIndex > cRankIndex){
            console.log('Player WINS!!')
            //console.log('battle P Card',battlePCard)
            let player = 'player'
            updatePlayerDecks(player)
            //TODO Call winner function to see if there is a game winner
            //TODO put message in battleResult for user to see
        }else{
            console.log('Computer WINS!!')
            let computer = 'computer'
            updatePlayerDecks(computer)
             //TODO Call winner function to see if there is a game winner
             //TODO put message in battleResult for user to see
        }
        
    }

  }


  function updatePlayerDecks(duelWinner){
    
    if(duelWinner === 'player'){

        const opponentCard = cCards.findIndex((card) => card.face === battleCCard)
        pCards.push(cCards[opponentCard])
        cCards.splice(opponentCard,1)
        totalCardCount()
    }else{

        const opponentCard = pCards.findIndex((card) => card.face === battlePCard)
        cCards.push(pCards[opponentCard])
        pCards.splice(opponentCard,1)
        totalCardCount()
    }

  }


  function renderDuelHand(){
    
    let pCardHtml = ''
    let cCardHtml = ''

    const randPlayerIdx = Math.floor(Math.random() * pCards.length); //may need to +1 for 26 cards
    const randCompIdx = Math.floor(Math.random() * cCards.length);

    const pCard = pCards[randPlayerIdx]
    const cCard = cCards[randCompIdx]

    battlePCard = pCard.face
    battleCCard = cCard.face

    pCardHtml = `<div class="card ${battlePCard}"></div>`
    cCardHtml = `<div class="card ${battleCCard}"></div>`

    battlePlayerCard.innerHTML = pCardHtml
    battleComputerCard.innerHTML = cCardHtml
  }


  function goingToWar(){
    //TODO will handle war play and see who wins all cards put up for war
    war = true
    renderPage(war)
    console.log('GOING TO WAR!!!')
  }


  function renderPage(war){
    //TODO if going to war render war page. remove deck of cards and 
    //TODO display three cards face down and then have button say
    //TODO "fight to the death" then once button is pressed put
    //TODO down 4th card. see who wins. Call duel function

    if (war){
        //TODO render WAR page
    }else{
        //TODO render normal game page 
    }
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
  renderGame();
  //TODO review event listeners
  //TODO opening button  will say, Ready to play? then disappear and 
  //TODO duel button will appear. call render new shuffled deck function. 
  
  document.getElementById('duelBtn').addEventListener('click', duel)
 
