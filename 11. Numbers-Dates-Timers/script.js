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

const displayMovements = (movements, sort = false) => {
  containerMovements.innerHTML = "";
  const sortedMovements = sort
    ? movements.slice().sort((a, b) => a - b)
    : movements;

  sortedMovements.forEach((mov, index) => {
    const type = mov > 0 ? "deposit" : "withdrawal";
    // Passing in list for each movement
    const html = `
    <div class="movements__row">
    <div class="movements__type movements__type--${type}">${
      index + 1
    } ${type}</div>
    <div class="movements__value">${mov}€</div>
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
  labelBalance.textContent = acc.balance;
}

// Calc & display summary
const calcDisplaySummary = (acc) => {

  // Show total deposits
  const totalDeposits = acc.movements
    .filter((mov) => mov > 0)
    .reduce((prev, cur) => prev + cur);
  
  labelSumIn.textContent = `${totalDeposits}€`;

  // Show total withdrawal
  const totalWithdrawal = acc.movements
    .filter((mov) => mov < 0)
    .reduce((prev, cur) => prev + cur);

  labelSumOut.textContent = `${Math.abs(totalWithdrawal)}€`

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

  labelSumInterest.textContent = `${interest}€`
}

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
  displayMovements(acc.movements);
  // Display balance
  calcDisplayBalance(acc);
  // Display summary
  calcDisplaySummary(acc);
}

// Event handler
let currentAccount;
btnLogin.addEventListener("click", (e) => {
  e.preventDefault();
  currentAccount = accounts.find(acc => acc.username === inputLoginUsername.value);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and message
    containerApp.style.opacity = 100;
    labelWelcome.textContent = `Welcome back ${currentAccount.owner.split(" ")[0]}`
    
    // Clear input fields
    inputLoginUsername.value = "";
    inputLoginPin.value = ""
    // or 
    // inputLoginUsername.value = inputLoginPin.value = "";

    // unfocus input field
    inputLoginPin.blur();

    // Update ui
    updateUI(currentAccount);
  }
})

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
    updateUI(currentAccount);
  }
  
  inputTransferAmount.value = inputTransferTo.value = "";
})

btnLoan.addEventListener("click", (e) => {
  e.preventDefault();
  console.log("Transfer loan");
  const loanAmount = Number(inputLoanAmount.value);

  if (loanAmount > 0 && currentAccount.movements.some(mov => mov >= loanAmount * 0.1)) {
    // Add loan amount movement to currentAccount
    currentAccount.movements.push(loanAmount);
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
})

let sort = false;
btnSort.addEventListener("click", (e) => {
  e.preventDefault();

  displayMovements(currentAccount.movements, !sort);
  sort = !sort;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
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
