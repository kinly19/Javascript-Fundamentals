'use strict';

/* ============================================================= Scoping =============================================================
https://developer.mozilla.org/en-US/docs/Glossary/Scope

Summary
- Scoping askes the question "Where do variables live" or "Where can we access a certain variable", and where not?. 
- There are 3 tpes of scope in javascript: the global, scopes defined by functions and scopes defined by blocks. 
- Only let and const variables are block-scoped. Variables declared with 'var' end up in the closes... function scope.
- in Javascript we have lexical scoping, so the rule of where we can access variables are based on exactly where in the 
  code functions and blocks are written.
- Every scope always has access to all the variables from all its outer scopes. This is the scope chain...
- When a  variable is not in the current scope, the engine looks up in the scope chain... until it finds the variable its looking for.
  This is called 'variable lookup'.
- The scope chain is a one-way street: a scope will never, ever have access to the variables of an inner scope

The 3 types of scope

1. Global scope
 - Outside of any function or block
 - Variables declared in global scope are accessible everywhere

2. Function scope
- Variables are accessible only... inside function, Not outside
- Also called local scope

3. Block scope
- Variables are accessible only inside block (block scoped)
- However - this only applies to let and const variables...
- Functions are also block scoped (only in strict mode...)

======================================================================================================================================*/

// calcAge function is defined in a - global scope
// calcAge function has its own scope
function calcAge (birthYear) {
  const age = 2022 - birthYear;
  /*
  Even though firstName variable isnt actually in the scope of the calcAge function, however because it is a global variable and
  through the scope chain it will be made available. (child scope can accesss parent scope)
  */
  console.log(firstName); 
  // console.log(lastName); // 'lastName' would not be found in the global scope and will return an error

  function printAge () {
    let output = `${firstName} You are ${age}, born in ${birthYear}`; // javascript will look for 'firstName' in the outer scope (global on line 81)
    const canAccessMe = "i am an outer scoped variable";
    console.log(output);

    if (birthYear >= 1981 && birthYear <= 1996) {
      var millenial = true;
      // Creating NEW variable with same name as outer scope's variable
      const firstName = "Alexa"; // the scope chain isn't necessary at all, if the variable that we're looking for is already in the current scope
      // Reassigning outer scope's variable
      output = "NEW OUTPUT";
      const str = `Oh, and you're a millenial, ${firstName}`;
      console.log(str);
      console.log(canAccessMe);

      function add (a, b) {
        return a + b;
      }
    }
    // console.log(str) // returns error because 'str' is inside a block scope, which is an inner scope of our 'printAge' 'function scope'
    console.log(millenial) // wont return an error, because var variable are 'function scoped' which still allows us to access 'millenial' even though it is inside an inner 'block scope'
    // add(3,2); // return error, functions are block scoped too, but only if 'strict mode' is applied
    // console.log(output); // NEW OUTPUT
  }

  /*
  When 'printAge' function is called, it will try and find the 'age' variable 'within' its own scope (current scope), if it cant find it there
  it will then look into its parents scope (calcAge). The same is true for the 'birthyear' variable, because for scoping the 'parameter' of a function 
  work just like normal variables.
  */

  printAge();
  return age;
}

// Global variable
const firstName = "Imogen";
console.log(firstName);

/*
When javascript excutes this function below, javascript will not find 'firstName' variable inside the scope of 'calcAge' function, it will then do a variable lookup and
lookup the 'scope chain' to see if it can find the variable there. 
Because firstName variable is in the global and the calcAge function is a child of the global scope (the parent scope of calcAge is the global) 
its able to find the variable there.
*/
calcAge(1990);

/* 
Things to remember is only an inner scope can have access to the variables of its outer scope, but not the other way around, same goes for functions too
we could not call 'printAge' function in the outter scope (global scope).
*/
// console.log(getAge); // return an error
// printAge(); // return an error


// Global scope
//  Child scope of its parent scope and a parent of its child scope
//    Child scope of its parent scope
