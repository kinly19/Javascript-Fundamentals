'use strict';

/* 
The DOM is not part of the JavaScript language, but is instead a Web API used to build websites.

// =========================================================  Selecting element =========================================================

const getHeader = document.querySelector(".title");
console.log(getHeader);
const message = document.querySelector(".message");
console.log(message);

// =======================================================================================================================================

// =========================================================  Getting innerHTML =========================================================

const innerHTML = document.querySelector("title").innerHTML;
const innerMessage = document.querySelector(".message").textContent;
console.log(innerHTML);
console.log(innerMessage);

// =======================================================================================================================================

// =========================================================== Setting content ===========================================================

document.querySelector(".message").textContent = "Correct You Win!";
document.querySelector(".number").textContent = "12";
document.querySelector(".score").textContent = "12";

- Setting 'input' values
let inputValue = document.querySelector(".guess").value;

// =======================================================================================================================================

/ ======================================================== Manipulating CSS styles =======================================================
document.querySelector(".number").style.width = "30rem"

// =======================================================================================================================================


// ============================================================ Click events =============================================================
https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener

Syntax
addEventListener(type, listener);
addEventListener(type, listener, options);
addEventListener(type, listener, useCapture);

Example.

const btnCheck = document.querySelector(".check"); 
const inputValue = document.querySelector(".guess");
let updatedInputValue;

- Function to set value of (updatedInputValue) to the users inputted value
const setInputValue = (value) => {
  value = inputValue.value // input field value
  console.log("your values is:" + value);
}

btnCheck.addEventListener("click", () => setInputValue(updatedInputValue));

- Or like this 
btnCheck.addEventListener("click", function () {
  value = inputValue.value // input field value
  console.log("your values is:" + value);
})

// =======================================================================================================================================
*/

// ========================================================= Actual game logic ===========================================================

// get random number
const getSecretNumber = () => {
  return Math.trunc(Math.random() * 20 + 1);
}

// set random number
let secretNumber = getSecretNumber();
console.log(secretNumber)

// Initial Score 
let score = 20;

// initial highscore
let highscore = 0; 

// functions 
const incrementScore = () => {
  score ++;
  // Show updated score
  document.querySelector(".score").textContent = score;
}

const decrementScore = () => {
  score --;
  // Show updated score
  document.querySelector(".score").textContent = score;
}

const resetScore = () => {
  document.querySelector(".score").textContent = 20;
  score = 20;
}

const displayHighscore = () => {
  // highscore is greater than prev highscore 
  if (score > highscore) {
    highscore = score;
    document.querySelector(".highscore").textContent = highscore;
  }
}

const displayMessage = (message) => {
  document.querySelector(".message").textContent = message;
}

const gameReset = () => {
  console.log("Game reset")
  document.querySelector("body").style.backgroundColor = "#4d8989";
  document.querySelector(".number").textContent = "?";
  document.querySelector(".number").style.width = "15rem";
  document.querySelector(".guess").value = "";
  document.querySelector(".message").textContent = "Start guessing...";
  // Reset score
  resetScore();
  // Reasign secret number
  secretNumber = getSecretNumber();
  console.log("New number is ", secretNumber);
}


document.querySelector(".check").addEventListener("click", function () {
  const guess = Number(document.querySelector(".guess").value);

  // No input
  if (!guess) {
    console.log("Please enter an input");

    // Correct guess
  } else if (guess === secretNumber) {
    document.querySelector(".number").textContent = secretNumber;
    // document.querySelector(".message").textContent = "Correct 🎉🎉🎉";
    displayMessage("Correct 🎉🎉🎉");
    document.querySelector("body").style.backgroundColor = "#60b347";
    document.querySelector(".number").style.width = "30rem";
    displayHighscore();

    // Incorrect guess
  } else if (guess !== secretNumber) {

    // Score is greater than 1
    if (score > 1) {
      decrementScore();
      guess > secretNumber
        ? displayMessage("Too High 😂")
        : displayMessage("Too low 😅");

      // Score is less than 1
    } else {
      displayMessage("You Lose! 😂");
      document.querySelector(".score").textContent = 0;
    }
  }

  /* Without Refactoring

  if (!guess) {
    console.log("Please enter input");

    // Player wins
  } else if (guess === secretNumber && score > 1) {
    document.querySelector(".number").textContent = secretNumber;
    document.querySelector(".message").textContent = "Correct 🎉🎉🎉";
    document.querySelector("body").style.backgroundColor = "#60b347";
    document.querySelector(".number").style.width = "30rem";
    highScore();

    // Player loses when score falls below 1
  } else if (score === 1){
    document.querySelector(".message").textContent = "You Lose! 😂";
    document.querySelector(".score").textContent = 0;

    // Guess too high
  } else if (guess > secretNumber) {
    document.querySelector(".message").textContent = "Too High 😥";
    decrementScore();

    // Guess too low
  } else if (guess < secretNumber) {
    document.querySelector(".message").textContent = "Too Low 😅";
    decrementScore();
  }

  */
});

// Reset game
document.querySelector(".again").addEventListener("click", gameReset)

