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
const duelBtn = document.getElementById('duelBtn')
const battleMsg = document.getElementById('battleResult')
const playerDeck = document.getElementById('playerDeck')
const computerDeck = document.getElementById('computerDeck')
const body = document.getElementById('body')

/*--------- Functions -----------*/


function renderGame(){
    //TODO need to render cards, shuffle, split deck and display. 
    //all functions no code here. 
    renderNewShuffledDeck();
    splitDeck(shuffledDeck)
    renderDeckInContainer(playerDeck, computerDeck);
    totalCardCount()
    
}


function totalCardCount(){ //<-- Keeps track of how many cards in each players deck
    const playerCards = document.getElementById('playerCardCount')
    const compCards = document.getElementById('computerCardCount')

    playerCards.innerText = `Your Cards: ${pCards.length}`
    compCards.innerText = `Computer Cards: ${cCards.length}`

    endOfWar()
    
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
    //playerDeck.innerHTML = ''
    //computerDeck.innerHTML = ''
    let cardsHtml = ''
    //let cardsHtml2 = ''
    //let cardsHtml3 = ''

    if(war){

        for(i=0; i<=2; i++){
            cardsHtml += `<div class="card back-red"></div>`
        }
        //cardsHtml = `<div class="card back-red"></div>`
        //cardsHtml2 = `<div class="card back-red"></div>`
        //cardsHtml3 = `<div class="card back-red"></div>`
          
        playerDeck.innerHTML = cardsHtml
        //playerDeck.innerHTML = cardsHtml2
        //playerDeck.innerHTML = cardsHtml3

        computerDeck.innerHTML = cardsHtml
        //computerDeck.innerHTML = cardsHtml2
        //computerDeck.innerHTML = cardsHtml3

    }else{

        cardsHtml = `<div class="card back-red"></div>`
          
        playerDeck.innerHTML = cardsHtml
        computerDeck.innerHTML = cardsHtml
    }
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
    console.log(pCards)
    console.log(cCards)
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

    const pRankIndex = ranks.findIndex((i) => i === pCardRank)
    const cRankIndex = ranks.findIndex((i) => i === cCardRank)

    if(pCardRank === cCardRank){ //going to WAR if ranks are the same
        if(war){
            battleMsg.innerText = 'We cannot have the same rank as the enemy for war. \nReshuffling'
            renderDuelHand()
        
        }else{
            goingToWar()
        }    
        
    }else{ //Determines who wins the duel
        
        if(pRankIndex > cRankIndex){
            console.log('Player WINS!!')
            //console.log('battle P Card',battlePCard)
            let player = 'player'
            updatePlayerDecks(player)
            battleMsg.innerText = 'You win the duel!'
            //TODO Call winner function to see if there is a game winner
        }else{
            console.log('Computer WINS!!')
            let computer = 'computer'
            updatePlayerDecks(computer)
            battleMsg.innerText = "We've lost the duel!"
             //TODO Call winner function to see if there is a game winner
        }
        
    }

  }


  function updatePlayerDecks(duelWinner){
    
        if(duelWinner === 'player'){

            const opponentCard = cCards.findIndex((card) => card.face === battleCCard)
            pCards.push(cCards[opponentCard])
            cCards.splice(opponentCard,1)
            
        }else{

            console.log('Battle P Card: ', battlePCard)
            console.log('P Card arr: ', pCards)
            const opponentCard = pCards.findIndex((card) => card.face === battlePCard)
            cCards.push(pCards[opponentCard])
            pCards.splice(opponentCard,1)

            //TODO as game goes on. 'undefined' is being put into the pCards array and this code 
            //TODO ...above cannot read the 'face' property. BUT the cCard array seems fine. 
            
        }

        if(war){
            //Takes 3 war card deck and gives to winner
            if(duelWinner === 'player'){

                for(i=0; i<=cWarCards.length; i++){
                    pCards.push(cWarCards[i])
                }

            }else{
                for(i=0; i<=pWarCards.length; i++){
                    cCards.push(pWarCards[i])
                }
            }
        }

        totalCardCount()
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

 /********************* WAR Functions *************************/

  function goingToWar(){
    //TODO will handle war play and see who wins all cards put up for war
    war = true
    renderPage(war)
    battleMsg.innerText = 'My Lord! We are going to WAR!'
    console.log('GOING TO WAR!!!')
    //TODO need to render board back to normal and war = false after war is over 
  }


  function endOfWar(){
    if(war){
        war = false
        renderPage(war)
    }
  }


  function renderPage(war){
    //TODO if going to war render war page. remove deck of cards and 
    //TODO display three cards face down and then have button say
    //TODO "fight to the death" then once button is pressed put
    //TODO down 4th card. see who wins. Call duel function

    if (war){
        renderDeckInContainer(playerDeck, computerDeck)
        renderWarDeck()
        duelBtn.innerText = 'Go to WAR!'
        battleMsg.innerText = 'My King! \nThe enemy has gathered an army! \nPrepare for WAR!'
        body.style.backgroundColor = 'red'
        //TODO render WAR page
    }else{
        renderDeckInContainer(playerDeck, computerDeck)
        duelBtn.innerText = 'Duel!'
        body.style.backgroundColor = 'white'
         
        //TODO render normal game page 
    }
  }


  function renderWarDeck(){

    for(i=0; i<=1; i++){
        pWarCards.push(pCards[i])
        pCards.splice(i,1)
        cWarCards.push(cCards[i])
        cCards.splice(i,1)
    }

    //Below: puts the dueling card into 3 card deck for war
    //IF: the card was already put into the war deck, it will grab the next available card. 
    const pDuelCard = pCards.findIndex ((card) => card.face === battlePCard)
    if(pDuelCard === undefined){
        pWarCards.push(pCards[0])
        pCards.splice(0,1)
    }else{
        pWarCards.push(pCards[pDuelCard])
        pCards.splice(pDuelCard,1)
    }

    const cDuelCard = cCards.findIndex((card) => card.face === battleCCard)
    if(cDuelCard === undefined){
        cWarCards.push(cCards[0])
        cWarCards.splice(0,1)
    }else{
        cWarCards.push(cCards[cDuelCard])
        cWarCards.splice(cDuelCard,1)
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
 
