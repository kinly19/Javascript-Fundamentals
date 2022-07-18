'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
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

/////////////////////////////////////////////////
// Functions

const formatMovementDate = (date, locale) => {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs((date2 - date1) / (1000 * 60 * 60 * 24)));
  const daysPassed = calcDaysPassed(new Date(), date);
  console.log(daysPassed);

  // Condition
  if (daysPassed === 0) return "Today";
  if (daysPassed === 1) return "Yesterday";
  if (daysPassed <= 7) return `${daysPassed} days ago`;

  // Without Internationalizing Numbers (Intl)
  // const day = `${date.getDate()}`.padStart(2, 0);
  // const month = `${date.getMonth() + 1}`.padStart(2, 0);
  // const year = `${date.getFullYear()}`;
  // const displayDate = `${day}/${month}/${year}`;
  // return displayDate;

  return new Intl.DateTimeFormat(locale).format(date);
};

const formatCurrency = (value, locale, currency) => {
  return Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(value);
};

const displayMovements = (acc, sort = false) => {
  containerMovements.innerHTML = "";
  const sortedMovements = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  sortedMovements.forEach((mov, index) => {
    const type = mov > 0 ? "deposit" : "withdrawal";
    const date = new Date(acc.movementsDates[index]);
    const displayDate = formatMovementDate(date, acc.locale);
    const formattedMov = formatCurrency(mov, acc.locale, acc.currency);
    
    // Passing in list for each movement
    const html = `
    <div class="movements__row">
    <div class="movements__type movements__type--${type}">${
      index + 1
    } ${type}</div>
    <div class="movements__date">${displayDate}</div>
    <div class="movements__value">${formattedMov}</div>
    </div>
    `;

    // Where to put above html string
    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};

// Calc & display balance
const calcDisplayBalance = (acc) => {
  // Store total balance into users account
  acc.balance = acc.movements.reduce((prev, cur) => prev + cur);
  labelBalance.textContent = `${formatCurrency(acc.balance, acc.locale, acc.currency)}`;
};

// Calc & display summary
const calcDisplaySummary = (acc) => {

  // Show total deposits
  const totalDeposits = acc.movements
    .filter((mov) => mov > 0)
    .reduce((prev, cur) => prev + cur);

  labelSumIn.textContent = `${formatCurrency(totalDeposits, acc.locale, acc.currency)}`;

  // Show total withdrawal
  const totalWithdrawal = acc.movements
    .filter((mov) => mov < 0)
    .reduce((prev, cur) => prev + cur);

  labelSumOut.textContent = `${formatCurrency(Math.abs(totalWithdrawal), acc.locale, acc.currency)}`;

  // Show total interest
  const interest = acc.movements
    .filter((mov) => mov > 0)
    .map((mov) => (mov * acc.interestRate) / 100)
    // add interest for deposits greater than 1euro
    .filter((mov, index, arr) => {
      console.log(arr);
      return mov >= 1;
    })
    .reduce((prev, int, index, arr) => {
      console.log(arr);
      return prev + int;
    });

  labelSumInterest.textContent = `${formatCurrency(interest, acc.locale, acc.currency)}`};

// Compute usernames
const createUsernames = (acc) => {
  acc.forEach(
    (user) =>
      // Add new property
      (user.username = user.owner
        // build new string for property value
        .toLowerCase()
        .split(" ")
        .map((string) => string[0])
        .join(""))
  );
};
createUsernames(accounts);

// Update ui
const updateUI = (acc) => {
  // Display movements
  displayMovements(acc);
  // Display balance
  calcDisplayBalance(acc);
  // Display summary
  calcDisplaySummary(acc);
};

// Event handler
let currentAccount;
btnLogin.addEventListener("click", (e) => {
  e.preventDefault();
  currentAccount = accounts.find(acc => acc.username === inputLoginUsername.value);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and message
    containerApp.style.opacity = 100;
    labelWelcome.textContent = `Welcome back ${currentAccount.owner.split(" ")[0]}`;

    // Clear input fields
    inputLoginUsername.value = "";
    inputLoginPin.value = "";
    // or
    // inputLoginUsername.value = inputLoginPin.value = "";

    // unfocus input field
    inputLoginPin.blur();

    // Create current date and time
    const now = new Date();

    const option = {
      hour: "numeric",
      minute: "numeric",
      day: "numeric",
      month: "numeric",
      year: "numeric",
      // weekday: "long"
    };

    // Without Internationalizing Numbers (Intl)
    // const hour = now.getHours();
    // const min = `${now.getMinutes()}`.padStart(2, 0);
    // labelDate.textContent = `${formatMovementDate(now)}, ${hour}:${min}`;

    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      option
    ).format(now);
    // Update ui
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener("click", (e) => {
  e.preventDefault();

  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find((acc) => acc.username === inputTransferTo.value);

  // Check conditions
  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    console.log("Transfer valid");
    // Doing transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);
    // Add transfer date
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());
    // Update ui
    updateUI(currentAccount);
  }

  inputTransferAmount.value = inputTransferTo.value = "";
});

btnLoan.addEventListener("click", (e) => {
  e.preventDefault();
  console.log("Transfer loan");
  const loanAmount = Math.floor(inputLoanAmount.value);

  if (loanAmount > 0 && currentAccount.movements.some(mov => mov >= loanAmount * 0.1)) {
    // Add loan amount movement to currentAccount
    currentAccount.movements.push(loanAmount);
    // Add loan date
    currentAccount.movementsDates.push(new Date().toISOString());
    // Update UI
    updateUI(currentAccount);
  }
  // Clear input field
  inputLoanAmount.value = "";
});

btnClose.addEventListener("click", (e) => {
  e.preventDefault();
  const index = accounts.findIndex(acc => acc.username === inputCloseUsername.value);
  // Check details
  if (
    currentAccount.username === inputCloseUsername.value &&
    currentAccount.pin === Number(inputClosePin.value)
  ) {
    // Remove account
    console.log("Close account");
    accounts.splice(index, 1);
    console.log(accounts);
    // Hide UI
    containerApp.style.opacity = 0;
  }
  // Clear input fields
  inputCloseUsername.value = inputClosePin.value = "";
});

let sort = false;
btnSort.addEventListener("click", (e) => {
  e.preventDefault();

  displayMovements(currentAccount, !sort);
  sort = !sort;
});

// LECTURES
// ================================================== Converting and Checking Numbers ================================================
/*
  - All numbers are presented internally as floating point numbers (basically, always as decimals).
  - Numbers are represented internally in a 64 base 2 format. That means that numbers are always stored in a binary format. 
    They are only composed of zeros and ones.

  parseInt()
  - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt
  - Function parses a string argument and returns an integer of the specified radix
  - numbers before string

  parseFloat()
  - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseFloat
  - Function parses an argument (converting it to a string first if needed) and returns a floating point number.

  isNaN()
  - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/isNaN
  - Function determines whether a value is NaN or not. Because coercion inside the isNaN function can be surprising
    you may alternatively snt to use Number.isNaN().

  isInteger()
  - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isInteger
  - Method determines whether the passed value is an integer.
*/

console.log(23 === 23.0); // true 
// Base 10 - 0 to 9. 1/10 = 0.1
// Binary base 2 - 0 - 1

console.log(0.1 + 0.2) // 0.30000000000000004
console.log(0.1 + 0.2 === 0.3) // false

// Converting string to number
console.log(Number("23"));
console.log(+"23");
// when JavaScript sees the plus operator, it will do type coercion.

// Parsing
console.log(Number.parseInt("30px", 10)); // 30
console.log(Number.parseInt("px30", 10)); // NaN

console.log(Number.parseFloat("2.5rem")) // 2.5
console.log(Number.parseInt("2.5rem")) // 2

// isNan
// Checks if value is "NaN" or not
console.log(Number.isNaN(20)); // false
console.log(Number.isNaN("20")); // false
console.log(Number.isNaN(+"20z")); // true
console.log(Number.isNaN(23 / 0)); // false
 
// isFinite()
// Better way of checking if a value is a number or not
console.log(Number.isFinite(20)); // true
console.log(Number.isFinite("20")); // false
console.log(Number.isFinite(+"20z")); // false
console.log(Number.isFinite(23 / 0)); // false

// ===================================================================================================================================

// ========================================================== Math and Rounding ======================================================
/*
  Math.sqrt()
  - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/sqrt
  - Function returns the square root of a number, that is

  Math.max()
  - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/max
  - Function returns the largest of the zero or more numbers given as input parameters, 
    or NaN if any parameter isn't a number and can't... be converted into one.

  Math.min() **

  Math.PI 
  - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/PI
  - Property represents the ratio of the circumference of a circle to its diameter

  Math.random()
  - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random 
  - Function returns a floating-point, pseudo-random number in the range 0 to less than 1 (inclusive of 0, but not 1) 
    with approximately uniform distribution over that range — which you can then scale to your desired range.

  Math.trunc()
  - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/trunc
  - Function returns the integer part of a number by removing any fractional digits

  Math.round()
  - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/round 
  - Function returns the value of a number rounded to the nearest integer.

  Math.ceil()
  - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/ceil 
  - Function always... rounds a number up to the next largest integer.

  Math.floor()
  - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/floor 
  - Function returns the largest integer less than or equal to a given number

  toFixed()
  - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed 
  - Method formats a number using fixed-point notation

*/

// Math.sqrt()
// Square root
console.log(Math.sqrt(25)); // 5

// Min and max values
console.log(Math.max(5, 2, 23, 7, 21)); // 23
console.log(Math.min(5, 2, "23", 7, 21)); // 2
console.log(Math.min(5, 2, "23px", 7, 21)); // NaN

// PI
console.log(Math.PI * Number.parseFloat("10px") ** 2); // 314.1592653589793

// Math.random()
console.log(Math.trunc(Math.random() * 6) + 1); // random number from 1 - 6
const randomInt = (max, min) => Math.trunc(Math.random() * (max - min) + min);
console.log(randomInt(10, 20));

// 1. Rounding intergers
// Math.trunc()
console.log(Math.trunc(23.5)); // 23

// Math.round()
console.log(Math.round(23.3)); // 23
console.log(Math.round(23.9)); // 24

// Round up
// Math.ceil()
console.log(Math.ceil(23.1)); // 24

// Round down
// Math.floor()
console.log(Math.floor(23.1)); // 24

// 2. Round decimals
// Wrap decimal number inside of parentheses
console.log((2.7).toFixed(0)); // '3'
console.log((2.7).toFixed(3)); // '2.700'
console.log((2.7).toFixed(2)); // '2.70'
console.log((2.7).toFixed(1)); // '2.7'
console.log((2.345).toFixed(2)); // '2.35'
console.log((2.344).toFixed(2)); // '2.34'
// convert to number
console.log(+(2.344).toFixed(2)); // 2.34

// ===================================================================================================================================

// ======================================================== The Remainder Operator ===================================================
/*
The remainder operator (%)  
*/

console.log(5 % 2); // 1 because 2 * 2 = 4 + remain 1
console.log(5 / 2); // 2.5
console.log(8 % 2); // 0
console.log(8 % 3); // 2

// Even
console.log(6 % 2); // 0

// Odd
console.log(7 % 2); // 7 = 3 * 2 = 6 + remain 1

const isEven = (n) => n % 2 === 0;
console.log(isEven(7)); // false
console.log(isEven(120)); // true

// Change each even row to another color
labelBalance.addEventListener("click", () => {
  [...document.querySelectorAll(".movements__row")].forEach((row, index) => {
    if (index % 2 === 0) {
      row.style.backgroundColor = "orange";
    }
  });
});

// ===================================================================================================================================

// ========================================================== Numeric Separators =====================================================
/*
Numeric separators 
- A JavaScript feature that allows you to use underscore as a separator in numeric literals, for example, you can write 10000 as 10_000.
- Allows us humans to read numbers easier.
*/

// 287460000000
const diameter = 287_460_000_000;
// Javascript will ignore the underscores
console.log(diameter); // 287460000000

const priceCents = 345_599; // 345599

const transferFee = 15_00; // 1500
const transferFee2 = 1_500; // 1500

// Numeric separators can only be placed inbetween numbers
// const PI = 3.1415_;

console.log(Number("230000"));
// Cant convert into numbers, only use Numeric separators when using actual numbers types
console.log(Number("23_000")); // NaN
console.log(parseInt("23_000")); // 23

// ===================================================================================================================================

// ========================================================= Working with BigInt =====================================================
/*
  - BigInt is a special type of interger, which was introduced in 2020

  - Number are represented internally as 64bit, that means there are exactly 64 ones and zeros to represent any given number. 
  - Now out of these 64 bits only 53 are used to actually store the digits themselves. 
    The rest are for storing the position of the decimal point and the sign.
  - If there are only 53bits to store the number there is a limit of how big a number can be

  - BigInt allows us to store numbers as large as we want safely
*/

// The biggest number javascript can represent safely
console.log(2 ** 53 - 1); // 9007199254740991
console.log(Number.MAX_SAFE_INTEGER); // 9007199254740991

// Any integer that is larger than above, cannot be represented safely
// Javascript will still use some tricks to try represent these unsafe numbers
// Some of these numbers below may be correct and some just plain wrong
console.log(2 ** 53 + 0); // 9007199254740992    X
console.log(2 ** 53 + 1); // 9007199254740992
console.log(2 ** 53 + 2); // 9007199254740994    X
console.log(2 ** 53 + 3); // 9007199254740994
console.log(2 ** 53 + 4); // 9007199254740996    X
console.log(2 ** 53 + 250000); // 9007199254990992    X

console.log(2 ** 53 + 157000); // 9007199254897992    X
// BigInt
console.log(9007199254740991n + 157000n); // 9007199254897991

// Cant mix bigInt with regular numbers
// console.log(73264783274n + 32) // Error Cannot mix BigInt and other types

// Exceptions
console.log(20n > 15); // true
console.log(20n === 20); // false
console.log(20n == "20"); // true (type coercion)
// String concate
const huge = 545646574841231221n;
console.log(huge + " is Really Big");

// ===================================================================================================================================

// =========================================================== Creating Dates ========================================================
/*
  Date
  - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
  - Objects represent a single moment in time in a platform-independent format. 
    Date objects contain a Number that represents milliseconds since 1 January 1970 UTC

  Constructors
    Date()
    - When called as a function, returns a string representation of the current date and time.
    new Date()
    - When called as a constructor, returns a new Date object.

  All Methods
  - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date#instance_methods
*/

// Create a date
// const now = new Date();
// console.log(now); // Fri Jul 15 2022 16:38:26 GMT+0100 (British Summer Time)

console.log(new Date("Jul 15 2022 16:38:26")); // Fri Jul 15 2022 16:38:26 GMT+0100 (British Summer Time)

// Date created like this are unreliable
console.log(new Date("December 24, 2015")); // Thu Dec 24 2015 00:00:00 GMT+0000 (Greenwich Mean Time)

// Months are index based
console.log(new Date(2037, 10, 19, 15, 23, 5)); // Thu Nov 19 2037 15:23:05 GMT+0000 (Greenwich Mean Time)
// Javascript can auto correct days
console.log(new Date(2037, 10, 40)); // Thu Dec 10 2037 00:00:00 GMT+0000 (Greenwich Mean Time)

// Unix time (theoretical time the clock began ticking)
console.log(new Date(0)); // Thu Jan 01 1970 01:00:00 GMT+0100 (Greenwich Mean Time)
// 3 days after unix
console.log(new Date(3 * 24 * 60 * 60 * 1000)); // Sun Jan 04 1970 01:00:00 GMT+0100

// date methods
const future = new Date(2022, 6, 15, 17, 10);
console.log(future); //Fri Jul 15 2022 17:10:00 GMT+0100
console.log(future.getFullYear());
console.log(future.getYear()); // 122 (1 = 100 after 1900) Deprecated
console.log(future.getMonth()); // 6 (index based)
console.log(future.getDate()); // 15
console.log(future.getDay()); // 5 (day of the week not day of the month) (index based sun = 0, mon = 1 etc)
console.log(future.getHours()); // 17
console.log(future.getSeconds()); // 0
console.log(future.toISOString()); // 2022-07-15T16:10:00.000Z
console.log(future.getTime()); // 165700901400000 (Timestamp)
console.log(new Date().getTime());

// Get date based of time stamp
console.log(new Date(1657901400000)); // Fri Jul 15 2022 17:10:00 GMT+0100 (British Summer Time)

// Current timeStamp
console.log(Date.now()); // 1657902461934

// Set methods
future.setFullYear(2050);
console.log(future); // Fri Jul 15 2050 17:10:00 GMT+0100
// ===================================================================================================================================