'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  // Remove class style
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  // Add class style
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

// Add eventlistener for each button to open modal
btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// ============================================================== Notes =============================================================
/*
  querySelectorAll() 
  - Returns a static (not live) NodeList representing a list of the document's elements that match the specified group of selectors.
  
*/
// ===================================================================================================================================

// ==================================================== How the DOM Really Works =====================================================
/*
  What is the DOM
  - The DOM is the interface between all Javascript code and the browser, or more specifically HTML documents, 
    All rendered in by the browser.
  - Allows us to make Javascript interact with the browser.
  - We can write js to create, modify and delete HTML elements, set styles, classes and attributes and listen and respond to events
  - DOM tree is generated from an HTML document, which we can then interact with
  - DOM is a very complex API which contains many methods and properties to help interact with the DOM tree.
    
  - The DOM contains different types of nodes, some are HTML elements others are just text. This is important to remember
    because all these different DOM methods and properties are organized into these different types of objects.
    https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType
  - Inheritance of methods and properties allow all these different node types to inherit additional methods

  - https://flaviocopes.com/dom/#:~:text=The%20DOM%20is%20a%20tree,and%20move%20to%20different%20nodes 
*/
// ===================================================================================================================================
 
