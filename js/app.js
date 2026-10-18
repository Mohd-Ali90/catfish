console.log('javascript is running')

/*-------------------------------- Constants --------------------------------*/
const tileCondition = ['', 'over',
    'up', 'up', 'over', 'down', 'up', 'fish', 'over', 'up', 'up', 'over', 'up', 'down'
    , 'over', 'right',
    'down', 'down', 'over', 'down', 'down', 'over', 'up', 'up', 'over', 'over', 'up', 'fish',
    'fish',
    'up', 'fish', 'up', 'up', 'over', 'fish', 'up', 'over', 'over', 'over', 'down', 'fish',
    'right', 'over',
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
const catElement = document.querySelector('#cat')

/*-------------------------------- Functions --------------------------------*/


console.log('Starting player position: ' + playerPosition)

function newGame(){
playerPosition = 0
 currentRoll = null
previousRoll = null
previousPositon = 0
nextRollForward = true
nextRollBackward = false
 gameOver = null
 rollButtonElement.disabled=false

}

function roll() {
    rollDice()
}


function rollDice() {
    currentRoll = Math.floor(Math.random() * 12)
    console.log('First roll: ', currentRoll)
    movePlayer(currentRoll)
}

function movePlayer(currentRoll) {
     previousPositon = playerPosition
    if (nextRollForward === true) {
        playerPosition = playerPosition += currentRoll
    } else {
        playerPosition = playerPosition -= currentRoll
    }
    updateBoard()
    checkPlayerPosition()
}



function checkPlayerPosition() {
    console.log('New player position: ' + playerPosition)
    previousRoll = currentRoll
    console.log('Previous roll now is: ', previousRoll)
    currentRoll = 0;
    console.log('Current roll now is: ', currentRoll)
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

    if (tileCondition[playerPosition] === 'right') {
        console.log('Next roll will send you right on board')
    }

    if (tileCondition[playerPosition] === 'fish') {
        console.log('You found the fish, Delicious!')
    }

}

function updateBoard() {
    for (onePlace of sortedRouteElements) {
        if (playerPosition) {

            sortedRouteElements[playerPosition].textContent = '🐈'
        }

    }
}

function checkGameOver(){
    if (gameOver === true) {
        rollButtonElement.disabled=true
    }
}

/*----------------------------- Event Listeners -----------------------------*/
rollButtonElement.addEventListener('click', roll)
newGameButtonElement.addEventListener('click', newGame)