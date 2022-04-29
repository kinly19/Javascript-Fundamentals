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

Callback function 
- A function which is to be executed after another function has finished execution
*/

// Function stored in a variable
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
  return function () { 
    console.log("Hello!");
  };
}

// Call methods (bind) on functions
// counter.inc.bind(someOtherObject)

/*
Higher-Order function
- A function that receives another function as an argument, that returns a new function or both 
- This is only possible because of first-class functions

addEventListener is the higher-order function
btnClose.addEventListener("click", () => greet("adam"))

sayHello is the higher-order function
function sayHello() { 
  return function () { 
    console.log("Hello!");
  };
}
*/
// ==================================================================================================================================

// ============================================== Functions Accepting Callback Functions ============================================

// Example 1.
// Generic callback functions (first-class functions)
const oneWord = (str) => {
  return str.replace(/ /g, "").toLowerCase();
  // Remove all white space and lowercases everything
}

const upperFirstWord = (str) => {
  const [first, ...other] = str.split(" "); 
  // Split at each white-space and destructure ('first' is the first item inside array, 'other' will be an array filled with the ...rest of the remaining array elements from split() method)
  console.log(first)
  // apple
  console.log(other)
  // ['is', 'nice'] because of rest operator

  return [first.toUpperCase(), ...other].join(" ");
  // Take all elements inside the array and concate them together into a string with join()
}

// Higher order function
const transformer = (str, fn) => {
  console.log(`Original string: ${str}`);
  console.log(`Transformed string: ${fn(str)}`);

  // name property on 'fn.name' indicates the function's name as specified when it was created
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/name
  console.log(`Transformed by: ${fn.name}`);
}

transformer("Javascript is great", upperFirstWord);
// Transformed string: JAVASCRIPT is great
transformer("Javascript is great", oneWord);
// Transformed string: javascriptisgreat

// Example 2.
// Callback function
const capitalizeName = (str) => {
  return str[0].toUpperCase() + str.slice(1);
} 

const reverseName = (str) => {

  const string = [...str];
  const reverseString = [];
  
  for (let i = string.length -1; i >= 0; i--) {
    reverseString.push(string[i]);
  }

  return reverseString.join("");
}

// Cleaner
const reverseName2 = (str) => {
  const string = str.split("").reverse().join("");
  return string;
}

// Higher-order function
const greetPerson = (str, fn) => {
  console.log(`Hello ${fn(str)} javascript sends you some ❤`);
}

greetPerson("jennifer", capitalizeName);
// Hello Jennifer javascript sends you some ❤
greetPerson("jennifer", reverseName2);
// Hello refinnej javascript sends you some ❤

// ==================================================================================================================================

// ================================================= Functions Returning Functions ==================================================

const greet2 = function (greeting) {
  return function (name) {
    console.log(`${greeting} ${name}`)
  }
}

// 'greeterHey' value comes from a function 'greet2("hey") which we pass an arugment into, this function returns another function'.
// And it is this returned function that 'greeterHey' value will be and that is where we pass the arugment in for that return function to use
// hover over function names to see
// 'greeterHey' value is what the function 'greet2' returns. Which is just another function 

const greeterHey = greet2("Hey");
greeterHey("Alysia");
// Hey Alysia

// Arrow function for above
const greet3 = (greeting) => {
  return (name) => {
    console.log(`${greeting} ${name}`)
  }
}

/*
another way for arrow functions
const greet3 = greeting => name => console.log(`${greeting} ${name}`)
*/

const greeterHey2 = greet3("Hello");
greeterHey2("World");
// Hello World

// ==================================================================================================================================

// =================================================== The call and apply Methods ===================================================

/*
call() 
- Method calls a function with a given 'this' value and arguments provided individually.

apply() 
- Method calls a function with a given 'this' value, and arguments provided as an array... (or an array-like object).

* Using call() with spread operator does the same
*/

const lufthansa = {
  airline: "Lufthansa",
  iataCode: "LH",
  bookings: [],
  book(flightNum, name) {
    console.log(
      `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
    );
    this.bookings.push({flight: `${this.iataCode}${flightNum}`, name})
  },
};

const eurowings = {
  airline: "EuroWings",
  iataCode: "EW",
  bookings: [],
}

const swiss = {
  airline: "Swiss Air",
  iataCode: "LX",
  bookings: [],
}

lufthansa.book(239, "Imogen Poots");
lufthansa.book(536, "John Smith");
console.log(lufthansa.bookings);

// Reusing lufthansa book function
const book = lufthansa.book;

// Does not work the keyword this is undefined
// book(23, "Sarah Williams");

// Call Method
// Setting the 'this' keyword to use eurowings object
book.call(eurowings, 23, "Sarah Williams");
console.log(eurowings.bookings);

book.call(lufthansa, 536, "Lisa Smith");
console.log(lufthansa.bookings);

book.call(swiss, 355, "Jason Chan");

// Apply Method
const flightData = [778, "Alexa Cooper"];
book.apply(swiss, flightData);

/*
the spread operator does the exact same thing
book.call(swiss, ...flightData);
*/
console.log(swiss.bookings);

// ================================================================================================================================== 