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

let route = ['p', '',
    '', '', '', '', '', '', '', '', '', '', '', ''
    , '', '',
    '', '', '', '', '', '', '', '', '', '', '', '',
    '',
    '', '', '', '', '', '', '', '', '', '', '', '',
    '', '',
    '', '', '', '', '', '', '', '', '', '', '', '']

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

/*-------------------------------- Functions --------------------------------*/


console.log('Starting player position: ' + playerPosition)

function newGame(){

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
    rollDice()
}


function rollDice() {
    currentRoll = Math.floor(Math.random() * 12)
   console.log('Roll: ', currentRoll)
    movePlayer(currentRoll)
}

function movePlayer(currentRoll) {
    if (nextRollForward === true) {
        previousPositon = playerPosition
        playerPosition = playerPosition += currentRoll
    } else {
        previousPositon = playerPosition
        playerPosition = playerPosition -= currentRoll
    }
    updateBoard()
    checkPlayerPosition()
}



function checkPlayerPosition() {
    currentRoll = 0;
    // console.log('Current roll now is: ', currentRoll)
    previousRoll = currentRoll
    console.log('Previous roll now is: ', previousRoll)

    console.log('New player position: ' + playerPosition)
    checkTileCondition()
    checkGameOver()
}

function checkTileCondition() {
    if (tileCondition[playerPosition] === 'over') {
        console.log('You fell in a hole, game over')
        gameOver = true
    }

    if (tileCondition[playerPosition] === 'up') {
        console.log('Next roll will send you up on board')
        nextRollForward = true
        nextRollBackward = false
    }

    if (tileCondition[playerPosition] === 'down') {
        console.log('Next roll will send you down on board')
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

    // Retrieved the html div based on the current player position index
    const currentCatPosition = sortedRouteElements[playerPosition]

    // Created a new element to append to the div container that contains the cat
    const cat = document.createElement("span")
    cat.textContent = '🐈'
    currentCatPosition.appendChild(cat)

    // Added a class to the span so we can cache the element based on class name and then remove it
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