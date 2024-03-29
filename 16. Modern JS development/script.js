// ================================================  An Overview of Modules in JavaScript ============================================
/*
  Module
  - Reusable piece of code that encapsulates implementation details.
  - Usually a standalone file, but it doesnt have to be.
  - Can import and export (public api) values inside of modules from other modules.
  - We can write code without modules, with smaller applications, but as an application grows bigger, there are more advantages to
    using modules.
    1. Compose software: Modules are small building blocks that we put together to build complex applications.
    2. Isolate components: Modules can be developed in isolation without thining about the entire codebase.
    3. Abstract code: Implement low-level code in modules and import these abstractions into other modules.
    4. Organized code: Modules naturally lead to a more organized codebase.
    5. Reuse code: Modules allow u s to easily reuse the same code, even acrosss multiple projects.

  Navtive Javascript (ES6) Modules
  - Modules are stored in files, exactly one module per file.
  
  Difference between (ES6)Modules and Scripts
  ES6 module
  - Top-level variable: Scoped to module.
  - Default mode: Strict mode.
  - Top-level 'this': undefined.
  - Imports and Exports: Yes.
  - HTML linking: <script type="module">
  - File downloading: Asynchronous.

  Script
  - Top-level variable: Global
  - Default mode: "Sloppy mode"
  - Top-level 'this': window
  - Imports and Exports: No
  - HTML linking: <script>
  - File downloading: Synchronous.
*/
// ===================================================================================================================================

// ================================================ Exporting and Importing in ES6 Modules ===========================================

// To connect an imported module, we need to specify the script type within the HTML file (<script type="module" defer src="script.js"></script>)

// Importing module.
import { addToCart, totalPrice as price, tq } from './shoppingCart.js';
// (totalPrice as price) Changing the name of a named import.

console.log("Importing module");
/* console log returns
Exporting module
Importing module

All the code within script.js is parsed and before it is executed, any module
which it imports is executed first. (All imported modules (shoppingCart.js) are executed first).
If our imported module (shoppingCart.js) has a top level await it will code block script.js until it has finished the blocking code.
*/

// Variables within modules are scoped to the module unless we import them from the module (must be exported from the module itself too).
// console.log(shippingCode) // shippingCode is not defined
addToCart("Apple", 150);
console.log(price, tq);

// Import everything from a module (everything which has been exported from specified module).
import * as shoppingCart from './shoppingCart.js';
shoppingCart.addToCart("Orange", 250);

// Using Default exports
import add from './shoppingCart.js';
add("Lemon", 50);

/* 
We can also mix Default exports with Named exports but not advised.

import add, {totalPrice} from './shoppingCart.js';
add("Lemon", 50);
console.log(totalPrice);
*/

// ===================================================================================================================================

// ============================================== Top-Level await with modules only (ES2022) =========================================
/*
  Top-level await 
  - Allows us to use the await keyword outside of async functions (inside modules only). 
  - Will cause other modules who import them to wait before they start evaluating their body (code blocking with top-level await).
  - if one module imports a module which has a top-level await, then the importing module will wait for the imported module to finish the blocking code.
  - Note!: Top-level await only works at the top level of modules... only
*/

// Async Fetch function
const getLastPost = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  const data = await res.json();

  return { title: data.at(-1).title, text: data.at(-1).body };
  // Async functions always return a promise.
};

/* 
  Without top-level await
  Attempting to use an await outside of an async function results in a SyntaxError. Many developers utilized immediately-invoked 
  async function expressions as a way to get access to the 'await' feature.
*/
(async () => {
  // Await fetched data
  const lastPost2 = await getLastPost();
  // Do something with data
  console.log(lastPost2);
})();

// Top-level await allows us to do the same thing above without using an async function or IIFE in order to use 'await'. (modules only).
// This top-level await which is outside an async function will block the entire execution of this module so keep that in mind.
console.log("waiting fetch");
const lastPost = await getLastPost();
console.log(lastPost);
console.log("Fetched");

// ===================================================================================================================================

// ========================================================== The Module Pattern =====================================================
/*
  The Module Pattern is one of the important patterns in JavaScript. It is a commonly used Design Pattern which is used to wrap a set 
  of variables and functions together in a single scope. It is used to define objects and specify the variables and the functions 
  that can be accessed from outside the scope of the function.
*/

const shoppingCart2 = (() => {
  const cart = [];
  const shippingCost = 20;
  const totalQuantity = 23;
  // This variable is not exposed (returned) outside of this function (Private).
  const totalPrice = 250;

  const addToCart = (product, quantity) => {
    cart.push({ product, quantity });
    console.log(`${quantity} ${product} added to cart`);
  };

  const orderStock = (product, quantity) => {
    console.log(`${product} ${quantity} ordered from supplier`);
  };

  // Return an object (public api) in which we want to make pulic (accessible outside of this function).
  return {
    cart,
    shippingCost,
    totalQuantity,
    addToCart,
  };
})();

console.log(shoppingCart2); // object
shoppingCart2.addToCart("Mango", 75);
console.log(shoppingCart2.cart[0]);
// cant access private properties or functions outside of shoppingCart2
// console.log(shoppingCart2.totalPrice); // return undefined
// console.log(shoppingCart2.orderStock()); // return error
// ===================================================================================================================================

// ========================================================== Introduction to NPM ====================================================
/*
  What is NPM (Node Package Manager)
  - It is an online repository for the publishing of open-source Node.js projects.
  - A command-line utility for interacting with said repository that aids in package installation, version management
    and dependency management.
*/

/* 
  Installation
  1. Check if node is already installed with.
  node -v (not node-v -_-)

  2. Install node.js if not installed from below link.
  https://nodejs.org/en/

  Initialization
  1. For each project in which we want to use npm, we need to initialize it.
  npm init (follow setup info in terminal)

  2. Once above is done this creates a new file called 'package.json', this file stores the entire configuration of our project.
     Things like name of project, author, and all the dependencies needed for the project etc.

  Installing a library
  1. In the terminal install the package of your choice
  npm install nameOfLibraryhere
  or
  npm i nameOfLibraryhere

  2. This adds the library into our projects dependencies and creates a new folder 'node_modules'. This folder basically holds all 
  the code used/needed for all libraries used.


  Installing all dependencies from a projects (yours or someone elses) package.json file.
  npm install

*/

// Using a libray (import a method from lodash library)
import cloneDeep from './node_modules/lodash-es/cloneDeep.js';

// Example Copying objects (Shallow copy)
const state = {
  cart: [
    {product: "bread", quantity: 5},
    {product: "pizza", quantity: 5},
  ],
  user: {loggedIn: true},
}

const shallowClone = Object.assign(state);

console.log(state);
console.log(shallowClone);

// Changing a property from a shallow cloned object will change both objects (both objects point to the same object value in the heap).
shallowClone.user.loggedIn = false;

// Use cloneDeep function from 'lodash' library to help us make an actual deep copy of an object (This is hard expert stuff and we cant do it 😂😄😅🤣😥).
/*
  A deep copy of an object is a copy whose properties do not share the same references (point to the same underlying values) as the 
  actual object from which the copy was made.
*/
const deepClone = cloneDeep(state);
deepClone.user.loggedIn = true;
console.log(deepClone); 
// This deepClone object values now point to a different value (in the heap) from the object in which the copy was made from.
// ===================================================================================================================================

// ================================================= Bundling With Parcel and NPM Scripts ============================================
/*
  1. Adding a dev dependency (parcel)
  npm i parcel --save-dev

  - A dev (development) dependency is like a tool that we need to build our application. It is not a dependency which is included
    in our final code.

  2. Development/Bundling 
  Run parcel to bundle all our files within the terminal with npx
  npx parcel index.html

  or 

  Use npm scripts
  npm run start

  We can add the same command within a script and use npm to run that script which will run the command for us.
  "scripts": {
    "start": "parcel index.html"
  },

  This will bundle all our files together and run a local development server for us to use.
  https://parceljs.org/features/development/
  It also creates a 'dist' (distribution) folder, which will be the folder we use to send for production.

  3. Production/Building
  Using terminal 
  npx parcel build index.html

  or 

  Using npm scripts
  npm run build 

  This compresses all our files, includes many optimizations designed to reduce bundle sizes, including automatic minification
  tree shaking, image optimization, and more, for production.
  https://parceljs.org/features/development/
*/
// ===================================================================================================================================