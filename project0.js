console.log("Testing");


window.addEventListener('DOMContentLoaded', () => {
    const tiles = Array.from(document.querySelectorAll('.tile'));
    const playerDisplay = document.querySelector('.display-player');
    const announcer = document.querySelector('.announcer');
    const resetButton = document.querySelector('#reset');

    // variables for the board, player and game.

    let board = ['','','','','','','','',''];
    let currentPlayer = 'X';
    let isGameActive = true;

    // variables for end game state and used to announce end game state

    const PlayerX_Won = 'Player_X_Won';
    const PlayerO_Won = 'Player_O_Won';
    const DRAW = 'Draw';

//     // Keeps score.

//     let scoreOfX = $('#xScore');
//     let scoreOfO = $('#oScore')
//     let xScore = 0;
//     let oScore = 0;
//     let game = 1;

//   let nextGame = function() {
//     game = 1;
//     xScore = 0;
//     oScore = 0;

//     // displays scores
//     $(scoreOfX).text(`X - ${xScore}`);
//     $(scoreOfO).text(`O - ${oScore}`);
//     $(gameInfo).text(`Game ${game}`);
//     alert('Game has been reset');
//   }

//   $("#nextGame").on("click", function() {
//     reset();
//     nextGame();
//   });


    /* 
    Indexes inside the board
    [0] [1] [2]
    [3] [4] [5]
    [6] [7] [8] 
    */

    // stores winning conditions (array of arrays)
    const winConditions = [
        [2, 4, 6],
        [0, 4, 8],
        [2, 5, 8],
        [1, 4, 7],
        [0, 3, 6],
        [6, 7, 8],
        [3, 4, 5],
        [0, 1, 2] // first horizontal line of the board 
    ];

    // function for results
    function handleResultValidation() { // checks if theres a winner or not by looping through win conditions array
        let roundWon = false;
        for (let i = 0; i <= 7; i++) {
            const winCondition = winConditions[i];
            const a = board[winCondition[0]];
            const b = board[winCondition[1]];
            const c = board[winCondition[2]];
            if (a === '' || b === '' || c === '') {
                continue;
            }
            if (a === b && b === c) {
                roundWon = true;
                break;
            }
        }

    if (roundWon) {
        announce(currentPlayer === 'X' ? PlayerX_Won : PlayerO_Won);
        isGameActive = false;
        return;
    }

    if (!board.includes(''))
        announce(DRAW);
}

    const announce = (type) => {
        switch(type) { 
            case PlayerO_Won:
                announcer.innerHTML = 'Player <span class="playerO"> O </span> Won';
                break;
            case PlayerX_Won:
                announcer.innerHTML = 'Player <span class="playerX"> X </span> Won';
                break;
            case DRAW:
                announcer.innerHTML = 'Draw';
        }
        announcer.classList.remove('hide');
    };

    const isValidAction = (tile) => {
        if (tile.innerText === 'X' || tile.innerText === 'O') {
            return false;
        }
        return true;
    };

    const updateBoard = (index) => {
        board[index] = currentPlayer;
    }

    // changes between whos turn it is X or O
    const changePlayer = () =>{
        playerDisplay.classList.remove(`player${ currentPlayer }`);
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        playerDisplay.innerText = currentPlayer;
        playerDisplay.classList.add(`player${ currentPlayer }`);
    }

    const userAction = (tile, index) => {
        if (isValidAction(tile) && isGameActive) { // checks both and if true 
            tile.innerText = currentPlayer; // sets innertext to the currentplayer
            tile.classList.add(`player${ currentPlayer }`); // assigns either O or X depending on the current player
            updateBoard(index);
            handleResultValidation();
            changePlayer();
        }
    }

    // when reset button is clicked this resets the board
    const resetBoard = () => {
        board = ['','','','','','','','',''];
        isGameActive = true;
        announcer.classList.add('hide');

        if (currentPlayer === 'O') {
            changePlayer();
        }

        tiles.forEach(tile => {
            tile.innerText = '';
            tile.classList.remove('playerX');
            tile.classList.remove('playerO');
        });
    }

    tiles.forEach( (tile, index) => {
        tile.addEventListener('click', () => userAction(tile, index)); // attaches an eventlistener to every tile
    });

    resetButton.addEventListener('click', resetBoard);
});
