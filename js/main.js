
/*--------- Constants ----------*/
const suits = ['s', 'c', 'd', 'h']
const ranks = ['02', '03', '04', '05', '06', '07', '08', '09', '10', 'J', 'Q', 'K', 'A']
const pCards = []; //<-- Player card deck
const cCards = []; //<-- Comp card deck
const pWarCards = []; //<-- War cards will hold 3 from player deck
const cWarCards = []; //<-- Comp cards will hold 3 from comp deck


/*----------- Variables --------------*/
let pTotalWins //<-- holds how many rounds player or comp wins. 
let cTotalWins
let shuffledDeck
let battlePCard 
let battleCCard
let cCardCount
let pCardCount
let war = false
let winnerValue = false
let cardDeck = buildDeck()

/*----------- Cached DOM Elements -----------*/
const duelBtn = document.getElementById('duelBtn')
const battleMsg = document.getElementById('battleResult')
const playerDeck = document.getElementById('playerDeck')
const computerDeck = document.getElementById('computerDeck')
const body = document.getElementById('body')

/*--------- Functions -----------*/


function renderGame(){
    renderNewShuffledDeck();
    splitDeck(shuffledDeck)
    renderDeckInContainer(playerDeck, computerDeck);
    totalCardCount()
    
}

// function deck(){
//     const deck = buildDeck();
//     return deck
// }

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
          face: `${suit}${rank}`,
        });
      });
    });
    // console.log(card.face)
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
    console.log('Original Deck: ', deck)
    deck.forEach(function(card) {
        if(pCards.length <= 25) //<-- splitting card deck
        {
            pCards.push(card)
            
        }else{
            cCards.push(card)
        }
        
    }); 
    console.log('pCards Deck: ', pCards)
    console.log('cCards Deck: ', cCards)
}


  function duel(){
    //TODO AUDIO -add card flipping sound
   if(winnerValue === true){
    resetGame()
    renderGame()
    return
   }

    renderDuelHand()
    let duelWinner

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
            duelWinner = 'player'
            updatePlayerDecks(duelWinner)
            battleMsg.innerText = 'You win the duel!'
        }else{
            console.log('Computer WINS!!')
            duelWinner = 'computer'
            updatePlayerDecks(duelWinner)
            battleMsg.innerText = "We've lost the duel!"
        }
        
    }

    winner(false)

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
        }

        if(war){
            //Takes 3 war card deck from opponent and gives to winner and gives winner their 3 cards back as well. 
            if(duelWinner === 'player'){ 
                for(i=0; i<cWarCards.length; i++){ 
                    pCards.push(cWarCards[i])
                    pCards.push(pWarCards[i])
                }
                
            }else{
                for(i=0; i<pWarCards.length; i++){
                    cCards.push(pWarCards[i])
                    cCards.push(cWarCards[i])
                }
            }
            for(i=0; i<3; i++){ //<-- emptying war card decks after they were distributed back to winner above
                cWarCards.pop()
                pWarCards.pop()
            }
        }
        totalCardCount()
  }


  function renderDuelHand(){
    
    let pCardHtml = ''
    let cCardHtml = ''

    const randPlayerIdx = Math.floor(Math.random() * pCards.length); //may need to +1 for 26 cards
    const randCompIdx = Math.floor(Math.random() * cCards.length);

    console.log('renderDualHand pCards: ', pCards)
    console.log('renderDualHand cCards: ', cCards)

    const pCard = pCards[randPlayerIdx]
    const cCard = cCards[randCompIdx]

    console.log('renderDuelHand pCard: ', pCard)
    console.log('renderDuelHand cCard: ', cCard)

    battlePCard = pCard.face
    battleCCard = cCard.face

    pCardHtml = `<div class="card ${battlePCard}"></div>`
    cCardHtml = `<div class="card ${battleCCard}"></div>`

    battlePlayerCard.innerHTML = pCardHtml
    battleComputerCard.innerHTML = cCardHtml
    
  }

 /********************* WAR Functions *************************/

  function goingToWar(){
    war = true
    renderPage(war)
    battleMsg.innerText = 'My Lord! We are going to WAR!'
    console.log('GOING TO WAR!!!')
  }


  function endOfWar(){
    if(war){
        war = false
        renderPage(war)
    }
  }


  function renderPage(war){
    
    if (war){
        renderDeckInContainer(playerDeck, computerDeck)
        renderWarDeck()
        duelBtn.innerText = 'Go to WAR!'
        battleMsg.innerText = 'My King! \nThe enemy has gathered an army! \nPrepare for WAR!'
        body.style.backgroundColor = 'red'
    }else{
        renderDeckInContainer(playerDeck, computerDeck)
        duelBtn.innerText = 'Duel!'
        body.style.backgroundColor = 'white'
    }
  }


  function renderWarDeck(){

    for(i=0; i<=1; i++){ 
        if(pCards[i] === undefined || cCards[i] === undefined){
            //Do nothing, since there are no more cards in deck to access. 
        }else{
        pWarCards.push(pCards[i])
        pCards.splice(i,1)
        cWarCards.push(cCards[i])
        cCards.splice(i,1)
        }
    }

    
    //Below: puts the dueling card into 3 card deck for war
    //IF: the card was already put into the war deck, it will grab the next available card. 
    const pDuelCard = pCards.findIndex ((card) => card.face === battlePCard)
    if(pDuelCard === -1){
        pWarCards.push(pCards[0])
        pCards.splice(0,1)
    }else{
        pWarCards.push(pCards[pDuelCard])
        pCards.splice(pDuelCard,1)
    }


    const cDuelCard = cCards.findIndex((card) => card.face === battleCCard)
    if(cDuelCard === -1){
        cWarCards.push(cCards[0])
        cCards.splice(0,1)
    }else{
        cWarCards.push(cCards[cDuelCard])
        cCards.splice(cDuelCard,1)
    }
  }


  function winner(surrender){
    if(surrender){
        //player surrrendered and computer wins by defauly
        //but show who was winning in the moment. 
        battleMsg.innerText = "We've surrendered..."
        winnerValue = true
        duelBtn.innerText = "Play Again?"
    }else{
        if(pCards.length === 0){
            //computer won
            battleMsg.innerText = "We've lost my lord. \nThe enemy will storm the castle soon!"
            winnerValue = true
            duelBtn.innerText = "Play Again?"
        }else if(cCards.length === 0){
            //player won
            battleMsg.innerText = "We've won my lord! \nThey were foolish to defy us!"
            winnerValue = true
            duelBtn.innerText = "Play Again?"
        }
    }
  }


  function resetGame(){ 

    let pCardLength = pCards.length
    let cCardLength = cCards.length   

    for(i=0; i<pCardLength; i++){
        pCards.pop()
    }

    for(i=0; i<cCardLength; i++){
        cCards.pop()
    }

    cardDeck = buildDeck()
    shuffledDeck = null
    winnerValue = false
    duelBtn.innerText = 'Duel!'
    battleMsg.innerText = 'Time to duel again!'
  }
  


  /*------------ Event Listeners ------------*/
  renderGame();
  //TODO opening button  will say, Ready to play? then disappear and 
  //TODO duel button will appear. call render new shuffled deck function. 
  
  document.getElementById('duelBtn').addEventListener('click', (e) => {
    e.stopPropagation() //<-- used to stop button from being run when page loads
    duel()
  })
  document.getElementById('surrenderBtn').addEventListener('click',(e) => {
    e.stopPropagation() //<-- used to stop button from being run when page loads
    winner(true)
  })
 
