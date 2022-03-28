// =================================================== Functions ===================================================
/*
Functions in simple, are blocks of code that can be reused over and over.
*/

// Example a simple logger function, that can be used to log a persons name.

//Es5
function logger2() {
  console.log("My name is alexis");
}

//Es6
const logger = () => {
  console.log("My name is alexa");
};

// To use the function (calling/running/invoking the function) we use the functions name and () parenthesis
// each time we call the function, the code inside that function will be executed.
logger2();
logger();
logger();
logger();

// Functions are able to receive data and return data back.

// Example 1.
// This function has a parameter 'name' that will be used inside of this function which returns a console.log
const logUserName = (name) => {
  console.log(`My name is ${name}`);
};

// Prompt used to get users name and stored in a variable
const personName = prompt("Please type in your first name");

// When calling the function we pass in 'personName' variable as an argument for our function to use.
logUserName(personName);

// Example 2.
const fruitProcesssor = (applesQty, orangesQty) => {
  const fruit = `Juice with ${applesQty} apples and ${orangesQty} oranges`;
  return fruit;
};

// Storing the return value from our function (fruit)
const appleJuice = fruitProcesssor(5, 0);
// Using stored value from function (appleJuice)
console.log(appleJuice);

// =================================================================================================================

// ===================================== Function Declarations vs. Expressions =====================================

// Function declaration
function calcAge(birthYear) {
  return 2037 - birthYear;
}

const age1 = calcAge(1991);
console.log(age1);

// Function expression
const calcAge2 = function (birthYear) {
  return 2037 - birthYear;
};

const age2 = calcAge2(1991);
console.log(age2);

/* 
What is the difference ? 
1. Function declarations can be called before they are defined... in the code (because of Hoisting).

2. Function expressions have to be defined first... before calling them.

The type of function you use is really down to personal preference.

*/
// =================================================================================================================

// ================================================ Arrow functions ================================================
/*
Es6 arrow function - simply a special form of function expression that is shorter and therefore faster to write.
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions
// Does not have its own bindings to this or super, and should not be used as methods.
*/

// Function expression
const calcAge3 = function (birthYear) {
  return 2037 - birthYear;
};

// Arrow function
// we can omit the parenthesis if we only have one argument and the curly braces with implicit returns if the body only contains a single expression
const calcAge4 = (birthYear) => 2037 - birthYear;

// If you have multiple arguments or no arguments you need to use parenthesis around the arguments
// If the body of the function requires additional lines of processing we have to use the curly braces {} and the 'return'

// Example 1.
const yearsUntilRetirement = birthYear => {
  // Only one argument so no parenthesis needed
  const age = 2037 - birthYear;
  const retirement = 65 - age;

  return retirement;
};

console.log(`Years until retirement: ${yearsUntilRetirement(1991)}`);

// Example 2.
const yearsUntilRetirement2 = (birthYear, firstName) => {
  // Multiple arguments parenthesis needed
  const age = 2037 - birthYear;
  const retirement = 65 - age;

  return `${firstName} retires in: ${retirement} years`;
};

console.log(yearsUntilRetirement2(1991, "Alexa"));
console.log(yearsUntilRetirement2(2000, "Neo"));

// Check link for the Differences betwen arrow functions and traditional function expression.
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions
// =================================================================================================================

// ======================================= Functions calling other functions =======================================
// Using one function to call another function

// Example 1.
// 'addTip' function will take an 'amount' as an argument, and then return the amount of tip that should be added.
const addTip = (amount) => {
  return (15 / 100) * amount;
};

/* 
'addTotalBill' function will return the total amount which should be paid including tip
'addTotalBill' function takes 'total' as an argument
and has a variable called 'totalBill' which its value is: the value returned from our 'addTip' function call + the 'total'. 
*/

const addTotalBill = (total) => {
  const totalBill = addTip(total) + total; // calling another function

  return `Your total bill including tip: ${totalBill}`;
};

// Calling function
console.log(addTotalBill(150));

// =================================================================================================================

// =================================================== Exercise ===================================================

// Create a function which calculates a teams average score
// Create a function which checks which team wins, but only wins if their avg score is double than the other teams avg score

const calcAverage = (a, b, c) => (a + b + c) / 3;

const checkWinner = (team1, team1Data, team2, team2Data) => {
  // Win only if team1 score is double than team2
  if (team1Data >= team2Data * 2) {
    console.log(`${team1} wins 🎉 (${team1Data} - ${team2Data})`);
  } else if (team2Data >= team1Data * 2) {
    console.log(`${team2} wins (${team2Data} - ${team1Data})`);
  } else {
    console.log(`No winners 😂`);
  }
};

// const scoreDolphines = calcAverage(44, 23, 71); //46
const scoreDolphines = calcAverage(85, 54, 41); //60

// const scoreKoalas = calcAverage(65, 54, 49); //56
const scoreKoalas = calcAverage(23, 34, 27); //28

checkWinner("Dolphines", scoreDolphines, "Koalas", scoreKoalas);

/*
// being extra now
const calcAverage = (a, b, c) => (a + b + c) / 3;

const checkWinner = (data1, data2) => {
  // object destructuring
  const {name: teamA, avgScore: teamAScore} = data1; // teamA = data1.name
  const {name: teamB, avgScore: teamBScore} = data2;

  if (teamAScore >= teamBScore * 2 ) {
    console.log(`Team ${teamA} wins (${teamAScore} - ${teamBScore})`);
  } else if (teamBScore >= teamAScore * 2) {
    console.log(`Team ${teamB} wins (${teamBScore} - ${teamAScore})`);
  } else {
    console.log("No teams win");
  }
};

const Dolphines =  {
  name: "Dolphines",
  // avgScore: calcAverage(85, 54, 41)
  avgScore: calcAverage(44, 23, 71)
}

const Koalas = {
  name: "Koalas",
  // avgScore: calcAverage(23, 34, 27)
  avgScore: calcAverage(65, 54, 49)
}

checkWinner(Dolphines, Koalas);

*/

// =================================================================================================================

// ================================================ Intro to Arrays ================================================
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array#examples

// Lets store each friend in a variable, if we had multiple variables for each friend (eg.50 friends) this can become very cumbersome.
const friend1 = "Michael";
const friend2 = "Steven";
const friend3 = "Peter";
console.log(friend1);

// This is where data structures in javascript come in handy
// Arrays - enables storing a collection of multiple items under a single variable name.

// Different ways of creating an array
//1. Using array literal notation
const friendsList = ["Michael", "Steven", "Peter"];
console.log(friendsList);
// our 'friendsList' variable stores the exact same names as above but stored all in one single variable.

//2. Using the Array() constructor
const years = new Array(1991, 2021, 2022, 1989, 1975);
console.log(years);

//3. String.prototype.split()
const fruit = "Apple, Orange, Lemon".split(", ");
console.log(fruit);

// Access an array item by its index (specifying the index number of their position in the array)
console.log(friendsList[0]); // Michael
console.log(friendsList[2]); // Peter
console.log(fruit[fruit.length - 1]); // Lemon

// Get the number of items inside of an array
console.log(friendsList.length);
console.log(fruit.length);

// Mutate an item inside of array with bracket notation
// In JavaScript, arrays aren't primitives which allow us to mutate values (All primitives are immutable, cannot be altered)
friendsList[0] = "Alysia";
console.log(friendsList);

// Storing different value types
const lastName = "Poots";
const imogen = ["Imogen", lastName, 2022 - 1989, friendsList]; // in each position javascript expects an expression which allows us to do (2022 - 1989) which would return 33
console.log(imogen);
console.log(imogen[3][2]); // friendlist // peter

// Exercise
// use calcAge5 function to get age
const calcAge5 = (birthYear) => 2022 - birthYear;

const age3 = calcAge5(years[0]);
const age4 = calcAge5(years[4]);
console.log(age3, age4);

const ages = [calcAge5(years[0]), calcAge5(years[4]), calcAge5(years[1])];
console.log(ages);

// Basic methods
const boroughs = ["Islington", "Enfield"];
console.log(boroughs);

// Add a new item at the end of an array with 'push'
boroughs.push("Croydon");
console.log("add new item to array", boroughs);
// Push method also returns a value of the length of the array
const newLength = boroughs.push("Hackney");
console.log(newLength);

// Add a new item at the start of an array with 'unshift'
boroughs.unshift("Camden");
console.log(boroughs);

// Remove an item from the end of array
// Pop method also returns the element which was removed
const removedItem = boroughs.pop(); // last element
console.log(`${removedItem} was removed from the list`, boroughs);

// Remove first item from array with 'shift'
// Shift method also return the element which was removed
const shiftItem = boroughs.shift();
console.log(`${shiftItem} was removed from the list`, boroughs);

// Find the index of an item in an array with 'indexOf'
console.log(boroughs.indexOf("Candem")); // -1 - means this item does not exist in array
console.log(boroughs.indexOf("Islington")); // 0

// Same as 'indexOf' but determines whether the array contains a value, returning true or false
console.log(boroughs.includes("Enfield"));
console.log(boroughs.includes("Hackney"));

// =================================================================================================================

// ================================================ coding challenge ===============================================
// Create a function to calculate amount of tip to pay, 15% if value is less than 50 and 300 otherwise 20%
// Create a bill List array
// Create an array list of tips
// Create an array list of (total + tips)

const calcTip = (value) =>
  value >= 50 && value <= 300 ? 0.15 * value : 0.2 * value;
// Or
const calcTip1 = (value) => {
  if (value >= 50 && value <= 300) {
    return value * 0.15;
  } else {
    return value * 0.2;
  }
};
// Or
const calcTip2 = (value) => {
  let tipRate;

  if (value >= 50 && value <= 300) {
    tipRate = 15;
  } else {
    tipRate = 20;
  }

  const tipTotal = (tipRate / 100) * value;
  return tipTotal;
};

const billList = [125, 555, 44];
const tipsList = [
  calcTip(billList[0]),
  calcTip(billList[1]),
  calcTip(billList[2]),
];

// This isnt very dry
const totalWithTip = [
  billList[0] + tipsList[0],
  billList[1] + tipsList[1],
  billList[2] + tipsList[2],
];

console.log(`bill amounts`, billList);
console.log("total bill with tip", totalWithTip);
console.log("amount of tips 🧾", tipsList);

// Using map function to iterate through bills array and create an array with values returned from calcTip function
const tipsList2 = billList.map((tipItem) => calcTip(tipItem));

const total = billList.map((total) => {
  const totalAmout = total + calcTip(total);
  return totalAmout;
});

console.log(`total bill amount including tip`, total);
console.log(`amount of tips 🧾`, tipsList2);

// =================================================================================================================

// ================================================ Intro to objects ===============================================
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object
/*
The Object class represents one of JavaScript's data types. 
It is used to store various keyed collections (name: "im a name") and more complex entities.
*/

// Each key is a property
// Each property has its own value

// Object literal syntax
const imogen1 = {
  firstName: "Imogen",
  lastName: "Poots",
  birthYear: 1989,
  job: "actor",
  friends: ["Michael", "Peter", "Steven"],
  hasLicense: true,

  calcAge: function () {
    return 2022 - this.birthYear;
  }, // function value

  calcAge1: function () {
    // instead of running a function all the time to return a value, we can store the value inside of a new property instead
    this.age = 2022 - this.birthYear;
    return this.age;
  },

  calcAge2: () => 2022 - this.birthYear, // arrow function will return nan go to line 85

  canDrive: function () {
    return `${this.firstName} is ${this.calcAge1()} years old and ${
      this.hasLicense ? "can drive 🚗" : "can not drive 🚶‍♀️"
    }`;
  },
};

// Object() constructor
const imogen2 = new Object();
imogen2.firstName = "Imogen";
imogen2.lastName = "Poots";
console.log(imogen2);

// Retrive data with 'dot notations'
console.log(imogen1.firstName, imogen1.lastName);
// Retrive data with 'bracket notation'
console.log(imogen1["firstName"]);

/* The difference between bracket notation and dot notation is 
in the bracket notation, we can actually put any expression... that we'd like,
so we don't have to explicitly write the string here, but instead we can compute it from some operation
*/

// Example
// Bracket notation
const nameKey = "Name";
console.log(imogen1["first" + nameKey]);
console.log(imogen1["last" + nameKey]);
//template literals
console.log(imogen1[`first${nameKey}`]);

// Dot notation
// This will not work
// console.log(imogen."first" + nameKey);

const interestedIn = prompt(
  "What do you want to know about Imogen? Choose between firstName, lastName, age, job and friends"
);
if (interestedIn) {
  console.log(imogen1[interestedIn]); // bracket notation allows us to use an expression (value of interestedIn)
} else {
  console.log(
    "Wrong request, Choose between firstName, lastName, age, job and friends"
  );
}

// Add new properties to an object
imogen1.location = "South London";
imogen1["instagram"] = "@impoots";
console.log(imogen1);

// Mixing all
console.log(
  `${imogen1.firstName} has ${imogen1.friends.length} friends and her best friend is called ${imogen1.friends[2]}`
);

// Methods
console.log(imogen1.calcAge()); // any function that is attached to an object is a method
console.log(imogen1.calcAge());
console.log(imogen1.calcAge());

/*
 Instead of calling calcAge function to return an age everytime we needed it (seen above)
 we can have a function that will store the returned value into a new property (line 383)
 so we would only have to call the function (calcAge1) once and then use the objects property 
*/

imogen1.calcAge1();
console.log(imogen1.age);
console.log(imogen1.age);
console.log(imogen1.age);

// Test
console.log(imogen1.canDrive());

// Exercise
const mark = {
  fullName: "Mark Miller",
  height: 1.69,
  weight: 78,
  calcBmi: function () {
    return (this.bmi = this.weight / (this.height * 2));
  },
};

const john = {
  fullName: "John Smith",
  height: 1.95,
  weight: 92,
  calcBmi: function () {
    return (this.bmi = this.weight / (this.height * 2));
  },
};

if (mark.calcBmi() > john.calcBmi()) {
  //calcBMI will return an expression (bmi = this.weight / (this.height * 2))
  console.log(
    `${mark.firstName} bmi (${mark.bmi}) is higher than ${john.firstName} bmi (${john.bmi})`
  );
} else {
  console.log(
    `${john.fullName} bmi (${john.bmi}) is higher than ${mark.fullName} bmi (${mark.bmi})`
  );
}

// =================================================================================================================

// ============================================= Iteration The for Loop ============================================

/*
Loops are a fundamental aspect of every programe lanague
they basically allow us to automate repetitive tasks.
*/

console.log("lifting weights rep 1 🏋️‍♂️");
console.log("lifting weights rep 2 🏋️‍♂️");
console.log("lifting weights rep 3 🏋️‍♂️");

// If we wanted to log each rep seen above it is not very dry, this is where loops are handy

/* 
For loop

for ([initialExpression]; [conditionExpression]; [incrementExpression])
  statement
*/

for (let rep = 1; rep <= 10; rep++) {
  console.log(`lifting weights rep ${rep} 🏋️‍♂️`);
}

// Example 1.
// logging all elements inside of an array
const jakesArray = [
  "Jake",
  "Smith",
  2022 - 1990,
  "Dev",
  ["michael", "Peter", "Steven"],
];

const types = [];
const types2 = [];

for (let i = 0; i < jakesArray.length; i++) {
  // Reading from jakesArray
  console.log(jakesArray[i], typeof jakesArray[i]);

  // Filling types array
  types[i] = typeof jakesArray[i]; // types at position of [i]

  // Filling type array with push method
  types2.push(typeof jakesArray[i]);
}

console.log(types);
console.log(types2);

// Example 2.
const birthYears = [1991, 2007, 1969, 1985, 1989];
const birthAge = [];

for (let i = 0; i < birthYears.length; i++) {
  birthAge.push(2022 - birthYears[i]);
}

console.log(` All ages: ${birthAge}`);

// For loop continue and break
// Continue - Is to exit (skip) the current iteration of the loop and continue to the next one

console.log("--- Only Strings ---");
const imogenArray = [
  "Imogen",
  "Poots",
  2022 - 1989,
  "Actor",
  ["Michael", "Damien", "Jake"],
];

for (let i = 0; i < imogenArray.length; i++) {
  // Only log types which are strings to the console
  // Continues for types that are strings and exits (skips) for types which are not strings
  if (typeof imogenArray[i] !== "string") continue;
  console.log(imogenArray[i]);
}

// Break - Is used to terminate the whole loop
console.log("--- Break on number ---");

// Terminate loop if a type of number is found
for (let i = 0; i < imogenArray.length; i++) {
  if (typeof imogenArray[i] === "number") break;
  console.log(imogenArray[i]);
}

// =================================================================================================================

// ====================================== Looping backwards and loops in loops =====================================
console.log("--- Looping backwards ---");
const alexaArray = [
  "Alex",
  "Smith",
  2022 - 1989,
  "Actor",
  ["Michael", "Damien", "Jake"],
];

for (let i = alexaArray.length - 1; i >= 0; i--) {
  console.log(alexaArray[i]);

  /* Position of i starts at alexaArray.length (5 - 1)
  console.log(alexaArray[4])
  console.log(alexaArray[3])
  console.log(alexaArray[2])
  console.log(alexaArray[1])
  console.log(alexaArray[0])
  */
}

// Loops inside of loops
console.log("--- Loop inside of loop");

// Loops through first loop (outter)
for (let exercise = 1; exercise <= 3; exercise++) {
  console.log(`----- Exercise ${exercise}`);

  // Loops through 2nd (inner) loop, once done then loops back through first loop again
  for (let rep = 1; rep <= 5; rep++) {
    console.log(`Rep ${rep} of 5 🏋️‍♂️`);
  }
}

// =================================================================================================================

// =================================================== While loop ==================================================
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/while

/*
Syntax
while (condition)
  statement
*/

// While loop - creates a loop that executes a specified statement as long as the test condition evaluates to true

// Comparison with the for loop, a while loop doesnt need a counter variable
for (let rep = 1; rep <= 10; rep++) {
  console.log(`lifting weights rep ${rep} 🏋️‍♂️`);
}

// Example 1 with a counter variable (rep).
console.log("--- While loop ---");

let rep = 1;
while (rep <= 10) {
  // Condition is true
  console.log(`lifting weights rep ${rep}`);
  rep++; // After each loop increase amount by 1
}

// Example 2 with expression.
let rollDice = Math.trunc(Math.random() * 6) + 1;

while (rollDice !== 6) {
  console.log(`You rolled a ${rollDice} Please try again`);

  rollDice = Math.trunc(Math.random() * 6) + 1;

  if (rollDice === 6) {
    console.log(`you rolled a ${rollDice}🎉 you win!`);
  }
}

// Example 3 same as above with function to get random number
const getRandom = () => {
  let num = Math.trunc(Math.random() * 6) + 1;
  return num;
};

let rollDice2 = getRandom();

while (rollDice2 !== 6) {
  console.log(`You rolled a ${rollDice2} Please try again`);
  rollDice2 = getRandom();

  if (rollDice2 === 6) {
    console.log(`you rolled a ${rollDice2}🎉 you win!`);
  }
}

// =================================================================================================================

// ================================================ Coding challenge ===============================================

// Create an array list of bills
// Create an empty array list for tips and the total (tips + total)
// Create a function for calculating amount of tips 
// Use a for loop to perform the 10 calculations and fill the empty arrays list (tips + total)
// Create a function to calculate average of an array list

const billsList = [22, 295, 176, 440, 31, 105, 10, 1100, 86, 52];
const tipsList1 = [];
const totalBillAmount = [];

const calculateTip = (amount) => {
  return amount >= 50 && amount <= 300 ? amount * 0.15 : amount * 0.2;
};

const calcAvg = (arr) => {
  let total = 0;
  // Loop through arr list and add the index value of i to total
  for (let i = 0; i < arr.length; i++) {
    // total = total + arr[i]; same as below
    total += arr[i];
  }
  return total / arr.length;
};

for (let i = 0; i < billsList.length; i++) {

  const tip = calculateTip(billsList[i]);
  // Store (push) calculated tip value into array
  tipsList1.push(tip);
  // Store (push) total value into array
  totalBillAmount.push(tip + billsList[i]);

  /* 
  We could do it like below instead, but we would call calculateTip() function twice in order to use its value
  instead we could call the function once and store that value into a variable to use (seen above)

  tipsList1.push(calculateTip(billsList[i]));
  totalBillAmount.push(calculateTip(billsList[i]) + billsList[i]);  
  */
}

console.log("Bills list:", billsList);
console.log("Tips list:", tipsList1);
console.log("Bills + Tips list:", totalBillAmount);

console.log(`Average Tips amount: ${calcAvg(tipsList1)}`);
console.log(`Average bill amount 💰 ${calcAvg(billsList)}`);

// =================================================================================================================
