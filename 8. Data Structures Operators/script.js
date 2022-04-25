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

Destructuring 
- is an ES6 feature and it's basically a way of unpacking... values from an array or an object into separate variables.
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
Difference between rest and spread 
- The rest operator puts the rest of some specific user-supplied values into a JavaScript array. 
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

// =================================================== Short Circuiting (&& and ||) =================================================
/*
Short-circuiting 
- Means that if the first value is a truthy... value, it will immdediately return that first value 

Logical operators
- Use any data type
- Return any data type
- Short-circuiting
*/

/* Logical Or 
  - Returns the first true value of all operands
  - Or simply the last value if all of them are falsy.
*/

console.log(3 || "Sasha") // 3
console.log(0 || "Imogen"); // Imogen
console.log(true || 0); // True
console.log(undefined || null); // Null

// Hello is the first truthy value in the chain of OR operations
console.log(undefined || 0 || "" || "Hello" || 23 || null); // Hello

/* Logical AND
- Returns the first falsy value or the last value if all of the operands are truthy.
*/

// If the first value is falsy, it will immediately return the falsy value
console.log(0 && "Hello world"); // 0
// On a truthy value, the evaluation continues and returns value of last operand
console.log(25 && "Hello world"); // Hello world

console.log(true && false) // false
// The operator returns the value of the first... falsy operand
console.log("Hello" && 23 && null && "World"); // null 
console.log("Learning" && false && 0); //false


// ==================================================================================================================================

// ================================================= Nullish Coalescing Operator (??) ===============================================
/*
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing_operator

The nullish coalescing operator (??) 
- Is a logical operator that returns its right-hand side operand when its left-hand side operand is null or undefined,
  otherwise returns its left-hand side operand.
*/

// If we wanted to return the actual value of numGuest,
// Because the value of 'numGuest' is 0 (falsy value), in our Logical 'OR' expression it will short circuit and return 10 (truthy value. See line 331)
const numGuest = 0;
const guests = numGuest || 10;
console.log(guests) // 10

// Nullish coalescing operator allows us to return false only if the value is actually null or undefinded and not ("" or 0 )
// Only null or undefined will be considered falsy values
const numGuest2 = 0
const guest2 = numGuest ?? 10;
console.log(guest2); // 0 

// ==================================================================================================================================

// =================================================== Logical Assignment Operators =================================================
/*

The Logical OR assignment (||=)
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_OR_assignment
- (x ||= y) operator only assigns if 'x' is falsy. (if x is falsy it should return value of y)
- This operator only assigns a value to a variable if that variable is currently falsy

Logical nullish assignment (??=)
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_nullish_assignment
- The logical nullish assignment (x ??= y) operator only assigns if 'x' is nullish (null or undefined).
- If 'x' is nullish it should return value of y

- Logical AND assignment (&&=)
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_AND_assignment
- The logical AND assignment (x &&= y) operator only assigns if 'x' is truthy.
- If 'x' is truthy it should return value of y

*/

const rest1 = {
  name: "Capri",
  numGuest: 20,
}

const rest2 = {
  name: "La Piazza",
  owner: "Giovanni Rossi",
}

console.log(rest1.owner || rest1.name); // Capri
console.log(rest2.owner || rest2.name); // Giovanni Rossi

rest1.numGuest = rest1.numGuest || 10;
rest2.numGuest = rest2.numGuest || 10;
console.log(rest1.numGuest) // 20
console.log(rest2.numGuest) // 10

// Logical OR Assignment Operator
console.log(rest1.owner ||= rest1.name); // Capri
console.log(rest2.owner ||= rest2.name); // Giovanni Rossi
console.log(rest1.numGuest ||= 10); // 20
console.log(rest2.numGuest ||= 10); // 10

// Logical nullish assignment (??=)
console.log(rest1.owner ??= rest1.name); // Capri
console.log(rest2.owner ??= rest2.name); // Giovanni Rossi
console.log(rest1.numGuest ??= 10); // 20
console.log(rest2.numGuest ??= 10); // 10

// Logical AND assignment (&&=)
console.log(rest1.owner &&= "Anonymous"); // undefined
console.log(rest2.owner &&= "Anonymous"); // Anonymous

// ==================================================================================================================================

// =========================================================== Challenge #1 =========================================================
/*
Suppose we get data from a web service about a certain game (below). In this challenge we're going to work with that data.
Here are your tasks

1. Create one player array for each team (variables 'players1' and 
'players2')
2. The first player in any player array is the goalkeeper and the others are field 
players. For Bayern Munich (team 1) create one variable ('gk') with the 
goalkeeper's name, and one array ('fieldPlayers') with all the remaining 10 
field players
3. Create an array 'allPlayers' containing all players of both teams (22 
players)
4. During the game, Bayern Munich (team 1) used 3 substitute players. So create a 
new array ('players1Final') containing all the original team1 players plus 
'Thiago', 'Coutinho' and 'Perisic'
5. Based on the game.odds object, create one variable for each odd (called 
'team1', 'draw' and 'team2')
6. Write a function ('printGoals') that receives an arbitrary number of player 
names (not an array) and prints each of them to the console, along with the 
number of goals that were scored in total (number of player names passed in)
7. The team with the lower odd is more likely to win. Print to the console which 
team is more likely to win, without using an if/else statement or the ternary 
operator.
Test data for 6.: First, use players 'Davies', 'Muller', 'Lewandowski' and 'Kimmich'. 
Then, call the function again with players from game.scored   

*/
const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};


// 1.
const [players1, players2] = game.players;
console.log(players1);
console.log(players2);

// 2.
const [t1gk, ...t1FieldPlayers] = players1
const [t2gk, ...t2FieldPlayers] = players2
console.log(t1gk, t1FieldPlayers);

// 3.
const allPlayers = [...players1, ...players2];
console.log("All players: ", allPlayers);

// 4.
const players1Final = [...players1,"Thiago", "Coutinho", "Perisic"];
console.log(players1Final);

// 5.
const {odds: {team1, x: draw, team2}} = game
console.log(team1, draw, team2);

// 6.
const printGoals = (...players) => {
  for (let i = 0; i < players.length; i++) {
    console.log(`Player name: ${players[i]}`);
  }
  console.log(`Total goals: ${players.length}`);
}

printGoals(...players1);
printGoals(...game.scored);

// 7.
team1 < team2 && console.log("team 1 is more likely to win");
team1 > team2 && console.log("team 2 is more likely to win");

// ==================================================================================================================================

// ================================================== Looping Arrays: The for-of Loop ===============================================
/*
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of

for (variable of iterable) {
  statement
}

On each iteration a value of a different property is assigned to variable. variable may be declared with const, let, or var.
Variable is always the current element in each... iteration
Can still use the continue and break keywords.

The entries() method returns a new Array Iterator object that contains the key/value pairs for each index in the array.
*/

const menu1 = ['Apple pie', 'Spaghetti', 'Lasagna', 'Risotto']; 

// for loop
for (let i = 0; i < menu1.length; i++){
  console.log(`Count:${i + 1}`);
  console.log(menu1[i]);
};

/* 
for of loop
 - 'item' variable is always the current element in each iteration
*/
for (const item of menu1) {
  console.log(item);
}

for (const item2 of menu1.entries()) {
  console.log(`${item2[0] + 1}:${item2[1]}`);
  console.log(item2);
}

// entries () & Destructuring 
for (const [num, foodItem] of menu1.entries()) {
  // We can destructor directly above instead of below
  // const [num, foodItem] = item2;
  console.log(`${num + 1}: ${foodItem}`);
}

// ==================================================================================================================================

// ====================================================== Enhanced Object Literals ==================================================

const weekdays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

const hours = {
  thur: {
    open: 12,
    close: 22,
  },
  [weekdays[2 + 2]]: {
    open: 11,
    close: 23,
  },

  // We can now actually compute property... names instead of having to write them out manually and literally.
  [3 + 2]: {
    open: 0, 
    close: 24,
  },
};

console.log(hours)
// thur: {open: 12, close: 22}
// fri: {open: 11, close: 23}
// 5: {open: 0, close: 24}

const someObj = {

  hours: hours,

  welcome: function () {
    console.log("Hello world");
  }, 

  // With ES6 enhanced object literals, 
  /*
  If the property name is the same as the variable name in which we get our value from
  we can pass in the new object directly seen below.
  */
  hours,

  // No longer have to create a property, and then set it to a function expression
  welcome2 () {
    console.log("Hello world again");
  }

}

console.log(someObj.hours);
someObj.welcome();

// ==================================================================================================================================

// ======================================================= Optional Chaining (?.) ===================================================
/*
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining

The optional chaining operator (?.) 
- Enables you to read the value of a property located deep within a chain of connected objects without having to check that each
  reference in the chain is valid...
- Operator is like the . chaining operator, except that instead of causing an error... if a reference is nullish (null or undefined), 
  the expression short-circuits with a return value of undefined. (doesnt break your code)
- The optional chaining operator ?. takes the reference (value) to its left... and checks if it is undefined or null. 
  If the reference is either of these nullish values, the checks will stop and return undefined (but return if we have it)
*/

const person = {
  first: "Imogen",
  age: 2022 - 1990,
  occupation: {
    role: "Teacher",
    location: {
      building: "The lighthouse",
    },
  }
}

console.log(person.occupation.location.building) // London

// If we tried to access a nested objects property which did not exist
// console.log(person.occupation.office.room);
// Cannot read properties of undefined (reading 'room')

// We would have to check if 'occupation' object had an 'office' property 
// Might also want to check if we had 'occupation' also
if (person.occupation && person.occupation.office) {
  console.log(person.occupation.office.room)
}

// Optional Chaining
// Allow us to do the above in a more shorter and simpler way, Return the value of undefined instead of returning an error
console.log(person.occupation?.office?.room);
// Undefined

// Arrays 
const user = [{
  name: "Alyssia",
  email: "Hello@world.com"
}]

// console.log(user[1].name);
// Cannot read properties of undefined (reading 'name')

console.log(user[1]?.name || "User array empty");
// The OR operator '||' uses the right value if left is falsy, while the nullish coalescing operator '??' uses the right value if left is null or undefined
console.log(user[1]?.name ?? "User array empty");
// Undefined
console.log(user[0]?.name ?? "User array empty");
// Alyssia
// ==================================================================================================================================

// ========================================= Looping Objects: Object Keys, Values, and Entries ======================================

/*
Object.keys() 
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys
- This method returns an array of a given object's own enumerable property names..., iterated in the same order that a normal loop would.

Object.values() 
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/values
- This method returns an array of a given object's own enumerable property values

Object.entries()
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries
- This method returns an array of a given object's own enumerable string-keyed property [key, value] pairs (object property name and value).
*/

const restaurant3 = {
  name: 'Italiano',
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
      open: 0,
      close: 24,
    },
  },
}

// 1. Looping Property NAMES
const properties = Object.keys(restaurant3.openingHours);
console.log(properties);
// Returns all the property names... from 'openingHours' object in an array (see notes above)

// Building string
let openStr = `We are open ${properties.length} days a week on: `

// Below is the array which we get from Object.keys(restaurant3.openingHours) in which we then loop through 
for (const day of Object.keys(restaurant3.openingHours)) {
  openStr += `${day}, `;
}

console.log(openStr);
// We are open 3 days a week on: thu, fri, sat, 

// 2. Looping Property VALUES
const objValues = Object.values(restaurant3.openingHours);
console.log(objValues);
// Returns each objects properties VALUES inside of an array

for (const values of Object.values(restaurant3.openingHours)) {
  console.log(values);
}

// 3. Looping property NAME and VALUES (entries)
const objectEntries = Object.entries(restaurant3.openingHours);
console.log(objectEntries);
// Returns an array of each object properties key-value pairs 

// Looping through array with destructuring
for ( const [weekday, {open, close}] of Object.entries(restaurant3.openingHours)) {
  console.log(`On ${weekday} we open at ${open}, and close at ${close}`);
}
// ==================================================================================================================================

// =========================================================== Challenge #2 =========================================================
/*
Loop over the game.scored array and print each player name to the console, 
along with the goal number (Example: "Goal 1: Lewandowski")
2. Use a loop to calculate the average odd and log it to the console (We already 
studied how to calculate averages, you can go check if you don't remember)
3. Print the 3 odds to the console, but in a nice formatted way, exactly like this:
Odd of victory Bayern Munich: 1.33
Odd of draw: 3.25
Odd of victory Borrussia Dortmund: 6.5
Get the team names directly from the game object, don't hardcode them 
(except for "draw"). Hint: Note how the odds and the game objects have the 
same property names �
4. Bonus: Create an object called 'scorers' which contains the names of the 
players who scored as properties, and the number of goals as the value. In this 
game, it will look like this:
{
 Gnarby: 1,
 Hummels: 1,
 Lewandowski: 2
}
*/

const game2 = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

// 1. 
// for loop
for (let i = 0; i < game2.scored.length; i++) {
  console.log(`Goal ${i + 1}: ${game2.scored[i]}`);
}

// for of loop
for (const [index, playerName] of game2.scored.entries()) {
  console.log(`Goal ${index + 1}: ${playerName}`);
}

// 2.
const odds = Object.values(game2.odds);
let average = 0

for (const odd of odds) {
  average += odd
}

average /= odds.length;
console.log(average);

const entries = Object.entries(game2.odds);
console.log(entries);
// 3.
for ( const [team, odd] of Object.entries(game2.odds)) {
 

  const teamStr = team === "x" ? `Draw` : `Victory ${game2[team]}`;
  console.log(`Odds of ${teamStr} ${odd}`);
}

// ==================================================================================================================================

// =============================================================== Sets =============================================================
/*
The Set object
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set
- Lets you store unique values of any type, whether primitive values or object references.
- You can iterate through the elements of a set in insertion order
- A value in the Set may ONLY occur once; it is unique in the Set's collection.
*/ 

const ordersSet = new Set(["Pasta","Pizza","Pizza","Risotto","Pasta","Pizza"]);
console.log(ordersSet);
// {'Pasta', 'Pizza', 'Risotto'}

// Remove duplicate elements from the array 
const numArr = [2,3,4,4,2,3,3,4,4,5,5,6,6,7,5,32,3,4,5]; 
const setNumArr = [...new Set(numArr)];
console.log(setNumArr);
// [2, 3, 4, 5, 6, 7, 32]

// Relation with Strings
const myString = "Javascrip";
console.log(new Set(myString));
// {'J', 'a', 'v', 's', 'c', 'r', 'i', 'p', 't'}

// Get size of a set (like .length)
console.log(ordersSet.size);
// 3

// Check if an element is in a set
console.log(ordersSet.has("bread"));
// False
console.log(ordersSet.has("Pizza"));
// True

// Add elements to a set
ordersSet.add("Garlic Bread");
ordersSet.add("Garlic Bread");
console.log(ordersSet);
// {'Pasta', 'Pizza', 'Risotto', 'Garlic Bread'}
// Even though we added it twice, Set will ignore the duplicate

// Delete elements
ordersSet.delete("Risotto");
console.log(ordersSet);
// {'Pasta', 'Pizza', 'Garlic Bread'}

// Delete all
// ordersSet.clear();

// Getting an element from a Set 
console.log(ordersSet[0]);
// undefined
// in sets there are actually no indexes. And in fact, there is no way of getting values out of a set.

// If we wanted to remove duplicates and then throw the values into an array then we could retrive them normally 
const ordersSetArr = [...ordersSet];
console.log(ordersSetArr);
console.log(ordersSetArr[1]);
// Pizza

for (const set of ordersSet) {
  console.log(set);
}

// Example 
const staff = ["Waiter", "Chef", "Waiter", "Manager", "Chef", "Waiter"]; 
const staffUnique = [...new Set(staff)]; // spread operator works on all iterables.
const staffPosition = staffUnique.length;
console.log(staffUnique);
console.log(`Amount of positions: ${staffPosition}`);

/* Conclusion 
- Sets are not intended... to replace arrays at all.
- Now sets have this very useful property of being unique. And it's also very easy to interact with sets by using all of their straightforward methods. 
  However, they are not nearly as important as arrays.
- Good to know if you need them like the example above
*/
// ==================================================================================================================================

// =============================================================== Maps =============================================================
/*
The Map object
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map
- Holds key-value pairs and remembers the original insertion order of the keys. Any value (both objects and primitive values) may be used as either a key or a value.

- A data structure that we can use to map values... to keys... (like objects data is stored in key-paired values)
- The big difference between objects and maps is that in maps, the keys can have any... type and this can be huge.
- In objects, the keys are basically always strings. But in maps, we can have any type of key (object, array etc)

*/
// Creating a map, the easiest is to create an empty map. Then fill the map
const restMap = new Map();
restMap.set("name", "Classic dinner");
restMap.set(1, "London");
restMap.set(2, "Brighton");
// 'name' => 'Classic dinner', 1 => 'London', 2 => 'Brighton'

// Set
// Using set method, returns the updated map, which allows us to chain
restMap
  .set("categories", ["Italian", "Pizzeri", "Vegetarian", "Organic"])
  .set("starterMenu", [
    "Focaccia",
    "Bruschetta",
    "Garlic Bread",
    "Caprese Salad",
  ])
  .set(true, "We are open")
  .set(false, "We are closed")
  .set("open", 11)
  .set("close", 23);

console.log(restMap);
console.log(typeof restMap);

restMap.set(document.querySelector("h1"), "heading");
console.log(restMap.get(document.querySelector("h1")));
// Using a dom element as a key
// heading

restMap.set("getHeading", document.querySelector("h1").textContent);
console.log(restMap.get("getHeading"));
// Data Structures and Modern Operators
// Storing a dom element to a keys value

// Retrieving values 
console.log(restMap.get("categories")); // ['Italian', 'Pizzeria', 'Vegetarian', 'Organic']
const todaysSpecial = restMap.get("starterMenu")[2];
console.log(`Todays special: ${todaysSpecial}`);
// Garlic Bread

// Clever but not the most readable, dont go crazy with it
const time = 21;
console.log(restMap.get(time > restMap.get("open") && time < restMap.get("close")));

// Check
console.log(restMap.has("categories"));
// true

// Get Size (length)
console.log(restMap.size);
// 9

// ==================================================================================================================================

// ========================================================== Maps: Iteration =======================================================
/*

*/

// Another way of filling a map
const question = new Map([
  ["question", "What is the best programming language in the world"],
  // The first position of array is the key. The second position is the value.
  [1, "C"],
  [2, "Java"],
  [3, "Javascript"],
  ["correct", 3],
  [true, "Correct ✨🎉🎊"],
  [false, "Try again 😂"],
])

console.log(question);

// Iteration
// Destructure the array the for of loop gives us 
for (const [key, value] of question) {
  // Check if the key type is a number
  if (typeof key === "number") {
    //return
    console.log(value);
  }
}

// Convert object to map 
// Small trick whenever you need a map, when you already have an object.
const aPerson = {
  first: "Alex",
  last: "World"
}

const aPersonMap = new Map(Object.entries(aPerson))
console.log(Object.entries(aPerson))

/*
const aPersonArr = Object.entries(aPerson);
console.log(aPersonArr);
const aPersonMap = new Map(aPersonArr);
console.log(aPersonMap);
console.log(aPersonMap.get("first"))
console.log(aPersonMap)
*/

// Convert map to an array
const aPersonArr = [...question]
console.log([...question]);

/* 
Example using prompt to get users answer and to keep prompting for a correct answer 'while' user answer is false

const prompMsg = `${question.get("question")}? 
  1: ${question.get(1)} 
  2: ${question.get(2)}
  3: ${question.get(3)}`;

let userAnswer;
const correct = question.get("correct"); // 3

while (userAnswer !== correct){
  userAnswer = Number(prompt(prompMsg));

  if (userAnswer !== correct) {
    alert(question.get(false))
  }

  if (userAnswer === correct) {
    alert(question.get(true))
  }
}
*/

// ==================================================================================================================================

// ======================================================== Coding Challenge #3 =====================================================
/*
Create an array 'events' of the different game events that happened (no 
duplicates)
2. After the game has finished, is was found that the yellow card from minute 64 
was unfair. So remove this event from the game events log.
3. Compute and log the following string to the console: "An event happened, on 
average, every 9 minutes" (keep in mind that a game has 90 minutes)
4. Loop over 'gameEvents' and log each element to the console, marking 
whether it's in the first half or second half (after 45 min) of the game, like this:
[FIRST HALF] 17: ⚽ GOA
*/

const gameEvents = new Map([
  [17, '⚽ GOAL'],
  [36, '� Substitution'],
  [47, '⚽ GOAL'],
  [61, '� Substitution'],
  [64, '� Yellow card'],
  [69, '� Red card'],
  [70, '� Substitution'],
  [72, '� Substitution'],
  [76, '⚽ GOAL'],
  [80, '⚽ GOAL'],
  [92, '� Yellow card'],
  ]);

  // 1.
  const events = [...new Set(gameEvents.values())];
  console.log(events);

  // 2.
  console.log(gameEvents.delete(64));
  console.log(gameEvents);
  
  // 3.
  const eventTime = [...gameEvents.keys()];
  const fullTime = eventTime[eventTime.length - 1];
  console.log(`An event happened, on average every: ${Math.round(fullTime / gameEvents.size)} Min`);
 
  // 4.
  for (const [min, event] of gameEvents) {
    const half = min < 45 ? "FIRST HALF" : "SECOND HALF";
    console.log(`${half}: ${event}`);
  }

  // for (const [time, event] of gameEvents) {
  //   if (time <= 45) {
  //     console.log(`FIRST HALF : ${event}`)
  //   } else {
  //     console.log(`SECOND HALF : ${event}`)
  //   }
  // }

// ==================================================================================================================================

// =================================================== Working With Strings - Part 1 ================================================

/* 
Calling methods on strings
- JavaScript will automatically behind the scenes convert that string primitive to a string object with the same content. 
  And then it's on that object where the methods are called, this is why methods work on strings.
- This process is called 'boxing' because it basically takes our string and puts it into a box which is the object.
- Whenever we call a method on a string, once the operation is done the object is then converted back to a regular string primitive.

  console.log(new String("Javascript"));
  console.log(typeof new String("Javascript")); // Object
  console.log(typeof new String("Javascript").slice(1)) // String

*/

const airline = "TAP Air Portugal";
const plane = "A320";

// Get position of character in a string
console.log(plane[0]); // A
console.log(plane[3]); // 0
console.log("B737"[0]) // B

// Read string length
console.log(plane.length); // 4
console.log("String".length); // 6

// Get position of certain letter or word within a string
console.log(airline.indexOf("r")); // 6, spaces are included
console.log(airline.lastIndexOf("r")); // 10
console.log(airline.indexOf("Portugal")); // 8

// Methods
/*
slice() -
method returns a shallow copy of a portion of an array into a new array object selected from start to end
where start and end represent the index of items... in that array. The original array will not be modified.
*/
console.log(airline.slice(4)); // Air Portugal
// Stops one before index
console.log(airline.slice(4, 7)); // Air
console.log(airline.slice(0, airline.indexOf(" "))); // Tap
console.log(airline.slice(airline.lastIndexOf(" ") + 1)); // Portugal
// Define a negative begin argument
console.log(airline.slice(-2)); // al 
// Define a negative end argument
console.log(airline.slice(1, -1)); // AP Air Portuga


const checkMiddleSeat = (position) => {
  // B and E are middle seats
  const seat = position.slice(-1);
  if (seat === "B" || seat === "E") {
    console.log("You got the middle seat 😂");
  } else {
    console.log("You got lucky!");
  }
}


/*
includes() 
- Method determines whether an array includes a certain value among its entries, returning true or false as appropriate.
*/
const checkMiddleSeat2 = (position) => {
  // B and E are middle seats
  const seat = position.includes("E") || position.includes("B");
  if (seat) {
    console.log("You got the middle seat 😂");
  } else {
    console.log("You got lucky");
  }
}

const YourPosition = "11B";
checkMiddleSeat(YourPosition);
// You got the middle seat 😂
checkMiddleSeat2(YourPosition);
// You got the middle seat 😂

// ==================================================================================================================================

// =================================================== Working With Strings - Part 2 ================================================

const airline2 = "LHR London Heathrow";

// Methods
console.log(airline2.toLowerCase());
// lhr london heathrow
console.log(airline2.toUpperCase());
// LHR LONDON HEATHROW

// Fix capitalization in name
const passenger = "aLExa"; // should return Alexa

const passengerLower = passenger.toLowerCase(); // alexa
const passengerCorrect = passengerLower[0].toUpperCase() + passengerLower.slice(1); // A + lexa
console.log(passengerCorrect); // Alexa

// Function for above
const amendName = (name) => {
  const amendName = name[0].toUpperCase() + name.slice(1).toLowerCase(); // I + sabella
  return amendName;
}
console.log(amendName("ISabeLla")); // Isabella

// Comparing emails 
const email = "hello@world.io"; 
const loginEmail = "  Hello@world.Io \n";
console.log(loginEmail);

const amendEmail = (email) => {

 /* or
  const lowerEmail = email.toLowerCase();
  const trimmedEmail = lowerEmail.trim();
  return trimmedEmail
  */ 

  // const amendedEmail = email.trim().toLowerCase();
  const amendedEmail = email.toLowerCase().trim();
  // From es19 you can trim from the start or end - trimStart() or trimEnd()
  return amendedEmail;
}
console.log(amendEmail(loginEmail)); // hello@world.io

// Replace parts of strings
const priceGB = "288,97£"; 
const priceUS = priceGB.replace("£", "$").replace(",", ".");
console.log(priceUS); 

const announcement = "All passengers come to boarding door 23, boarding door 23";

// Only changes first instance
console.log(announcement.replace("door", "Gate"));
// All passengers come to boarding Gate 23, boarding door 23

// Replaces all instances
console.log(announcement.replaceAll("door", "Gate"));
// All passengers come to boarding Gate 23, boarding Gate 23

// Replace the whole string
console.log(announcement.replace(announcement, "boarding for gate 23 has changed to 25"));

// Using Regular expression
console.log(announcement.replace(/door/g, "Gate"));
// All passengers come to boarding Gate 23, boarding Gate 23


// Booleans
const plane2 = "Airbus A320neo";
console.log(plane2.includes("A320neo")); // True
console.log(plane2.includes("A320trio")); // False

console.log(plane2.startsWith("Air")); // True
console.log(plane2.startsWith("A320")); // False

if (plane2.startsWith("Airbus") && plane2.endsWith("neo")) {
  console.log("Part of the new Airbus family");
}

// Practice exercise 
const checkBaggage = (items) => {
 
  const baggage = items.toLowerCase();

  if (baggage.includes("knife") || baggage.includes("gun")) {
    console.log("You are not allowed to board");
  } else {
    console.log("Welcome on board!");
  }
}

checkBaggage("car batteries");
checkBaggage("i have a gun");


const checkBags = (items) => {
  // Take the string and put each word inside an item
  const passengerItems = [items.slice(" ")];
  console.log(passengerItems)
  const exclude = ["Knife", "Gun"];
  console.log(exclude);
}

checkBags("i have a gun");
// ==================================================================================================================================

// =================================================== Working With Strings - Part 3 ================================================

/*
split()
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split
- Method divides a String into an ordered list of substrings, puts these substrings into an array, and returns the array. 
  The division is done by searching for a pattern; where the pattern is provided as the first parameter in the method's call.
*/

console.log("a+very+nice+string".split("+"));
// ['a', 'very', 'nice', 'string']

console.log("Learning javascript is fun!".split(" "));
// ['Learning', 'javascript', 'is', 'fun!']

// Watch out for this one
console.log("Learning javascript is fun!".split(""));
// ['L', 'e', 'a', 'r', 'n', 'i', 'n', 'g', ' ', 'j', 'a', 'v', 'a', 's', 'c', 'r', 'i', 'p', 't', ' ', 'i', 's', ' ', 'f', 'u', 'n', '!']

// Destructuring 
const [userFirstName, userLastName] = "Imogen Poots".split(" ");
console.log(`Firstname: ${userFirstName} Lastname: ${userLastName}`);
// Firstname: Imogen Lastname: Poots


/*
join() 
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/join
- Method creates and returns a new string by concatenating all of the elements in an array (or an array-like object) 
  separated by commas or a specified separator string. If the array has only one item, then that item will be returned without using the separator.
*/

// Returns a new string by concatenating all of the elements in an array
const newName = ["Ms", userFirstName, userLastName.toUpperCase()].join(" ");
console.log(newName);
// Ms Imogen POOTS

// Function
const capitalizeName = (name) => {
  // create an array where each word is a separate item
  const nameSplit = name.split(" ");
  const capitalizeNameArry = [];

  for ( const n of nameSplit) {
    // loop through and push each word that has been capitalized
    capitalizeNameArry.push(n[0].toUpperCase() + n.slice(1));
  }

  return capitalizeNameArry.join(" ")
}
console.log(capitalizeName("jessica ann smith davis"));

// Another example from above
const capitalizeName2 = (name) => {
  const nameSplit = name.split(" ");
  const capitalizeNameArry = [];

  for ( const n of nameSplit) {
    capitalizeNameArry.push(n.replace(n[0], n[0].toUpperCase()));
  }

  return capitalizeNameArry.join(" ");
}

console.log(capitalizeName2("jessica ann smith davis"));

// Padding a string.
/*
padStart() 
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padStart
- Method pads the current string with another string (multiple times, if needed) until the resulting string reaches the given length. 
  The padding is applied from the start of the current string. 
- Add to the start of a string multiple times until a certain (defined length) string length is reached
*/

const message = "Go to gate 23";
console.log(message.padStart(25, "+")); // add '+' multiple times until the strings length is 25
// ++++++++++++Go to gate 23 
console.log("hello".padStart(25,"♥"));
// ♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥hello

console.log("hello".padStart(25, "♥").padEnd(30, "☻"));
//♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥hello☻☻☻☻☻


const maskCredit = (number) => {
  // when one of the operands of the plus sign is a string it will convert all the operands to a string
  const string = number + "";
  console.log(string);

  /* 
  This is hard coded for 16digits sliced from index of 12 to get last 4 digits
  If we had a card number which was 19 digits it will show the last 7 digits instead
  
  const maskedString = string.slice(12).padStart(string.length, "*") 
  */

  // more dynamic
  const maskedString = string.slice(-4).padStart(string.length, "*");
  
  return maskedString;
}

console.log(maskCredit(4526452641254125));
// ************4125
console.log(maskCredit(4245564));
// ***5564

// Repeat 
/*
repeat() 
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/repeat
- Method constructs and returns a new string which contains the specified number of copies of the string on which it was called, concatenated together.
*/

const chorus = "Because I\'m happy. ";
console.log(`Chorus lyrics: ${chorus.repeat(25)}`) // logs chorus 25 times

const planesInLine = (amount) => {
  console.log(`There are ${amount} planes in the sky ${"✈".repeat(amount)}`)
}

planesInLine(5); // There are 5 planes in the sky ✈✈✈✈✈
planesInLine(3); // There are 3 planes in the sky ✈✈✈


// ==================================================================================================================================

// =========================================================== Challenge #4 =========================================================
/*
Write a program that receives a list of variable names written in underscore_case 
and convert them to camelCase.
The input will come from a textarea inserted into the DOM (see code below to 
insert the elements), and conversion will happen when the button is pressed.
Test data (pasted to textarea, including spaces):
underscore_case
first_name
Some_Variable 
 calculate_AGE
delayed_departure
Should produce this output (5 separate console.log outputs):
underscoreCase ✅
firstName ✅✅
someVariable ✅✅✅
calculateAge ✅✅✅✅
delayedDeparture ✅✅✅✅✅
Hints:
§ Remember which character defines a new line in the textarea �
§ The solution only needs to work for a variable made out of 2 words, like a_b
§ Start without worrying about the ✅. Tackle that only after you have the variable 
name conversion working �
§ This challenge is difficult on purpose, so start watching the solution in case 
you're stuck. Then pause and continue!
Afterwards, test with your own test data
*/


document.body.append(document.createElement('textarea'));
document.body.append(document.createElement('button'));


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
