'use strict';

///////////////////////////////////////
// Modal window

const section1 = document.querySelector("#section--1");
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnScrollTo = document.querySelector(".btn--scroll-to");
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

btnScrollTo.addEventListener("click", (e) => {
  const s1coords = section1.getBoundingClientRect();
  console.log("section1 bondingClient")
  console.log(s1coords);

  // Gives us the amount (offset) of how much X/Y has scrolled (scrollX , scrollY)
  console.log("current scroll X/Y:", window.pageXOffset, window.pageYOffset);

  // Give us the value of the viewport height and width of an element
  console.log("height/width viewport:", document.documentElement.clientHeight, document.documentElement.clientWidth);

  // Scrolling
  // Take the amount which has already been scrolled + the remaining amount for the element we want to scroll to, to reach the top
  // window.scrollTo(s1coords.left, s1coords.top + window.pageYOffset);

  // Using scrollTo options
  scrollTo({
    left: s1coords.left,
    top: s1coords.top + scrollY,
    behavior: "smooth"
  });

  // Modern (easier) way (only works in modern browsers)
  section1.scrollIntoView({behavior: "smooth"});
});

// Page navigation with Event delegation
document.querySelector(".nav__links").addEventListener("click", function (e) {
  e.preventDefault()

  if (e.target.classList.contains("nav__link")) {

    const section = e.target.getAttribute("href");
    document.querySelector(section).scrollIntoView({behavior: "smooth"})
  }
})

/*
  Without Event delegation
  This way is fine for a few links, but we are essentially adding the same event listener on each link.
  e.g if we had 100 links, that would be another 100 of the same eventlistener being added over and over.
  With event delegation approach, instead of adding one event listener to each of the child items, you only add 1 event listener to the parent <ul>.

  (React does event delegation for us behind the scenes)
  
  document.querySelectorAll(".nav__link").forEach(el => {
    el.addEventListener("click", function (e) {
      e.preventDefault()

      const id = this.getAttribute('href');
      document.querySelector(id).scrollIntoView({behavior: "smooth"});

      // Or this way using getBoundingClientRect()

      const section = document.querySelector(id).getBoundingClientRect();

      scrollTo({
        left: section.left,
        top: section.top + scrollY,
        behavior: "smooth",
      })
      
    })
  })
*/


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

// =========================================== Selecting, Creating, and Deleting Elements ============================================
/*
  Window.getComputedStyle()
  - https://developer.mozilla.org/en-US/docs/Web/API/Window/getComputedStyle
  - Method returns an object containing the values of all CSS properties of an element, after applying active stylesheets 
    and resolving any basic computation those values may contain.

  Element.getAttribute()
  - https://developer.mozilla.org/en-US/docs/Web/API/Element/getAttribute
  - Method of the Element interface returns the value of a specified attribute on the element.

  Data attributes
  - https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes
  - Allow us to store extra information on standard, semantic HTML elements without other hacks such as non-standard attributes, or extra properties on DOM.
*/


// const message = document.createElement("div"); 

// 1. Setting Styles (inline styling)
message.style.backgroundColor = "#37383d";
message.style.width = "120%";

// Reading styles
// Can only read styles which we have set ourselves using 'style' property 
console.log(message.style.height); // returns nothing
console.log(message.style.width); // 120%
console.log(message.style.backgroundColor); // rgb(55, 56, 61)

// Reading and setting styles with getComputedStyle
console.log(getComputedStyle(message).height); // 50px
message.style.height = Number.parseFloat(getComputedStyle(message).height) + 20 + "px";
console.log(getComputedStyle(message).height); // 50px + 20px = 70px

// Change css custom properties (Css variables)
document.documentElement.style.setProperty("--color-primary", "orangeRed");

// 2. Reading and setting attributes (default properties)
// Reading
const logo = document.querySelector(".nav__logo");
console.log(logo.alt); // Bankist logo
console.log(logo.src); // http://127.0.0.1:8080/img/logo.png (absolute URL)
console.log(logo.getAttribute("src")); // img/logo.png (Relative URL file path)

// Non-standard (properties which are not expected) wont work unless we use getAttribute
console.log(logo.designer);
console.log(logo.getAttribute("designer")); // Jonas

// Setting
logo.alt = "Beautiful minimalist logo"; 
console.log(logo.alt); // Beautiful minimalist logo
logo.setAttribute("company", "Bankist");

// Data attributes
console.log(logo.dataset.versionNumber);

// Classes
//  logo.classList.add("c", "f");
//  logo.classList.remove("c", "f");
//  logo.classList.toggle("c", "f");
//  logo.classList.contain("c", "f");

// Dont use
// logo.className = "Something"
// Doing it like this will overwrite any existing classes
   
// ===================================================================================================================================
   
// ================================================== Implementing Smooth Scrolling ==================================================
/*
  Element.getBoundingClientRect()
  - https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect 
  - Method returns a DOMRect object providing information about the size of an element and its position relative to the viewport.

  Window.pageXOffset
  - pageXOffset is an alias for scrollX

  Window.pageYOffset
  - pageYOffset is an alias for scrollY

  Element.clientHeight
  - https://developer.mozilla.org/en-US/docs/Web/API/Element/clientHeight
  - Read-only property is zero for elements with no CSS or inline layout boxes; otherwise, 
    it's the inner height of an element in pixels. It includes padding but excludes borders, margins, and horizontal scrollbars (if present)

  // Scrolling
  Window.scrollTo()
  - https://developer.mozilla.org/en-US/docs/Web/API/Window/scrollTo 
  - Scrolls to a particular set of coordinates in the document.

  Element.scrollIntoView()
  - https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView
  - Method scrolls the element's ancestor containers such that the element on which scrollIntoView() is called is visible to the user.
  - Scrolls the element we want into view
*/

/*
const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");

btnScrollTo.addEventListener("click", (e) => {
  const s1coords = section1.getBoundingClientRect();
  console.log("section1 bondingClient")
  console.log(s1coords);

  // Gives us the amount (offset) of how much X/Y has scrolled (scrollX , scrollY)
  console.log("current scroll X/Y:", window.pageXOffset, window.pageYOffset);

  // Give us the value of the viewport height and width of an element
  console.log("height/width viewport:", document.documentElement.clientHeight, document.documentElement.clientWidth);

  // Scrolling
  // Take the amount which has already been scrolled + the remaining amount for the element we want to scroll to, to reach the top
  // window.scrollTo(s1coords.left, s1coords.top + window.pageYOffset);

  // Using scrollTo options
  scrollTo({
    left: s1coords.left,
    top: s1coords.top + scrollY,
    behavior: "smooth"
  });

  // Modern (easier) way (only works in modern browsers)
  section1.scrollIntoView({behavior: "smooth"});
})
*/

// ===================================================================================================================================

// ================================================ Types of Events and Event Handlers ===============================================

/*
Different types of events
https://developer.mozilla.org/en-US/docs/Web/events#event_listing

Element: mouseenter event
- https://developer.mozilla.org/en-US/docs/Web/API/Element/mouseenter_event 
- mouseenter is fired at an Element when a pointing device (usually a mouse) is initially moved so that its hotspot 
is within the element at which the event was fired.
- Use the event name in methods like addEventListener(), or set an event handler property

addEventListner vs 'on' property
- https://thisthat.dev/add-event-listener-function-vs-on-property/
- You can add multiple handlers for an event with addEventListener
- The 'on' property or attribute only registers one... handler & will remove all existing handlers
- Able to remove handlers with addEventListener
*/


const h1 = document.querySelector('h1');
// Events below will run, once the cursor is within the element
h1.addEventListener('mouseenter', () => {
  console.log('Mouse entered h1 element...');
});

h1.addEventListener('mouseenter', () => {
  console.log('You have reached the h1 element');
});

/*
Attaching an event directly onto an element (without eventListener)
- This is an older way of doing it, although this may look similar to what we do in some frameworks
e.g - React: <button onClick={sayHello}>Hello</button>
the framework actually parses the code, and transpiles it to an addEventListener method
- https://thisthat.dev/add-event-listener-function-vs-on-property/
*/
h1.onmouseleave = () => {
  console.log('Mouse left h1 element...');
};

// Because the 'on' property only registers one handler, the event below will actually remove the one above it
h1.onmouseleave = () => {
  console.log('You left the h1 element');
};

// Removing events
const alertH1 = () => {
  alert("You are reading the h1 element");
  // Removing event
  h1.removeEventListener("mouseover", alertH1);
}

h1.addEventListener("mouseover", alertH1);

// ===================================================================================================================================

// ============================================= Event Propagation: Bubbling and Capturing ===========================================
/*
  Event Propagation
  - The flow of events traveling through the Document Object Model(DOM) tree from its parent right down to the target element 
    and then propagating back to its parent element.
  - Any other events on any parent element will also be invoked because of propagation.
  
  Three phases in a JavaScript event
   1. Event Capture Phase - Event propagated from the Window object towards the target element. (element which started the event)
   2. Event Target Phase - The event reaches the target element which started the event.
   3. Event Bubbling Phase - It is the reverse of the event capture phase. Event flows from the target element back up towards the Window object.
*/
// ===================================================================================================================================

// =================================================== Event Propagation in Practice =================================================

/*
  Event.stopPropagation()
  - https://developer.mozilla.org/en-US/docs/Web/API/Event/stopPropagation
  - Method of the Event interface prevents any further propagation of the current event in the capturing and bubbling phases.
*/

/*
  In the example below, the nav, nav__link and nav__links all have a simple 'click' event handler, which simply changes the background color
  this example will show us how event propagation works. 

  e.g clicking on nav__links will run its eventhandler, and then propagation will then run its parents eventhandlers and so on
  - 'nav__links' element event
  - 'nav__link' element event
  - 'nav' element event
*/

// Function for generating a random number
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

// Function for generating random rgb colors
const randomColor = () =>
  `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`;

console.log(randomColor(0, 255));

/* Arrow function with the keyword this
  The keyword 'this' with an arrow functions points to the window

  document.querySelector(".nav__link").addEventListener("click", () => {
    console.log(this); // this ---> window
    this.style.backgroundColor = randomColor() // returns an error
  })
*/


// When clicking on the nav__link element to fire of its event, this event goes through 3 phases
// 1. Event Capture ===> window
// 2. Event target
document.querySelector('.nav__link').addEventListener('click', function (e) {
  // The keyword this inside an eventlistner (when using a function defined with function keyword) always points to the element using that eventhandler (or window if not in strict mode)
  console.log(this); // this ---> .nav__link"
  console.log('LINK:', e.target);
  this.style.backgroundColor = randomColor();

  // Stopping event propagation (bubbling)
  // e.stopPropagation();
});

// 3 Event bubbling 
document.querySelector('.nav__links').addEventListener('click', function (e) {
  console.log('CONTAINER:', e.target);
  this.style.backgroundColor = randomColor();
});

document.querySelector('.nav').addEventListener('click', function (e) {
  console.log('NAV:', e.target);
  this.style.backgroundColor = randomColor();
});
// ===================================================================================================================================

// =========================================== Event Delegation: Implementing Page Navigation ========================================
/*
  - https://www.geeksforgeeks.org/event-delegation-in-javascript/
  - Event Delegation is basically a pattern to handle events efficiently. 
    Instead of adding an event listener to each and every similar element, we can add an event listener to a parent
*/

// Event delegation
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();

  if (e.target.classList.contains('nav__link')) {
    const section = e.target.getAttribute('href');
    document.querySelector(section).scrollIntoView({ behavior: 'smooth' });
  }
});

/*
  Without Event delegation
  This way is fine for a few links, but we are essentially adding the same event listener on each link.
  e.g if we had 100 links, that would be another 100 of the same eventlistener being added over and over.
  With event delegation approach, instead of adding one event listener to each of the child items, you only add 1 event listener to the parent <ul>.

  (React does event delegation for us behind the scenes)
  
  document.querySelectorAll(".nav__link").forEach(el => {

    el.addEventListener("click", function (e) {
      e.preventDefault()

      const id = this.getAttribute('href');
      document.querySelector(id).scrollIntoView({behavior: "smooth"});

      // Or this way using getBoundingClientRect()

      const section = document.querySelector(id).getBoundingClientRect();

      scrollTo({
        left: section.left,
        top: section.top + scrollY,
        behavior: "smooth",
      })
      
    })
  })
*/

// ===================================================================================================================================
