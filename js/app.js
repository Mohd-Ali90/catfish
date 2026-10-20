console.log('javascript is running')

/*-------------------------------- Constants --------------------------------*/
const tileCondition = ['', 'over',
    'up', 'up', 'over', 'down', 'up', 'fish', 'over', 'up', 'up', 'over', 'up', 'down'
    , 'over', 'fish',
    'down', 'down', 'over', 'down', 'down', 'over', 'up', 'up', 'over', 'over', 'up', 'fish',
    'fish',
    'up', 'fish', 'up', 'up', 'over', 'fish', 'up', 'over', 'over', 'over', 'down', 'fish',
    'fish', 'over',
    'down', 'down', 'down', 'over', 'over', 'fish', 'up', 'over', 'fish', 'over', 'over', 'over']


/*---------------------------- Variables (state) ----------------------------*/

let playerPosition = 0
let currentRoll = null
let previousRoll = null
let previousPositon = 0
let nextRollForward = true
let nextRollBackward = false
let gameOver = null
/*------------------------ Cached Element References ------------------------*/
const routeElements = document.querySelectorAll('.tile')
const rollButtonElement = document.querySelector('#roll-button')
const newGameButtonElement = document.querySelector('#new-game-button')
const sortedRouteElements = [...routeElements]
sortedRouteElements.sort((a, b) => Number(a.id) - Number(b.id))
const rulesButtonElement = document.getElementById('rules-button')
const rulesTextElement = document.getElementById('rules')
const messageElement = document.querySelector('#message')
const rollMessageElement = document.querySelector('#roll')
/*-------------------------------- Functions --------------------------------*/

function showRules(){
if (rulesTextElement.style.visibility === 'visible') {
    rulesTextElement.style.visibility = 'hidden'
    
} else if (rulesTextElement.style.visibility === 'hidden') {
    rulesTextElement.style.visibility = 'visible'
    
}

}

console.log('Starting player position: ' + playerPosition)

function newGame(){
messageElement.textContent=''
rollMessageElement.textContent=''
playerPosition = 0
currentRoll = null
previousRoll = null
nextRollForward = true
nextRollBackward = false
 gameOver = null
 rollButtonElement.disabled=false
 updateBoard()
 
}

function roll() {
    messageElement.textContent=''
    rollDice()
}


function rollDice() {
    currentRoll = Math.floor(Math.random() * 12)
   console.log('Roll: ', currentRoll)
   rollMessageElement.textContent= `You rolled:${currentRoll}`
    movePlayer(currentRoll)
}

function movePlayer(currentRoll) {
    if (nextRollForward === true || playerPosition === 0) {
        previousPositon = playerPosition
        playerPosition = playerPosition += currentRoll
    } else {
        if (playerPosition === 5 && currentRoll > 5 ) {
            playerPosition = 0
            console.log('you tried to go outside')
        } 
        else{
            previousPositon = playerPosition
            playerPosition = playerPosition -= currentRoll
        }
    }
    updateBoard()
    checkPlayerPosition()

}



function checkPlayerPosition() {
    currentRoll = 0;
    previousRoll = currentRoll
    console.log('Previous roll now is: ', previousRoll)

    console.log('New player position: ' + playerPosition)
    checkTileCondition()
    checkGameOver()
}

function checkTileCondition() {
    if (tileCondition[playerPosition] === 'over') {
        console.log('You fell in a hole, game over')
        messageElement.textContent = `You fell into a whole game over`
        gameOver = true
    
    }

    if (tileCondition[playerPosition] === 'up') {
        console.log('Next roll will send you up on board')
        messageElement.textContent = `Landed on red, next roll will send you higher`
        nextRollForward = true
        nextRollBackward = false
    }

    if (tileCondition[playerPosition] === 'down') {
        console.log('Next roll will send you down on board')
         messageElement.textContent = `Landed on blue, next roll will send you lower`
        nextRollBackward = true
        nextRollForward = false
    }

    if (tileCondition[playerPosition] === 'fish') {
        console.log('You found the fish, Delicious!')
    }
}

function updateBoard(){

    const previousCatPosition = document.querySelector('.catPosition')

    if (previousCatPosition) {
        previousCatPosition.remove()
    }

    const currentCatPosition = sortedRouteElements[playerPosition]

    const cat = document.createElement("span")
    cat.textContent = '🐈'
    currentCatPosition.appendChild(cat)

    cat.classList.add('catPosition')
    console.log(currentCatPosition)


}
function checkGameOver(){
    if (gameOver === true) {
        rollButtonElement.disabled=true
    }
}



/*----------------------------- Event Listeners -----------------------------*/
rollButtonElement.addEventListener('click', roll)
newGameButtonElement.addEventListener('click', newGame)
rulesButtonElement.addEventListener('click',showRules)
