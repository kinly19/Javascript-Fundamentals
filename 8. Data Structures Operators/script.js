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
const {fri, sat, sun = {open: "Closed", close: "Closed"}} = openingHours; // Dont need to do restaurant2.openingHours can point directly to the object
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
