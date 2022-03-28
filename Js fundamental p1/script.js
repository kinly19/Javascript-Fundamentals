// value - basically a piece of data, the most fundamental unit of information we have in programming.
const person = 'Adam'; // the value for this 'person' is Adam 

// Data Types
// in javascript every value is either an 'object' or a 'primitive' value

// object values
const persons = {
  name: "Adam",
  age: 25,
};

// Primitive values
// a value is only a primitive if it is not an object...
const name = 'Adam';

// =================================================== The 7 Primitive data types ===================================================

// #1 Number: Floating point numbers used for decimals and intergers.
let age = 23;

// #2 Strings: Sequence of character used for text (Always put them in quotes or javascript will confuse them for variable names).
let firstName = 'JavaScript';

// #3 Boolean: Logical type that can only be 'true' or 'false' can only be one not both!, used for taking decisions.
let JavascriptIsFun = true;
if (JavascriptIsFun) {
  console.log('Hello world')
  // special type of operator we can use to show the 'type' of a value
  console.log(typeof JavascriptIsFun)
  console.log(typeof firstName)
}

// #4 Underfined: Value taken by a variable that is not yet defined (empty value).
let children; // returns underfined. A variable that has been declared but not assigned.
console.log(children) // returns underfined. Values which are undefined its data 'type' is also underfined

// #5 Null: Also means 'empty value'.
console.log(typeof null) 
/* typeof null === object - this is a javascript bug which was never changed for legacy reason
   so keep that in mind when using "typeof"
*/

// #6 Symbol (ES2015): Value that is unique and cannot be changed. 

// #7 BigInt (ES2020): Larger integers than the Number type can hold.

// ========================================================== Dynamic typing ==========================================================

// Dynamic typing - Changes the 'type' of a value that is held by a variable
let changeMe = 'JavaScript'
changeMe = 'Javascript is fun'
// changeMe = 25

if (typeof changeMe === 'string') {
  console.log(`i am a string: ${changeMe}`)
}

if (typeof changeMe === 'number'){
  console.log(`i am a number:`, changeMe)
}

// ======================================================== declaring variables ========================================================

// var - older way of declaring variables (ES5)
// var and let may look similar but below the surface they are actually different
var job = 'programmer'
job = 'teacher'

// both below introduced in ES6 modern JavaScript
/* 
  let
  when we need to mutate a variable, 'let' is perfect for this case,
  also for declaring empty variable to be reassigned later
*/
let something = 'something'
something = 'something else'

/* 
const 
cannot be changed, a variable that cannot be mutated
cant have empty values either
*/ 
const fruit = 'apple';
// fruit = 'orange' -  return TypeError: Assignment to constant variable.
// const drink;  = return SyntaxError Missing initializer in const declaration

// use 'const' by default and 'let' if you are sure your variable needs to change at some point in your code
// =====================================================================================================================================

// ============================================================= Operators =============================================================
/* 
operators basically allows us to transform values
or combine multiple values and really do all kinds of work with values.
there are many categories of operators like mathematical operators, comparison operators
logical operators, assignment operators, and many more etc
*/

// Math operators
const date = new Date()
// Minus '-' operator
const ageAlyssia = date.getFullYear() - 1997; //25
const jakeAge = date.getFullYear() - 1985; // 37
console.log(ageAlyssia, jakeAge) // log multiple values with comma

// Multiplication '*' operator
console.log(ageAlyssia * 2) //50

// Plus '+' operator 
console.log(ageAlyssia + jakeAge) //25+37=62
const firstname = 'Imogen'
const lastname = 'Poots'
console.log(firstname + ' ' + lastname) // string concatenate 

// assignment '=' operator
/* 
let x = 10 + 5; //15 operator precedence
x += 10 // x = x + 10 = 25
x *= 4 // x = x * 4 = 100
x ++; // x = x + 1
x --; // x = x - 1
console.log(x) 
*/

// Comparison operator
// allow us to produce Boolean values, (compare values and return true or false)
const sarahAge = 25
const johnAge = 30
console.log(sarahAge < johnAge) // true
console.log(sarahAge >= johnAge) // false


/* Operator precedence 
JavaScript has a well-defined order of operator precedence.
So basically the order in which operators are executed
check out the Table Precedence at mdn
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence
*/
let x,y;
x = y = 25 - 10 - 5 // x = y = 10, x = 10
console.log(x,y) // 10 10 
/* 

javascript will look at all the operators that are presented
because the 'minus' operator has a higher precedence than the Assignment operator. 
It will start with those first 
left-to-right  
25 - 10 - 5 = 10

then it moves onto the Assignment operator 
right to left
y = 25 - 10 - 5 (equals 10)
x = y (equals y which is 10)

*/

// excersie 
const marksWeight = 78;
const marksHeight = 1.69;
const marksBMI = marksWeight / (marksHeight * marksHeight);

const johnsWeight = 92;
const johnsHeight = 1.95;
const johnsBMI = johnsWeight / johnsHeight ** 2; 

const markHeigherBMI = marksBMI > johnsBMI; 

console.log(marksBMI, johnsBMI, markHeigherBMI)

if (markHeigherBMI) {
  console.log(`Mark has a higher BMI: ${marksBMI} then John: ${johnsBMI}`)
} else {
  console.log(`John has a higher BMI: ${johnsBMI} then Mark: ${marksBMI}`)
}

// =================================================== Strings and Template Literals ===================================================

const usersFirstName = 'Sarah';
const usersJob = 'teacher';
const birthYear = 1990;
const year = 2022;

/* string concatenation

  const sarah = "I'am " + usersFirstName + ", a " + usersJob + "," +  (year - birthYear) + "years old"

  console.log("string with \n\
  multiple \n\
  lines");  

*/

/*
Template Literals
ES6 template literals allow us to write strings in a more normal way and insert the variables directly into the string
using back ticks `
*/  

const sarah = `I'm ${usersFirstName}, a ${usersJob}, ${year - birthYear} years old`;

console.log(sarah)

console.log(`string with
multiple
lines`)

// =====================================================================================================================================

// =======================================================  if / else Statements =======================================================

/*
The if statement executes a statement if a specified condition is truthy. If the condition is falsy, another statement can be executed (else block).

 if ( this statement between the parenthesis is true ) {
   run this block of code
 } else {
  otherwise run this block of code
  if there is no else block javascript will move on to the next line after the if statement
 }

*/

const userAge = 17;

if ( userAge >= 18 ) {
  console.log('This person is old enough to drive 🙂🎉🎊');
} else {
  const yearsLeft = 18 - userAge;
  console.log(`This person is too young, wait another ${yearsLeft} years 😥`);
};

/*
Extra notes 
  Variables defined inside a code block are NOT... accessible outside of the block
  console.log (yearsLeft) // yearsLeft is not defined

  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else
*/
// =====================================================================================================================================

// ===================================================  Type Conversion and Coercion ===================================================

/*
Type conversion is similar to type coercion because they both convert values from one data type to another with one key difference 
type coercion is implicit whereas type conversion can be either implicit or explicit
*/

// type Converstion (explicit)
const inputYear = '1991';
// if we try to calculate the year plus 18 (below) this will concate the two strings together
console.log(inputYear + 18) // 199118
// if we wanted to do this we use conversion to change the string value '1991' into a number 1991
console.log(Number(inputYear) + 18) //2009

console.log(String(23)); // 23

/* type Coercion
  happens whenever an operator is dealing with two values that have different types.
  behind the scenes, javascript will convert one of the values to match the other so that in the end, the operation can be executed.
*/

console.log('I am ' + 25 + ' years old') // Coercion changes the number 25 into a string value for string concatenation
console.log('10' - '5' - 3); // 2 Coercion changes our string numbers into numbers
console.log('10' + '5' + 3); // 1053 Coercion concates our strings together   
console.log('22' + 1); // 221 coercion concates the string together with our number
console.log('23' * '2') // 46 both values are changed to numbers

let n = '1' + 1 // string '11'
n = n - 1 // 10

// 2+3+4+'5' = 2+3+4=9 + (concate) 5 // 95 
// '10'-'4'-'3'-'2' = 1 +(concate) 5 // 15

// https://developer.mozilla.org/en-US/docs/Glossary/Type_coercion
// https://developer.mozilla.org/en-US/docs/Glossary/Type_Conversion

// =====================================================================================================================================

// =====================================================  truthy and falsey values =====================================================

/* 
falsy values - are values that are not exactly false, but will become false when we try to convert them into a boolean.
in javascript there are only five falsy values.

  0 
  '' (empty string)
  underfined 
  null 
  NaN

these values will be false when we attempt to convert them to a boolean. 
*/
console.log(Boolean(0)); // false
console.log(Boolean(undefined)) // false
console.log(Boolean('Jonas')) // true
console.log(Boolean({})); // true
console.log(Boolean('')); // false

/*
in practice the conversion to boolean is always implicit, not explicit. In other words its always typed coercion
that JavaScript does automatically behind the scenes.

the two scenarios when javascript does type coercion to booleans (coercion is the process of converting value from one type to another)
  logical operators 
  logical context
*/

// Logical context
const money = 0; 
if (money) {
  console.log("Dont spend it all");
} else {
  console.log("You need to get a job");
}

/*
the above if else statement will return (you need to get a job), the reason this happens is because
the value for money is a number 0 but in the logical context of an if else statement condition
here javascript will try to coerce any value into a boolean... if its not a boolean javascript will try to convert it to a boolean.

because the number 0 is a falsy value
in our if else statement javascript will convert the value 0 to false
which returns our else block
*/

let height = 0;
if (height >= 0) {
  console.log('We have a height defined');
} else {
  console.log('No height it defined');
}

// if we wanted to count 0 as a value which is not falsy we could use logical operators to fix this like above

/*
everything else are our so called truthy values, value that will be converted to true 
for example any number that is not zero or any string that is not an empty sting (anything which is not a falsy value) will be converted to true when we attempt to convert them to 
a boolean value
*/

// =====================================================================================================================================

// =================================================  Equality Operators: (== vs. ===) =================================================

// === is our strict equality operator, it will not perform type coercion, it will only return true if both values are exactly the same...
console.log(18 === 18) // true
console.log('18' === 18) // false

// == is loose equality operator, this does type coercion
console.log('18' == 18) // because of coercion the string '18' gets converted to the number 18. 18 == 18 // true

// both log messages will show, but if we change the testAge to the string '18' only one log message shows (one which uses loose equality operator)
let testAge = 18
if (testAge === 18) console.log('you just became an adult: (strict quality operator)');
if (testAge == 18) console.log('you just became an adult: (loose quality operator)');

// =====================================================================================================================================

// ==========================================================  Boolean Logic ==========================================================
/*
Boolean logic is a branch of computer science, which uses true and false values to solve complex logical problems. 
And in order to do that, it uses several logical operators to combine true and false values.
*/

/*

Logical Operators 
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_Operators#logical_operators

1.
logical AND (&&) - the operator returns the value of the first falsy operand encountered when evaluating from left to right, 
or the value of the last... operand if they are all truthy.

result = '' && 'foo';  // result is assigned "" (empty string) empty strings are falsy
result = 2 && 0;       // result is assigned 0
result = 'foo' && 4;   // result is assigned 4

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_AND

2.
logical OR (||)

expr1 || expr2
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_OR

3.
Logical Not (!)
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_NOT
*/

const hasDriversLicense = true;
const HasGoodVision = false;

const shouldDrive = hasDriversLicense && HasGoodVision;

if (shouldDrive) {
  console.log("This person is able to drive!");
} else {
  console.log("Someone else should drive!");
}

/* 
we can put the condition directly inside the if condition too
if (hasDriversLicense && HasGoodVision) 
*/

// 

// =============================================================== excercise ===============================================================

const dolphinsAvgScore = (96+108+89) / 3; 
//97
// const dolphinsAvgScore = (97+112+101) / 3;
//103.333
// const dolphinsAvgScore = (97+112+101) / 3;
//103.333

const koalasAvgScore = (88+91+110) / 3;
//96.333
// const koalasAvgScore = (109+95+123) / 3;
//109
// const koalasAvgScore = (109+95+106) / 3;
//103.33


const minScore = 100;


if (dolphinsAvgScore > koalasAvgScore  && dolphinsAvgScore >= minScore){
  console.log("dolphins wins");
} else if (koalasAvgScore > dolphinsAvgScore && koalasAvgScore >= minScore) {
  console.log("koalas wins");
} else if (dolphinsAvgScore === koalasAvgScore && dolphinsAvgScore && koalasAvgScore >= minScore){
  console.log("draw")
}else {
  console.log("No winners")
}

// =======================================================================================================================================

// ==========================================================  Switch statement ==========================================================
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch
/*
The switch statement evaluates an expression, matching the expression's value to a case... clause
basically if we want to compare one value to multiple different options. 
*/

//'day' will be our expression value to match our case (case is strict equality way)

const day = 'saturday';
switch (day) {
  case 'monday': // day === 'monday'
    console.log("Plan course structure");
    break; // stop executing 
  case 'tuesday':
    console.log("Prepare theory videos");
    break;
  case 'wednesday': // chaining wed and thurs
  case 'thursday':
    console.log("Write code examples");
    break;
  case 'friday':
    console.log("Record videos");
    break;
  case 'saturday':
  case 'sunday':
    console.log("Enjoy the weekend")    
    break;
  default: // if all above fail, like our else block
    console.log("Not a valid day!");
}

// if else statement for above 
// its not very dry

if (day === "monday") {
  console.log("plan course structure");
} else if (day === "tuesday") {
  console.log("Prepare theory videos");
} else if (day === "wednesday" || day === "thursday") {
  console.log("Write code examples");
} else if (day === "friday") {
  console.log("Record videos");
} else if (day === "saturday" || day === "sunday") {
  console.log("Enjoy weekend");
} else {
  console.log("Not a valid day!");
}
// =======================================================================================================================================

// =====================================================  Statements and Expressions =====================================================
/*
difference between statements and expressions

1.Expression - an expression is a piece of code that produces... a value (that can be evaluated to a value)
  5+2+3
  1991
  true
  false && true && !false 

2.Statements - are the bigger pieces of code that is executed which does not produce a value on itself...
  if (25 > 50) {
    const welcome = "hello world";
  }

we can compare this with normal spoken languages. And so in this example above, a declaration is like a complete sentence
and expressions are like the words that make up the sentences.

*/
// =======================================================================================================================================

// =================================================  The Conditional (Ternary) Operator =================================================
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator

/*
The conditional (ternary) operator is the only JavaScript operator that takes three operands: 
a condition followed by a question mark (?), then an expression to execute if the condition is truthy 
followed by a colon (:), and finally the expression to execute if the condition is falsy.
*/

// condition ? expression if true : expression if false

const personAge = 18; 

const canDrink = personAge >= 18 ? 'is allowed to drink 🥂' : 'is not old enough to drink ✋';

console.log('Imogen', canDrink);

// if else statement for above

if (personAge > 18) {
  console.log("Can drink");
} else {
  console.log("Can not drink");
}

// excercise tip calculator

//1
const billValue = 275;
const tipAmount = billValue >= 50 && billValue <= 300 ? 15 : 20;
const tip = (tipAmount/100) * billValue;
const totalBillValue = tip + billValue;

console.log(`Your bill is ${billValue} and you should tip ${tip}, and pay a total of ${totalBillValue}`);

//2
const bill = 275
const toTip = bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.20;
console.log(`You should tip: ${toTip} ontop of: ${bill} and pay a total of: ${bill + toTip}`);

// =======================================================================================================================================

// comments
// single line comments
/* this
is a multi
line comment
*/