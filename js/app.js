console.log('javascript is running')

/*---------------------------- Variables (state) ----------------------------*/

let up1 = ['', '', '', '', '', '', '', '', '', '', '']

let up2B = ['','','','','','']

let rightA = ['', '' , '', '']

let up3 = ['' , '' ,'' , '' , '']

let rightB = ['' ,'' , '', '' ,'' ,'','']

let up2A = ['','', '', '']

let main = ['', '', '', '', '', '', '', '', '', '', '' , '']

let down1 = ['', '', '', '', '', '', '', '', '', '', '']

let down2 = ['' , '', '', '', '' ,'']

/*------------------------ Cached Element References ------------------------*/
const mainTileElements = document.querySelectorAll('.mainTile')


/*-------------------------------- Functions --------------------------------*/

function init() {
    for (let i = 0; i < main.length; i++) {
        [i].textContent = main[i]
    }
}

init()