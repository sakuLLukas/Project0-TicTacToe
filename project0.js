console.log("Testing");

// # ![](https://ga-dash.s3.amazonaws.com/production/assets/logo-9f88ae6c9c3871690e33280fcf557f33.png) Project #0: The Game

// ### Overview

// Let's start out with something fun - **a game!**

// **We'll be making Tic Tac Toe**, a game that takes seconds to learn but minutes to master! Everyone will get a chance to **be creative**, and work through some really **tough programming challenges** to get your feet wet in the world of web development. 

// > "hand me your phone," load up the game, and play a quick round!

// **You will be working individually for this project**, but we'll be guiding you along the process and helping as you go. Show us what you've got!

// ---

// ### What You've Learned

// By the time you submit this project, you will have covered new ground in many of the big themes of the course:

// - **Command Line**: Practice interacting with the computer and navigating the filesystem from the command line.
// - **Source Control**: Manage and interact with a git repository to store changes to code.
// - **Programming Fundamentals**: Work with array, objects, event handlers and callbacks, while learning how to strategically solve problems and resolve errors.
// - **Web Fundamentals**:  Learn how communication happens over the internet, and how to structure, style, and animate documents within a browser. Also learn how to respond to actions your users take and the data they input into the browser.
// - **Browser Applications**:  Dive into CSS, Sass, and how to use libraries and frameworks to get lots of style for free.
// - **Deployment**: Host a static web site in a managed hosting environment.
// - **Products and Teams**: Document your code and your code repository so others understand what you've built.


// ---

// ### Big Goals

// * **Build a web application from scratch**, without a starter codebase
// * Use your programming skills to **map out the game logic for a simple game like Tic Tac Toe**
// * **Separate HTML, CSS, and JavaScript files** in your application
// * Build an application **to a spec that someone else gives you**
// * **Build a dynamic game that allows two players to compete**
// * **Craft a ``readme.md`` file that explains your app** to the world

// ---

// ### Technical Requirements

// Your app must:

// * **Render a game board in the browser**
// * **Switch turns** between X and O (or whichever markers you select)
// * **Visually display which side won** if a player gets three in a row or show a draw/"cat’s game" if neither wins
// * **Include separate HTML / CSS / JavaScript files**
// * Stick with **KISS (Keep It Simple Stupid)** and **DRY (Don't Repeat Yourself)** principles
// * Use **Javascript** for **DOM manipulation**
// * **Deploy your game online**, where the rest of the world can access it
// * Use **semantic markup** for HTML and CSS (adhere to best practices)

// ---

// ### Bonus

// These are for extra credit! Don't focus on these until you've hit the core requirements.

// * Keep track of **multiple game rounds** with a win counter
// * Allow players to **customize their tokens** (X, O, name, picture, etc)
// * **Get inventive with your styling**, e.g. use hover effects or animations to spiff things up
// * **Use LocalStorage** to persist data locally to allow games to continue after page refresh or loss of internet connectivity
// * **Support custom board sizes**: default is 3x3 but you could allow users to choose a larger board
// * **Support networked multiplayer**: https://www.firebase.com/ has a nice quickstart guide
// * **TRICKIEST**: Create an AI opponent: teach Javascript to play an unbeatable game against you

// ---

// ### Necessary Deliverables

// * A **working game, built by you**, hosted somewhere on the internet
// * A **link to your hosted working game** in the URL section of your Github repo
// * A **git repository hosted on Github**, with a link to your hosted game, and frequent commits dating back to the very beginning of the project
// * **A ``readme.md`` file** with explanations of the technologies used, the approach taken, installation instructions, unsolved problems, etc.

// ---

// ### Suggested Ways to Get Started

// * **Break the project down into different components** (data, presentation, views, style, DOM manipulation) and brainstorm each component individually. Use whiteboards!
// * **Use your Development Tools** (console.log, inspector, alert statements, etc) to debug and solve problems
// * Work through the lessons in class, **ask questions and come to office hours** when you need to. Think about adding relevant code to your Tic Tac Toe game each night, instead of, you know... _procrastinating_.
// * **Commit early, commit often.** Don’t be afraid to break something because you can always go back in time to a previous version.
// * **Check out Tutorial and Documentation resources** (jQuery tutorial) at home to better understand what you’ll be getting into.
// * **Don’t be afraid to write code that you know you will have to remove later.** Create temporary elements (buttons, links, etc) that trigger events if real data is not available. For example, if you’re trying to figure out how to change some text when the game is over but you haven’t solved the win/lose game logic, you can create a button to simulate that until then.

// ---

// ### Useful Resources

// * **[MDN Javascript Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript)** _(a great reference for all things Vanilla Javascript)_
// * **[jQuery Docs](http://api.jquery.com)**
// * **[Github Pages](https://pages.github.com)** _(for hosting your game)_

// ---

// ### If You Finish Early

// We invite you to work on any or all of the following:

// * A more advanced game (Memory? Battleship? Connect Four?)
// * Your Github portfolio site
// * Any other front-end project that interests you


window.addEventListener('DOMContentLoaded', () => {
    const tiles = Array.from(document.querySelectorAll('.tile'));
    const playerDisplay = document.querySelector('.display-player');
    const announcer = document.querySelector('.announcer');
    const resetButton = document.querySelector('#reset');

    // variables for the board and if a player is currently choosing a grid. Also if the game is 'active'.

    let board = ['','','','','','','','',''];
    let currentPlayer = 'X';
    let isGameActive = true;

    // variables for each player winning or a draw.

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

    const winConditions = [
        [2, 4, 6],
        [0, 4, 8],
        [2, 5, 8],
        [1, 4, 7],
        [0, 3, 6],
        [6, 7, 8],
        [3, 4, 5],
        [0, 1, 2]
    ];

    // function for results
    function handleResultValidation() {
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
        if (isValidAction(tile) && isGameActive) {
            tile.innerText = currentPlayer;
            tile.classList.add(`player${ currentPlayer }`);
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
        tile.addEventListener('click', () => userAction(tile, index));
    });

    resetButton.addEventListener('click', resetBoard);
});
