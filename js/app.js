console.log('javascript is running')

/*---------------------------- Variables (state) ----------------------------*/

let route = ['p', '',
    ['', '', '', '', '', '', '', '', '', '', '']
    , '', '',
    ['', '', '', '', '', '', '', '', '', '', ''],
    '',
    ['', '', '', '', '', '', '', '', '', '', ''],
    '', '',
    ['', '', '', '', '', '', '', '', '', '', '']]
let playerPosition = 0
let inInnerArray = false
let dice = null
let innerArrayIndex = null

/*------------------------ Cached Element References ------------------------*/
const routeElements = document.querySelectorAll('.tile')

const rollButtonElement = document.querySelector('#roll-button')

const sortedRouteElements = [...routeElements]
sortedRouteElements.sort((a, b) => Number(a.id) - Number(b.id))

console.log(routeElements)
console.log(sortedRouteElements)
console.log(rollButtonElement)
console.log(route)

/*-------------------------------- Functions --------------------------------*/


function init() {
    rollDice()
    movePlayer()
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

        return

    }
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

/*----------------------------- Event Listeners -----------------------------*/
rollButtonElement.addEventListener('click', init)