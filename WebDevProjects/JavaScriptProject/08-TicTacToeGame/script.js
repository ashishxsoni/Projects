const reset = document.querySelector("#reset-btn");
const stat = document.querySelector("#status");
const player = document.querySelector('#player');
const wincond = ["123", "456", "789", "147", "258", "369", "159", "357"];
let cells = document.querySelectorAll('.cell');
let gameOver = false;
let xturn = true;

let xmove = Array(9).fill('F');
let omove = Array(9).fill('F');

reset.addEventListener('click', (e) => {
    resetGame();
});

cells.forEach((curcell) => {
    curcell.addEventListener('click', (e) => {
        if(gameOver) return;
        
        // Extract the number after "cell-" and subtract 1 to get 0-based index
         const cellid = parseInt(curcell.id.split('-')[1]);
         console.log(cellid);
         
         // Validate cell ID
         if(isNaN(cellid) || cellid < 0 || cellid > 8) {
             console.error('Invalid cell ID');
             return;
         }
        if(xturn) {
            curcell.innerHTML = 'X';
            xmove[cellid] = 'T';
            getStatus(xmove);
        } else {
            curcell.innerHTML = 'O';
            omove[cellid] = 'T';
            getStatus(omove);
        }
    });
});

function getStatus(moves) {
    if(hasWon(moves)) {
        const winner = xturn ? "X" : "O";
        const message = `Player ${winner} has Won the Game`;
        endGame(message);
    }
    else if(drawGame()) {
        const message = `Hola Amigos, the Game has Drawn`;
        endGame(message);
    }
    else {
        player.innerHTML = xturn ? 'O' : 'X';
        xturn = !xturn;
    }
}

function drawGame() {
    for(let i = 0; i < 9; i++) {
        if(xmove[i] === 'F' && omove[i] === 'F') {
            return false;
        }
    }
    return true;
}

function hasWon(moves) {
    for(let i = 0; i < wincond.length; i++) {
        const win = wincond[i];
        let tmp = "";
        for(let j = 0; j < 3; j++) {
            tmp += moves[parseInt(win.charAt(j)) - 1];
        }
        if(tmp === "TTT") return true;
    }
    return false;
}

function resetGame() {
    cells.forEach(curcell => {
        curcell.innerHTML = '';
        curcell.style.pointerEvents = 'auto'; // Re-enable clicks
    });
    stat.innerHTML = `Player <span id="player">X</span>'s turn`;
    gameOver = false;
    xturn = true;
    xmove = Array(9).fill('F');
    omove = Array(9).fill('F');
    player.innerHTML = 'X';  // Reset player display
}

function endGame(message) {
    stat.innerHTML = message;
    gameOver = true;
    // cells.forEach(cell => cell.innerHTML='');
}