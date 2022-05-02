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

// ========================================================= The Bind Method ========================================================
/*
bind() 
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_objects/Function/bind
- Method creates a new function that, when called, has its this keyword set to the provided... value, 
  with a given sequence of arguments preceding any provided when the new function is called.
- A copy of the given function with the specified this value, and initial arguments (if provided).

- bind does not immediately call the function. Instead it returns a new function where this keyword is bound.
*/

const flightData2 = [583, "George Cooper"]; 

const bookEW = book.bind(eurowings);
bookEW(23, "Steven Williams");
// Steven Williams booked a seat on EuroWings flight EW23

// We can specify parts of the argument beforehand, is actually a common pattern called partial application.
const bookEW23 = book.bind(eurowings, 23);
bookEW23("Jonas Alexa");
console.log(eurowings.bookings);

// With event listeners
lufthansa.planes = 300;
// Creating a method inside lufthansa object
lufthansa.buyPlane = function () {
  console.log(this);
  this.planes++
  console.log(this.planes);
}

document.querySelector(".buy").addEventListener("click", lufthansa.buyPlane.bind(lufthansa));
// Returns NAN because the keyword 'this' inside an eventlistener points to the element on which that handler is attached too.
// We can use the bind method to bind what the keyword 'this' should point too.

// Partial application 
const addTax = (rate, value) => {
  return value + value * rate;
}

console.log(addTax(0.1, 200));

// We can now use the bind function on 'addTax' function and preset the rate argument.
const addVat = addTax.bind(null, 0.23);
console.log(addVat(100));

// The bind() method returns a new function 
// Below is like what bind does, a function which returns a function
const addTaxRate = (rate) => {
  return (value) => {
    console.log(value + value * rate);
  }
}

const addVat2 = addTaxRate(0.1);
addVat2(1000);
// ================================================================================================================================== 

// ======================================================= Coding Challenge #1 ======================================================
/*
Let's build a simple poll app!
A poll has a question, an array of options from which people can choose, and an 
array with the number of replies for each option. This data is stored in the starter 
'poll' object below.
Your tasks:
1. Create a method called 'registerNewAnswer' on the 'poll' object. The 
method does 2 things:
1.1. Display a prompt window for the user to input the number of the 
selected option. The prompt should look like this:
What is your favourite programming language?
0: JavaScript
1: Python
2: Rust
3: C++
(Write option number)
1.2. Based on the input number, update the 'answers' array property. For 
example, if the option is 3, increase the value at position 3 of the array by 
1. Make sure to check if the input is a number and if the number makes 
sense (e.g. answer 52 wouldn't make sense, right?)
2. Call this method whenever the user clicks the "Answer poll" button.
3. Create a method 'displayResults' which displays the poll results. The 
method takes a string as an input (called 'type'), which can be either 'string'
or 'array'. If type is 'array', simply display the results array as it is, using 
console.log(). This should be the default option. If type is 'string', display a 
string like "Poll results are 13, 2, 4, 1".
4. Run the 'displayResults' method at the end of each 
'registerNewAnswer' method call.
5. Bonus: Use the 'displayResults' method to display the 2 arrays in the test 
data. Use both the 'array' and the 'string' option. Do not put the arrays in the poll 
object! So what should the this keyword look like in this situation?

*/

const data1 = [5, 2, 2];
const data2 = [1, 5, 3, 9, 6, 1];

const poll = {
  question: "What is your favourite programming language?",
  options: ["0: JavaScript", "1: Python", "2: Rust", "3: C++"],
  // This generates [0, 0, 0, 0]. More in the next section!
  answers: new Array(4).fill(0),
  registerNewAnswer () {

    // Get answer
    const answer = Number(
      prompt(`${this.question} \n ${this.options.join("\n")} \n (Write option number)`)
    )
    console.log(answer)
    
    // Register answer
    typeof answer === "number" && answer < this.options.length && this.answers[answer]++;
    this.displayResults("string")
    this.displayResults()
  },

  displayResults (type = "array") {

  if (type === "string") {
    console.log(`Poll results are ${this.answers.join(", ")}`);
  } else
    console.log(this.answers);
  }

}

document.querySelector(".poll").addEventListener("click", poll.registerNewAnswer.bind(poll));
// document.querySelector(".poll").addEventListener("click", () =>  poll.registerNewAnswer())

// Changing this keyword with call
poll.displayResults.call({answers: data1}, "string")

// ================================================================================================================================== 

// ======================================== Immediately Invoked Function Expressions (IIFE) =========================================
/*
IIFE - Immediately Invoked Function Expression
- https://developer.mozilla.org/en-US/docs/Glossary/IIFE
- is a JavaScript function that runs as soon........... as it is defined.
*/

// 
const runOnce = () => {
  console.log("This will never run again");
}
runOnce();
// This function will only run once but we can always run this function again if we needed too.

// IIFE function
(() => {
  console.log("This will only run once and never again")
})();
// This IIFE function will actually execute immediately as soon as its defined 

// ================================================================================================================================== 