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
