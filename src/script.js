'use strict';

let activePlayer = 1;       // 0: player 1, 1: player 2
const rollEl     = document.querySelector('#b-roll-dice');
const holdEl     = document.querySelector('#b-hold-score');
const diceEl     = document.querySelector('.dice');
const newGameEl  = document.querySelector('#b-new-game');

// Callbacks
rollEl.addEventListener('click', () => {
    const num            = rollDice();
    const currentScoreEl = document.querySelector(`.current-score--${activePlayer}`);
    const currentScore   = Number(currentScoreEl.textContent);

    if (num === 1) {
        const scoreEl              = document.querySelector(`.score--${activePlayer}`);
        scoreEl.textContent        = 0;
        currentScoreEl.textContent = 0;
        switchPlayer();
    } else {
        currentScoreEl.textContent = currentScore + num;
        checkWinner();
    }
});

holdEl.addEventListener('click', () => {
    updateScore();
    checkWinner();
    switchPlayer();
    diceEl.textContent         = '';
});

newGameEl.addEventListener('click', reset);

// Function declarations
function switchPlayer() {
    const arrowEl      = document.querySelector(`span`);

    arrowEl.classList.toggle('arrow-right');
    activePlayer       = activePlayer === 1 ? 2 : 1;
}

function rollDice() {
    const num          = Math.trunc(Math.random() * 20) + 1;

    diceEl.classList.remove('hidden');
    diceEl.textContent = num;
    return num;
}

function updateScore() {
    const scoreEl              = document.querySelector(`.score--${activePlayer}`);
    const currentScoreEl       = document.querySelector(`.current-score--${activePlayer}`);
    scoreEl.textContent        = Number(scoreEl.textContent) + Number(currentScoreEl.textContent);
    currentScoreEl.textContent = 0;
}

function checkWinner() {
    const currentScore = Number(document.querySelector(`.current-score--${activePlayer}`).textContent);
    const score        = Number(document.querySelector(`.score--${activePlayer}`).textContent);
    const goal         = 500;

    if (score >= goal || currentScore >= goal) {
        if (score < goal) {
            updateScore();
        }

        const mainframeEls = document.querySelectorAll('.mainframe > *');

        mainframeEls.forEach(el => {
            if (el.classList.contains('midframe')) return;

            el.classList.add(el.classList.contains(`player--${activePlayer}`) ? 'winner' : 'loser');
        });

        // Disable buttons
        rollEl.disabled = true;
        holdEl.disabled = true;
    }
}

function reset() {
    const scoreEls        = document.querySelectorAll('.score--1, .score--2');
    const currentScoreEls = document.querySelectorAll('.current-score--1, .current-score--2');
    const mainframeEls    = document.querySelectorAll('.mainframe > *');
    
    scoreEls.forEach(el => el.textContent = 0);
    currentScoreEls.forEach(el => el.textContent = 0);
    mainframeEls.forEach(el => el.classList.remove('winner', 'loser'));
    diceEl.classList.add('hidden');

    // Enable buttons
    rollEl.disabled = false;
    holdEl.disabled = false;
}