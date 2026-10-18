console.log('javascript is running')

/*-------------------------------- Constants --------------------------------*/
const tileCondition = ['', 'over',
    'up', 'up', 'over', 'down', 'up', 'fish', 'over', 'up', 'up', 'over', 'up','down'
    , 'over', 'right',
    'down', 'down', 'over', 'down', 'down', 'over', 'up', 'up', 'over', 'over', 'up','fish',
    'fish',
    'up', 'fish', 'up', 'up', 'over', 'fish', 'up', 'over', 'over', 'over', 'down','fish',
    'right', 'over',
    'down', 'down', 'down', 'over', 'over', 'fish', 'up', 'over', 'fish', 'over', 'over','over']

/*---------------------------- Variables (state) ----------------------------*/

let route = ['p', '',
    '', '', '', '', '', '', '', '', '', '', '',''
    , '', '',
    '', '', '', '', '', '', '', '', '', '', '','',
    '',
    '', '', '', '', '', '', '', '', '', '', '','',
    '', '',
    '', '', '', '', '', '', '', '', '', '', '','']
let playerPosition = 0
let inInnerArray = false
let dice = null
//let innerArrayIndex = null
let currentPlaceOnBoard = 0
let nextRollUp = null
let nextRollDown = null
/*------------------------ Cached Element References ------------------------*/
const routeElements = document.querySelectorAll('.tile')

const rollButtonElement = document.querySelector('#roll-button')

const sortedRouteElements = [...routeElements]
sortedRouteElements.sort((a, b) => Number(a.id) - Number(b.id))
console.log(rollButtonElement)
console.log(route)

/*-------------------------------- Functions --------------------------------*/



function init() {
    rollDice()
    movePlayer()
     checkTileCondition()
}


function rollDice() {
    dice = Math.floor(Math.random() * 11)
    console.log(dice)
}

function movePlayer() {
    if (playerPosition + dice >= route.length - 1) {
        route.splice(playerPosition, 1, '')
        playerPosition = route.length - 1
        route.splice(playerPosition, 1, 'p')
        console.log('now the player is at: ' + playerPosition)
        console.log(route)
        console.log(inInnerArray)
        console.log(route)
        return
    }
    
    // route.forEach((position) => {
    //     if (playerPosition === 2) {
    //         position[2].splice(playerPosition, 1, '')
    //         playerPosition = route.length - 1
    //         route.splice(playerPosition, 1, 'p')
    //     }
        
    //     })
    if (inInnerArray) {

    }
    console.log('the player was at' + playerPosition)

    route.splice(playerPosition, 1, '')
    playerPosition = playerPosition + dice


    if (Array.isArray(route[playerPosition])) {
        console.log('You are in array')
        route[playerPosition].splice(0, 1, 'p')
        console.log('now the player is at: ' + playerPosition)
        inInnerArray = true
        innerArrayIndex = playerPosition
        console.log(route)
        console.log(inInnerArray)
        return
    }
    else {
        console.log('not in array')
    }

    route.splice(playerPosition, 1, 'p')

    console.log('now the player is at: ' + playerPosition)
    console.log(route)
    console.log(inInnerArray)
}

function checkTileCondition()
{
 if (tileCondition[playerPosition]==='over' || tileCondition[[]]==='over'){
    console.log('You fell in a hole, game over')
 } 

  if (tileCondition[playerPosition]==='up'){
    console.log('Next roll will send you up on board')
    nextRollUp = true
    nextRollDown = false
 } 

  if (tileCondition[playerPosition]==='down'){
    console.log('Next roll will send you down on board')
    nextRollDown = true
    nextRollUp = false
 } 

  if (tileCondition[playerPosition]==='right'){
    console.log('Next roll will send you right on board')
 } 

  if (tileCondition[playerPosition]==='fish'){
    console.log('You found the fish, Delicious!')
 } 

}




/*----------------------------- Event Listeners -----------------------------*/
rollButtonElement.addEventListener('click', init)