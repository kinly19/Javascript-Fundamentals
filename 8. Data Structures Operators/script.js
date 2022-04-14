'use strict';

const restaurant2 = {
  name: "Classico Italiano",
  location: "Via Angelo Tavanti 23, Firenze, Italy",
  categories: ["Italian", "Pizzeria", "Vegetarian", "Organic"],
  starterMenu: ["Focaccia", "Bruschetta", "Garlic Bread", "Caprese Salad"],
  mainMenu: ["Pizza", "Pasta", "Risotto"],

  order: function (starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },

  // Destructuring directly within the function arguments (dont forget the Curly braces!)
  delivery: function ({ starterIndex, mainIndex, time, address }) {
    console.log(
      `Your starter of: ${this.starterMenu[starterIndex]} and your Main: ${this.mainMenu[mainIndex]}. 
      Should arrive at your location: ${address} at: ${time}.`
    );
  },

  // How you previously used destructuring in a function
  delivery2: function (obj) {
    const { starterIndex, mainIndex, time, address } = obj;
    console.log(
      `Your starter of: ${this.starterMenu[starterIndex]} and your Main: ${this.mainMenu[mainIndex]}. 
      Should arrive at your location: ${address} at: ${time}.`
    );
  },

  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },
};

// ====================================================== Arrays destructuring ======================================================
/*
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment

Destructuring - is an ES6 feature and it's basically a way of unpacking... values from an array or an object into separate variables.
Use [Sqaure brackets] for arrays
The original array is not affected, we are only unpacking it.
*/

const arr = [2,3,4];
// Without Destructuring
const a = arr[0];
const b = arr[0];
const c = arr[0];
// With Destructuring
const [d, e, f] = arr
console.log(d, e, f, "with array destructuring");

// Taking some elements (first and second items)
const [first, second] = restaurant2.categories;
console.log(first, second);

// Taking first and third items 
// We simply leave a hole in the destructuring operator, the second item in the array will be skipped
let [main, , secondary] = restaurant2.categories;
console.log(main, secondary);

// Mutating variables
/* Let's say that the owner of the restaurant now decided to switch the main and the secondary category
So right now the primary is 'Italian' and the secondary is 'vegetarian' but now they wanted to switch it.

const temp = main;
main = secondary;
secondary = main;
console.log(main, secondary);
*/

// Array destructuring we can do above like this
[main, secondary] = [secondary, main];
console.log(main, secondary);

// Destructuring return values from a function
const [starters, mainDish] = restaurant2.order(2,0);
console.log(`Your starter: ${starters} and your main: ${mainDish}`);

// Nested destructuring
const nested = [2, 4, [5, 6]];
const [i, , j] = nested;
console.log(i, j); // 2 [5, 6]

// Destructuring inside of destructuring.
const [A, , [innerA, innerB]] = nested
console.log(A, innerA, innerB); // 2 5 6

// Setting default values
// Example lets say we had an array which was shorter than we expected, we might try unpack the array in a position that doesnt exist

// Without default values
const randomArr = [8, 9];
const [g, h, k] = randomArr;
console.log(g, h, k) // 8 9 undefined
// With default values
const [G=1, H=1, K=1] = randomArr;
console.log(G, H, K); // 8 9 1

// ==================================================================================================================================

// ====================================================== Objects destructuring =====================================================
/* 
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment 

Use {Curly braces} for objects
Provide the variable names that exactly... match the property names that we want to retrieve from the object.
*/

// Without destructuring
const Name = restaurant2.name;
const OpeningHours = restaurant2.openingHours;
// With destructuring
const {name, openingHours, categories} = restaurant2;
console.log(name, openingHours, categories);

// Setting defualt values (for sun)
const {fri, sat, sun = {open: "Closed", close: "Closed"}} = openingHours; // Dont need to do restaurant2.openingHours because of line 126
console.log(fri, sat, sun);

// Nested objects
const {fri: {open, close}, sat: {open: satOpen, close: satClose}} = openingHours;
console.log(open, close,satOpen, satClose);

// Changing variable name
// Use the colon and specify a new name
const {thu: thursday} = openingHours;
console.log(thursday.open);

// Mutating variables
let x = 111;
let y = 999;
const obj = { x: 25, y: 15, z: 21 }; 

// when we start a line with a curly brace like below, JavaScript expects a code block
// {x, y} = obj; // returns syntax error

// Wrap destructuring assignmment inside parenthesis.
({x , y} = obj);
console.log(x, y); // x=25 y=15

// Passing an object into function for destructuring (see line 14)
restaurant2.delivery2({
  starterIndex: 2,
  mainIndex: 1,
  time: "19:30",
  address: "Via Angelo Tavanti 30, Firenze, Italy"
})
// ==================================================================================================================================

// ==================================================== The spread operator (...) ===================================================
/*
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax

Spread syntax (...)
Spread syntax can be used when all elements from an object or array need to be included in a list of some kind

The spread operator takes all the elements from the array and it also doesn't create new variables, we can only use it in places where we would otherwise 
write values separated... by commas.

*/

const arr1 = [7, 8, 9];
const arr2 = [10, 11, 12]; 

// Without spread operator
const newArr1 = [1, 2, arr1[0], arr1[1], arr1[2]];
console.log(newArr1);

const newArr2 = [1, 2];
arr1.map(item => newArr2.push(item));
console.log(newArr2);

// Spread operator
const newArr3 = [1, 2, ...arr1]; // expands 'arr1' array into all of its individual... elements
console.log(newArr3); // The whole array

// Whenever we need the elements of an array individually..., then we can use the spread operator.
console.log(...newArr3); // returns each item inside the array individually

// Create new array
const newArray = [...arr1, 5];
console.log(newArray);

// Copy an array (shallow copy); 
const arr1Copy = [...arr1]; 

// Join arrays
const arrJoin = [...arr1, ...arr2];
console.log(arrJoin);


// The spread operator works on all so-called iterables
// Iterables: arrays, strings, maps, sets, but not objects
const string = "Javascript";
console.log(...string); // J a v a s c r i p t 

// We can only use the spread operator when building an array, or when we pass values into a function.
// Example below wont work , because this (${...string}) is not a place that expects multiple values separated by a comma
// console.log(`${...string} is cool`) // returns error

// Multiple values separated by a comma are usually only expected when we pass arguments into a function, or when we build a new array.

// Functions
const printFavColor = (col1, col2, col3) => {
  console.log(`Your three favourite colors are: ${col1}, ${col2} and ${col3}`);
}

// const colors = [prompt("Lets get your favourite colors, Color 1"), prompt("Color 2"), prompt("Color 3")];
const yourColors = ["red", "Yellow", "Green"];
console.log(yourColors);

// Without spread operator, pass in each argument separately
printFavColor(yourColors[0], yourColors[1], yourColors[2]);

// Use spread operator to spread arguments
printFavColor(...yourColors);

// Objects
const obj1 = {
  firstName: "Alyssia",
  age: 30,
  occupation: "Developer"
}

// We can create a new object, use spread operator to spread each objects properties (copy all the properties from obj1 into this new object)
const obj2 = {...obj1, location: "London"};
console.log(obj2);
// obj2 {age: 30, firstName: "Alyssia", location: "London", occupation: "Developer"}

// Another example
let obj3 = { foo: 'bar', x: 42 };
let obj4 = { foo: 'baz', y: 13 };

let clonedObj = { ...obj1 };
// Object { foo: "bar", x: 42 }

let mergedObj = { ...obj1, ...obj2 };
// Object { foo: "baz", x: 42, y: 13 }

// ==================================================================================================================================

// =================================================== Rest Pattern and Parameters ==================================================
/*
The main difference between rest and spread is that the rest operator puts the rest of some specific user-supplied values into a JavaScript array. 
But the spread syntax expands iterables into individual elements.
*/

// Spread because right of assignment operator
const spread = [1, 2, ...[3, 4]];

// Rest because left of assignment operator
const [a1, b1, ...others] = [1, 2, 3, 4, 5];
console.log(a1, b1, others);
// 1 2 [3, 4, 5]

// Rest and Spread
// others = [3, 4, 5]
const [c1, c2, , ...more] = [...others, 6, 7, 8];
console.log(c1, c2, more);
// 3 4 [6, 7, 8]

// A rest element must be last in a destructuring pattern, cant do below
// const [...more, d1, d2 ] = [1, 2, 3, 4, 5];

// Objects 
// The remaining elements will be collected into a new object

const obj5 = {
  firstName: "Imogen",
  lastName: "Warren",
  age: 25,
  location: "London",
  canDrive: true,
}

const {firstName, lastName, age, ...travel} = obj5;
console.log(firstName, lastName, age, travel);
// Imogen Warren 25 {location: 'London', canDrive: true}

// Functions rest parameters
// This function will put all our arguments into an array for us
const add = (...numbers) => {
  let sum = 0
  for (let i = 0; i < numbers.length; i++){
    sum += numbers[i];
  }
  console.log(sum)
}

const values = [5, 5, 2];
add(2, 5, 3, ...values); // 22
add(...values); // 12 

// Same as above without the rest parameter, but we have to pass an array into the function arguments when calling
const add2 = (numArr) => {
  let sum = 0;
  for (let i = 0; i < numArr.length; i++) {
    sum += numArr[i];
  }
  console.log(sum);
}
add2(2, 4, 5) // 0
add2([2, 4, 5]); // 11

// ==================================================================================================================================

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },
};
