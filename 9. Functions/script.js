'use strict';

// ======================================================== Default Parameters ======================================================
/*
What are Default Parameters
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Default_parameters
- Sometimes it's useful to have functions where some parameters are set by default. 
  This way we do not have to pass them in manually in case we don't want to change the default.
- Allow named parameters to be initialized with default values if no value or undefined is passed
- default values can contain any expression.
*/

const bookings = []

const createBooking = (
  // Default Parameters
  flightNum,
  numPassengers = 1,
  price = 199 * numPassengers // Can contain any expression 
) => {

  // ES5 setting default parameters
  // numPassengers = numPassengers || 1;
  // price = price || 199;

  const booking = {
    flightNum,
    numPassengers,
    price,
  };

  console.log(booking);
  bookings.push(booking);
};

// Without default parameters
createBooking("LH123");
// {flightNum: 'LH123', numPassengers: undefined, price: undefined}

// With default parameters
createBooking("LH123");
// {flightNum: 'LH123', numPassengers: 1, price: 199}

createBooking("LH123", 2);
// {flightNum: 'LH123', numPassengers: 2, price: 398}

// Overide default parameters
createBooking("LH123", 2, 500);
// {flightNum: 'LH123', numPassengers: 2, price: 399}

createBooking("LH123", undefined, 500);
// {flightNum: 'LH123', numPassengers: 1, price: 500}
// Skip a default parameter that we want to leave at its default with 'undefined'

// ==================================================================================================================================

// ========================================= How Passing Arguments Works: Value vs. Reference =======================================

const flight = "LH234";
const imogen = {
  name: "Imogen Polly",
  passportNum: 2456123456
}

const checkIn = (flightNum, passenger) => {
  flightNum = "LH999";
  passenger.name = "Ms." + passenger.name

  if (passenger.passportNum === 2456123456) {
    console.log("Checked in");
  } else {
    console.log("Wrong passport number");
  }
}

checkIn(flight, imogen);
console.log(flight);
// LH234
console.log(imogen);
// {name: 'Ms.Imogen Polly', passportNum: 2456123456}

/* 
flight is a primitive type, And as we passed that value into the 'checkIn' function then the 'flightNum' variable is basically just a copy
of that original value of 'flight'. This would be the same as writing flightnum = flight. 
Because flightNum is a completely different variable, And therefore, as we changed it inside the 'checkIn' function, 
it does not change the outside 'flight' variable.

With the 'passenger' object we do the exact same thing, but the object itself (imogen) actually changes. This happens because,
when passing a reference type to a function, what is copied is really just a reference... to that object in the memory heap. 
BUT they both point to the same object........ in memory. Which is why the changes reflect outside the function


*/


// ==================================================================================================================================









// ============================================== First-Class and Higher-Order Functions ============================================
/*
First-Class functions
- https://developer.mozilla.org/en-US/docs/Glossary/First-class_Function
- A programming language is said to have First-class functions when functions in that language are treated like any other variable. 
  For example, in such a language, a function can be passed as an argument to other functions 
  can be returned by another function and can be assigned as a value to a variable.
- Javascript treats functions as first-class citizens
- This means that functions are simple values
- Functions are just another 'type' of object

*/
// function stored in a variable
const add = (a, b) => {
  console.log(a + b)
}

const counter = {
  value: 23,
  inc: function () {
    this.value++;
  }
}

// Pass functions as arguments to OTHER functions
const greet = (person) => {
  console.log(`Hey ${person}`);
}
// btn.addEventListener("click", () => greet("Adam"));

// Return functions FROM functions
function sayHello() {
  return function() {
    console.log("Hello!");
  }
}

// Call methods on functions
// counter.inc.bind(someOtherObject)

/*
Higher-Order function
- A function that receives another function as an argument, that returns a new function or both 
- This is only possible because of first-class functions

*/

// ==================================================================================================================================

// ===============================================================  =============================================================
// ==================================================================================================================================
