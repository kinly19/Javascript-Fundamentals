'use strict';

// ============================================================ BANKIST APP ==========================================================
// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

//. Function for displaying list items
const displayMovements = (movements) => {
  containerMovements.innerHTML = "";
  
  movements.forEach((mov, index) => {
    const type = mov > 0 ? "deposit" : "withdrawal";
    
    const html = `
    <div class="movements__row">
    <div class="movements__type movements__type--${type}">${
      index + 1
    } ${type}</div>
    <div class="movements__value">${mov}</div>
    </div>
    `;
    
    // where to put above html string
    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};

displayMovements(account1.movements);

// Compute usernames
const createUsernames = (acc) => {
  acc.forEach(
    (user) =>
    // Add new property
    (user.username = user.owner
      // build new string for property value
        .split(" ")
        .map((string) => string[0])
        .join(""))
  );
};
createUsernames(accounts);
// ===================================================================================================================================

// ============================================================= LECTURES ============================================================

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

// ========================================================== Array Methods ==========================================================
/* 
Array methods - Array methods are functions built-in to JavaScript that we can apply to our arrays
Each method has a unique function that performs a change or calculation to our array and saves us from writing common functions from scratch
*/

/*
slice() 
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice
Method returns a shallow copy of a portion of an array into a new array object selected from start to end (end not included) 
where start and end represent the index of items in that array. The original array will not... be modified.
*/

let arr = ["a", "b", "c", "d", "e"];
// Slice an array from start upto end (1 before end)
console.log(arr.slice(2, 4))
/*
0: "c"
1: "d"
*/

// Slice backwards with a negative value
console.log(arr.slice(-1));
// 0: "e"
console.log(arr.slice(-2));
// 0: "d" 
// 1: "e"
console.log(arr.slice(1, -2));
// from 1 upto -2
// 0: b
// 1: c

// Create a complete shallow copy of an array
console.log(arr.slice());
//  ['a', 'b', 'c', 'd', 'e']


/*
splice() 
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice
Method changes the contents of an array by removing or replacing existing elements and/or adding new elements in place. 
To access part of an array without modifying it, see slice(). (CHANGES ORIGINAL ARRAY)
*/

/*
console.log(arr.splice(2));
// ['c', 'd', 'e']
console.log(arr)
// ['a', 'b'] 
Changes original array
*/

/*
Use splice to remove last item inside of an array 

arr.splice(-1);
console.log(arr)
// ['a', 'b', 'c', 'd']
*/

/*
Splice from start upto
arr.splice(1, 2)
console.log(arr)
// ['a', 'd', 'e']
*/

// Reverse arrays
const arr2 = ["j","i","h","g","f"];
arr2.reverse();
console.log(arr2);
// Changes original array also
// ['f', 'g', 'h', 'i', 'j']

// Concat arrays
const letters = arr.concat(arr2);
const letters2 = [...arr, ...arr2]; // Same thing as above
console.log(letters);
console.log(letters2);
// ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']

// Join arrays
console.log(letters.join("-"));
// a-b-c-d-e-f-g-h-i-j

/*
at()
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/at
Method takes an integer value and returns the item at that index, allowing for positive and negative integers. 
Negative integers count back from the last item in the array.
*/

const arr3 = [23, 11, 64];
const index = 2;
console.log(`using the index of ${index} the item returned is ${arr3.at(index)}`);
// using the index of 2 the item returned is 64

// Same as using bracket notation
console.log(arr3[0]);
console.log(arr3.at(0));
// 23

// Getting last array element
console.log(arr3[arr3.length - 1]);
console.log(arr3.slice(-1)[0]);
console.log(arr3.at(-1)); // same as above
// 64

// strings
console.log("Alysia".at(2));
// y
// ===================================================================================================================================

// ===================================================== Looping Arrays: forEach =====================================================
/*
forEach()
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
- method executes a provided function once for each array element
- A higher-order function, takes one or more functions as arguments
- Cant break out of a loop with forEach unlike for of
*/

// Example 
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// 1. for of loop ==========================================
console.log("===== for of =====")
for (const movement of movements) {
  if (movement > 0) {
    console.log(`You have deposited:${movement}`);
  } else {
    console.log(`You have withdrawn:${Math.abs(movement)}`);
  }
}

// 2. forEach loop ========================================

// Arrow function
console.log("===== forEach arrow function =====")
movements.forEach(movement => {
  if (movement > 0) {
    console.log(`You have deposited:${movement}`);
  } else {
    console.log(`You have withdrawn:${Math.abs(movement)}`);
  }
});

// Callback function
console.log("===== forEach callback function =====")
movements.forEach(function(movement) {
  console.log(movement)
})

// 3. Accessing index ===================================

// for of index (entries returns an array arrays)
console.log("===== for of index =====")
for (const [index, movement] of movements.entries()) {
  console.log(`${index}:${movement}`);
}

// forEach index 
console.log("===== forEach index =====")
movements.forEach((movement, index) => {
  console.log(`${index} : ${movement}`)
})


/*
Map function 
Like map , the forEach() method receives a function as an argument and executes it once for each array element. However, 
instead of returning a new... array like map, it returns undefined.
*/
movements.map((item, index) => {
  console.log(`Movement ${index}: ${item}`);
})

// ===================================================================================================================================

// ==================================================== forEach With Maps And Sets ===================================================
/*
The Map object 
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map
- Holds key-value pairs and remembers the original insertion order of the keys. 
- Any value (both objects and primitive values) may be used as either a key OR a value.

The Set object 
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set
- Lets you store unique values of any type, whether primitive values or object references.
*/


// // 3. Maps =============================================
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

currencies.forEach((value, key, map) => {
  console.log(`${key} : ${value}`)
  console.log(map)
})

const getValue = (value) => {
  return [...value].reverse().join().replaceAll(",","");
}

const newMap = new Map([
  [2+1, "Apple"],
  [getValue("javascript"), "Code"]
])

newMap.forEach(function(value, key, map) {
  console.log(map)
})

/* 3. Sets =============================================
Sets dont have any keys unlike maps
In javascript an _ means a throw away variable (not needed)
Or we can use destructuring 

currencies.forEach((...[a, , c]) => {
  console.log()
})

*/

const currenciesUnique = new Set(["USD", "GBP", "USD", "EUR","EUR"]);
console.log(currenciesUnique);
currenciesUnique.forEach((value, _, map) => {
  console.log(`${value} : ${value}`)
})

// ===================================================================================================================================

// ======================================================== Coding challenge #1 ======================================================
/*
Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners 
about their dog's age, and stored the data into an array (one array for each). For 
now, they are just interested in knowing whether a dog is an adult or a puppy.
A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years 
old.
Your tasks:
Create a function 'checkDogs', which accepts 2 arrays of dog's ages 
('dogsJulia' and 'dogsKate'), and does the following things:
1. Julia found out that the owners of the first and the last two dogs actually have 
cats, not dogs! So create a shallow copy of Julia's array, and remove the cat 
ages from that copied array (because it's a bad practice to mutate function 
parameters)
2. Create an array with both Julia's (corrected) and Kate's data
3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 
is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy 
�
")
4. Run the function for both test datasets
*/

const checkDogs = (dogJulia, dogKate) => {
  const juliaDogOnly = dogJulia.slice(1,3);
  const dogs = [...juliaDogOnly, ...dogKate];

  // concat method
  // const dogData = juliaDogData.concat(dogArr2)

  // console.log(dogData);
  dogs.forEach((dog, i) => {
    if (dog > 3) {
      console.log(`Dog #${i + 1}: Is an adult`)
    } else {
      console.log(`Dog #${i + 1}: Is still a puppy `)
    }
  })
}

checkDogs( [3, 5, 2, 12, 7],  [4, 1, 15, 8, 3])

// ===================================================================================================================================

// =========================================================== Map() Method ==========================================================
/*
map() 
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
- Method creates a new array populated with the results of calling a provided function on every element in the calling array.
- Method creates a copy of the original array, which allows us to make changes (with provided function) to the copied array, keeping original array safe.

If we need extra lines of code (block) we need to use {curly braces} and explicit return
map(() => {

  const name = "Sarah"
  return `hello ${name}`
 
});

If we just want to return we can use implicit return (with out return keyword)
map(() =>

  "something"
  
);

*/

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const eurToUsd = 1.1;
// Explicit return 
const convertedEurToUsd = movements.map((cur) => {
  // return the values we want the new array to have
  return cur * eurToUsd
});
console.log(convertedEurToUsd);

// One liner from above (eww)
const convertedEurToUsdOneliner = movements.map(cur => cur * eurToUsd);
console.log(convertedEurToUsdOneliner);

// Example with forEach
const movementArr = [];
movements.forEach((movement) => {
  movementArr.push(movement * eurToUsd);
})
console.log(movementArr);

// Using index (implicit return)
const movementDiscription = movements.map(
  (movement, index) =>
    `Movement ${index}: You have ${movement > 0 ? "deposited" : "withdrawn"}: ${Math.abs(
      movement
    )}`
);

console.log(movementDiscription);
// ===================================================================================================================================