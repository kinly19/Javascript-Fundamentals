'use strict';


// ==================================================== Selecting multiple elements =====================================================
/*
https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll
querySelectorAll - returns a static (not live) NodeList... representing a list of the document's elements 
that match the specified group of selectors

- We can loop through nodelist and console each elements textContent
for (let i = 0; i < btnOpenModal.length; i++) {
  console.log(btnOpenModal[i].textContent);
}
*/

// =======================================================================================================================================

// ========================================================== Element.classList ==========================================================
/*
https://developer.mozilla.org/en-US/docs/Web/API/Element/classList

Element.classList - is a read-only property that returns a live DOMTokenList collection of the class attributes of the element. 
This can then be used to manipulate the class list

*/
// =======================================================================================================================================

// ============================================================== contains() =============================================================
/*
https://developer.mozilla.org/en-US/docs/Web/API/DOMTokenList/contains
The contains() method of the  interface returns a boolean value — true if the underlying list contains the given token, otherwise false.


https://developer.mozilla.org/en-US/docs/Web/API/DOMTokenList
DOMTokenList
*/
// =======================================================================================================================================

// Select and store element into variables
const showModal = document.querySelector(".modal");
const btnCloseModal = document.querySelector(".close-modal");
const btnOpenModal = document.querySelectorAll(".show-modal");
const overlay = document.querySelector(".overlay");

/* Not very dry 4 separate functions that do the same thing (removing and adding class attributes)

const showModalHandler = () => {
  showModal.classList.remove("hidden");
}

const closeModalHandler = () => {
  showModal.classList.add("hidden");
}

const showOverlayHandler = () => {
  overlay.classList.remove("hidden");
}

const closeOverlayHandler = () => {
  overlay.classList.add("hidden")
}

*/

/* Not very dynamic - We could do it this way, but we hard code the "hidden" class which only makes it useful for 'hidden' classes
const removeClass = (element) => {
  element.classList.remove("hidden");
}
*/

// More dynamic we can now use this function on any element and remove any class we pass into as an argument
const removeClass = (element, classname ) => {
  element.classList.remove(classname);
}

const addClass = (element, classname) => {
  element.classList.add(classname);
}

const openModal = () => {
  removeClass(showModal, "hidden");
  removeClass(overlay, "hidden");
}

const closeModal = () => {
  addClass(showModal, "hidden");
  addClass(overlay, "hidden");
}

/* Without Refactoring

for (let i = 0; i < btnOpenModal.length; i++) {
  // Add an event listener for each element in the array of i (index of i)
  btnOpenModal[i].addEventListener("click", function (){
    console.log(`Button element '${btnOpenModal[i].textContent}' clicked`);
    // Remove class attribute to show modal and overlay
    // showModal.classList.remove("hidden"); // we dont use '.hidden' we only pass in the name of the class (as string)
    removeClass(showModal, "hidden");
    removeClass(overlay, "hidden");
  });
}

btnCloseModal.addEventListener("click", function () {
  // showModal.classList.add("hidden");
  addClass(showModal, "hidden");
  addClass(overlay, "hidden");
})

*/

// Refactoring
// Add event listener for each element
for (let i = 0; i < btnOpenModal.length; i++) {
  // Open modal
  btnOpenModal[i].addEventListener("click", openModal);
}

// Close modal
btnCloseModal.addEventListener("click", closeModal);
// Hide overlay
overlay.addEventListener("click", closeModal);

// ======================================================= Handling keypress events ======================================================

/*
document.addEventListener("keydown", function (e) {
  console.log(`The key: ${e.key} was pressed`);
  console.log(e)
  
})
*/

document.addEventListener("keydown", function (e) {
  // Check for keydown of esc && showModal doesnt contains 'hidden' class
  if (e.code === "Escape" && !showModal.classList.contains("hidden")) {
    console.log("close modal");
    closeModal();
  }
})

// =======================================================================================================================================

