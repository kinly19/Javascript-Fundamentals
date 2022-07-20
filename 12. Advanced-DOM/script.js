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
 
// =========================================== Selecting, Creating, and Deleting Elements ============================================
/*
  ======= Selecting =======

  Document.documentElement
  - https://developer.mozilla.org/en-US/docs/Web/API/Document/documentElement 
  - Returns the Element that is the root element of the document (for example, the <html> element for HTML documents).

  Document.querySelector()
  - Returns the first Element within the document that matches the specified selector, or group of selectors. 
    If no matches are found, null is returned.

  Document.querySelectorAll()
  - https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll
  - Returns a static (not live) NodeList representing a list of the document's elements that match the specified group of selectors.

  Document.getElementById()
  - https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementById
  - Returns an Element object representing the element whose id property matches the specified string. 
    Since element IDs are required to be unique if specified, they're a useful way to get access to a specific element quickly.

  Document.getElementsByTagName()
  - https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementsByTagName
  - method of Document interface returns an HTMLCollection of elements with the given tag name.
  - Live because if the DOM changes, this collection will be updated automatically.
  - The complete document is searched, including the root node.
  - An array-like object

  - Element.getElementsByTagName() is similar to Document.getElementsByTagName(), except that it only searches for elements 
    that are descendants of the specified element.

  Document.getElementsByClassName()
  - https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementsByClassName
  - Method of Document interface returns an array-like object of all child elements which have all of the given class name(s).
  - Acts on the entire document, starting at the document root.
  - Live HTMLCollection

  - Elements.getElementsByClassName() contains every descendant element which has the specified class name or names.

  ======= Creating =======

  Element.insertAdjacentHTML()
  - https://developer.mozilla.org/en-US/docs/Web/API/Element/insertAdjacentHTML
  - Method of the Element interface parses the specified text as HTML or XML and inserts the resulting nodes 
    into the DOM tree at a specified position.

  Document.createElement()
  - https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement
  - Method creates the HTML element specified by tagName ("div"), or an HTMLUnknownElement if tagName isn't recognized.

  ======= Adding =======

  Element.prepend()
  - https://developer.mozilla.org/en-US/docs/Web/API/Element/prepend
  - Method inserts a set of Node objects or string objects before the first child of the Element. 
    String objects are inserted as equivalent Text nodes.

  Element.append()
  - https://developer.mozilla.org/en-US/docs/Web/API/Element/append 
  - Method inserts a set of Node objects or string objects after the last child of the Element. 
    String objects are inserted as equivalent Text nodes.

  Node.cloneNode()
  - https://developer.mozilla.org/en-US/docs/Web/API/Node/cloneNode 
  - Method of the Node interface returns a duplicate of the node on which this method was called.
    Its parameter controls if the subtree contained in a node is also cloned or not.

  Element.before()
  - https://developer.mozilla.org/en-US/docs/Web/API/Element/before
  - Method inserts a set of Node or string objects in the children list of this Element's parent, just before this Element. 
    String objects are inserted as equivalent Text nodes.
  
  Element.after()
  - https://developer.mozilla.org/en-US/docs/Web/API/Element/after
  - Method inserts a set of Node or string objects in the children list of the Element's parent, just after the Element.

  ======= Deleting =======

  Element.remove()
  - https://developer.mozilla.org/en-US/docs/Web/API/Element/remove
  - Method removes the element from the DOM
*/

// 1. Selecting elements

// All documents of a webpage
console.log(document.documentElement);
console.log(document.head);
console.log(document.body);

// Elements
console.log(document.querySelector(".nav"));
const header = document.querySelector(".header");

// Multiple elements
const allSections = document.querySelectorAll(".section");
console.log(allSections); // Return nodelist of all elements which are a section

// Get element by id
console.log(document.getElementById("section--1"));

// Get all elements by tag name
console.log(document.getElementsByTagName("button")); 
// Because HTMLcollect is an array-like object we can loop with 'for of'
const allBtn = document.getElementsByTagName("button")
for (const btn of allBtn) {
  console.log(btn.outerText);
}

// Get all elements by className
console.log(document.getElementsByClassName("btn"));

// 2. Creating and inserting elements
// .insertAdjacentHTML (check bankist app)

const message = document.createElement("div"); 
message.classList.add("cookie-message");
// message.textContent = "We use cookies for improved functionality";
message.innerHTML = 'We use cookies for improved functionality <button class="btn btn--close-cookie">Got it!</button>';

// Add element at start of first child
// header.prepend(message);

// Add element at end of last child
header.append(message);

// We can only append or prepend once in a document, can use .cloneNode(true) to append or prepend multiples
// header.append(message.cloneNode(true));

// header.before(message);
// header.after(message.cloneNode(true));

// 3. Delete elements
/*
  Remember querySelectorAll returns a node list, which means we have to loop before adding an eventlistener

  document.querySelectorAll('.btn--close-cookie').forEach(item => {
    item.addEventListener('click', () => {
      message.remove();
    });
  });
*/

document.querySelector('.btn--close-cookie').addEventListener('click', () => {
  message.remove();
  // older way (DOM traversing)
  // message.parentElement.removeChild(message);
});

// ===================================================================================================================================