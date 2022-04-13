'use strict';

/* ============================================================= toggle() ============================================================
https://developer.mozilla.org/en-US/docs/Web/API/DOMTokenList/toggle

The toggle() method of the DOMTokenList interface removes an existing token from the list and returns false. 
If the token doesn't exist... it's added and the function returns true.

it will add the class if it is not there and if it is there, it will remove it

======================================================================================================================================*/ 
// Elements
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0El = document.querySelector("#score--0"); 
const score1El = document.getElementById("score--1"); // Get elements by id Same as above but faster
const current0El = document.querySelector("#current--0");
const current1El = document.querySelector("#current--1");
const diceEl = document.querySelector(".dice");

// Buttons
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

// Starting conditions
let score, currentScore, activePlayer, playing;

const init = () => {
  score = [0, 0]
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  diceEl.classList.add("hidden");

  current0El.textContent = 0;
  current1El.textContent = 0;
  score[0] = 0;
  score[1] = 0;
  currentScore = 0;
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  player1El.classList.remove("player--active");
  player0El.classList.add("player--active");
  activePlayer = 0;
}

// Run init function for initial render
init();

const switchPlayer = () => {
  currentScore = 0
  document.getElementById(`current--${activePlayer}`).textContent = currentScore;
  // current0El.textContent = currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
}

// Roll dice functionality
btnRoll.addEventListener("click", function () {
  if (playing) {
    // 1. Generate a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    // 2. Display dice
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${dice}.png`;
    // 3. Check if roll is 1
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    } else {
      // Reset current score for next player
      switchPlayer();
    }
  }
});

// Hold functionality
btnHold.addEventListener("click", function() {
  if (playing) {
    // 1. Add current score to the active players score
    score[activePlayer] += currentScore;  // scores[0] += currentScore;

    document.getElementById(`score--${activePlayer}`).textContent = score[activePlayer]; // score[0]
    // activePlayer === 0 ? score0El.textContent = score[activePlayer] : score1El.textContent = score[activePlayer]; - Long
    // `score${activePlayer}El`.textContent = score[activePlayer]; - Wont work

    // 2. Check if players score is >= 100
    if (score[activePlayer] >= 100) {
      // Finish game
      playing = false;
      document.querySelector(`.player--${activePlayer}`).classList.add("player--winner");
      document.querySelector(`.player--${activePlayer}`).classList.remove("player--active");
    } else {
      // Switch to the next player
      switchPlayer();
    }
  } 
});

// Restart functionality
btnNew.addEventListener("click", init);