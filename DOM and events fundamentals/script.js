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
