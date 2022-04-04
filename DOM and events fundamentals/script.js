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
let score = Number(document.querySelector(".score").textContent); 

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

document.querySelector(".check").addEventListener("click", function () {
  const guess = Number(document.querySelector(".guess").value);
  
  if (!guess) {
    console.log("Please enter input");
    
  } else if (guess === secretNumber && score > 1) {
    document.querySelector(".number").textContent = secretNumber;
    document.querySelector(".message").textContent = "Correct 🎉🎉🎉";
    document.querySelector(".guess").value = "";
    incrementScore();
    // get a new secret number
    secretNumber = getRandomNumber();
    console.log("New number is ", secretNumber)

  } else if (score === 1){
    document.querySelector(".message").textContent = "You Lose! 😂";
    document.querySelector(".score").textContent = 0;

  } else if (guess > secretNumber) {
    document.querySelector(".message").textContent = "Too High 😥";
    decrementScore();

  } else if (guess < secretNumber) {
    document.querySelector(".message").textContent = "Too Low 😅";
    decrementScore();
  }
})

