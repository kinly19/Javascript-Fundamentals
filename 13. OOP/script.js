'use strict';

// ================================================= What is Object-Oriented Programming =============================================
/*
  OOP
  - Object-oriented programming is a programming paradigm based on the concept of objects.
  - We use objects to model (describe) real-world or abstract features.
  - Objects may contain data (properties) and code (methods). By using objects, we pack data
    and the corresponding behavior into one block.
  - In OOP, objects are self-contained pieces/blocks of code.
  - Objects are building blocks of applications, and interact with one another.
  - Interactions happens through a public interface (API): methodes that the code outside of the object
    can access and use to communicate with the object.
  - OOP was developed with the goal of organizing code, to make it more flexible and easier to maintain (avoid "spaghetti code").
*/

// ===================================================================================================================================

// ========================================================== OOP in Javascript ======================================================
/*
  OOP is done differently in Javascript.

  Classical OOP: Classes
  Class 
  Instance

  - Objects (instances) are instantiated from a class
  - Behavior (methods) is copied from class to all instances.

  OOP in Js: Prototypes
  Prototype
  Object

  - Objects are linked to a prototype object
  - Prototypal inheritance: The prototype contains methods (behavior) that
    are accessible to all objects linked to that prototype.
  - Behavior (methods) is delegated to the linked prototype object. (Prototypal inheritance/delegation)
    
  3 ways of implementing prototypal inheritance in javascript.
    
    Constructor functions
    - Technique to create objects from functions.
    - This is how built-in objects like arrays, maps, or sets are actually implemented.
    ES6 Classes
    - Modern alternative to constructor function syntax
    - "Syntactic sugar" behind the scenes, ES6 classes work exactly like the constructor functions.
    - ES6 classes still do NOT behave like classes in "Classical OOP". 
    Object.create()
    - The easiest and most straightforwardss way of linking an object to a prototype object.
    
    The 4 pillars of OOP are still valid
    - Abstraction
    - Encapsulation
    - Inheritance
    - Polymorphism
    
*/
// ===================================================================================================================================

// ============================================== Constructor Functions and the new Operator =========================================
/*
  Constructor function
  - Is a special function that creates and initializes an object instance of a class. 
    In JavaScript, a constructor gets called when an object is created using the new keyword. 
    The purpose of a constructor is to create a new object and set values for any existing object properties.
  - Consstructor functions are just normal functions, but the difference is that we call a constructor function with the new operator.
  - Constructor functions need to use functions with the function keyword (for use 'this').

  - In OOP there is this convention that constructor functions always start with a capital letter.

  new operator
  - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/new 
  - Lets developers create an instance of a user-defined object type or of one of the built-in object types that has a constructor function.
  
*/
// Funct expression or declaration will work
const Person = function (firstName, birthYear) {
  console.log(this) //--> {} (Person is just the name of the constructor function).

  this.firstName = firstName;
  this.birthYear = birthYear;

  // Dont create methods inside of constructor functions (Create them inside the prototype instead)
  /*
  this.calcAge = function () {
    console.log(2037 - this.birthYear)
  }
  */
}

// prototype approach for methods
// Create a method inside the 'Person' prototype, use inheritance to use that method
Person.prototype.greetUser = function () {
  console.log(`Hello ${this.firstName}`);
};

const jonas = new Person("Jonas", 1991);
console.log(jonas);
// {firstName: "Jonas",birthYear: 1991}

// When calling a function with the 'new' keyword, the function will be used as a constructor.
// 'new' keyword will do the following things:
// 1. New empty object {} is created.
// 2. function is called, 'this' keyword will point to that object (this = {}).
// 3. Newly created object is then linked to prototype (class object prototype?).
// 4. function automatically returns object {}

// Check if an object is an instance of a class 
console.log(jonas instanceof Person); // true
// Using method
jonas.greetUser();

// ===================================================================================================================================

// ============================================================== Prototypes =========================================================
/*
  Prototypes
  - https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Object_prototypes
  - Prototypes are the mechanism by which JavaScript objects inherit features from one another
  - Each object has its own built-in property called 'prototype'
  - prototype itself is just an object so the prototype will have its own prototype, making what's called a prototype chain.

  - Each and every function automatically has a property called 'prototype'.

*/

// Constructor function
const Person2 = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
}

// Creating an instance (new object) with 'new' keyword
const sarah = new Person2("Sarah", 30);

// Creating a method inside of Person2 prototype
Person2.prototype.greetUser = function () {
  console.log(`Hello ${this.firstName}`);
  console.log(2037 - this.birthYear);
};

// Using Prototypal inheritancee to access methods inside of the constructor functions prototype property
// The prototype is the property which comes from the constructor function
sarah.greetUser();

console.log(sarah.__proto__);
console.log(sarah.__proto__ === Person2.prototype); // true
// The prototype is the prototype used for sarah object
console.log(Person2.prototype.isPrototypeOf(sarah)); // true

/* The prototype of Person2.prototype is not actually the prototype of 'Person2' but essentially the prototype which will be used for all objects created with 
 the 'Person2' constructor function */
console.log(Person2.prototype.isPrototypeOf(Person2)); //false
console.log(Person2.prototype.isPrototypeOf(sarah)); // true


// Can also set properties of a prototype
Person2.prototype.species = "Human";
console.log(sarah);

// ===================================================================================================================================

// ============================================ Prototypal Inheritance and The Prototype Chain ======================================= 
/*

  Each object and function has its own 'prototype' property.
  
  'Person2' constructor function has its own prototype property (Person2.prototype), which will be used for any instances created with 
  Person2 constructor function (any objects created by Person2), but this is not... the prototype of 'Person2' itself. 

  When a function is called with the 'new' operator, a new object is created instantly. This new object has its 'this' keyword set to
  that newly created object and then the important part, the object is then linked to the constructor functions prototype property.
  This happens internally by adding the '.__proto__' property to the new object. (Person2.prototype is now the newly created object prototype).
  __proto__ always points to an object prototype (Person2.prototype).

  sarah.greetUser()
  when calling the method 'greetUser' inside of 'sarah' object. Javascript will look to see if sarah object has that method. if a property 
  or a method cannot be found in a certain object JavaScript will then look into its prototype (Person2.prototype), which is where 'greetUser'
  is found and used. This behavior is called prototypal inheritance or delegation.
  sarah {} --> Person2.prototype {greetUser: ƒ ()}


  When creating an object literal (just a plain object with curly braces), the built in object constructor function is used to create 
  our object which also has its own prototype property (Object.prototype)
  Person2 prototype is Object.prototype, Same logic with sarah object.
  This entire series of links between the objects is what is called the prototype chain.
  sarah.__proto__ --> Person2.prototype Person2.__proto__ --> Object.prototype Object.__proto --> null
  
  Object.prototype has its own prototype which is set to null
  Object.prototype.__proto__ --> null

*/

// ===================================================================================================================================

// ============================================== Prototypal Inheritance on Built-In Objects ========================================= 
/*
  Object.prototype.__proto__
  - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/proto
  - Deprecated
  
  Object.getPrototypeOf()
  - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getPrototypeOf
  - The Object.getPrototypeOf() method returns the prototype (i.e. the value of the internal [[Prototype]] property) of the specified object.
*/

console.log(sarah.__proto__); // --> Person2.prototype
console.log(sarah.__proto__.__proto__); // Person2 prototype ---> Object
console.log(sarah.__proto__.__proto__.__proto__); // Object prototype ---> null

// Show the actual constructor function
console.dir(Person2.prototype.constructor);

// Prototypes of arrays
// When creating an array, js uses its built in Array constructor
const arr = [3, 6, 5, 7, 8, 9]; // new Array === []

// __proto__ is non standard and deprecated use (Object.getPrototypeOf())
console.log(arr.__proto__);
console.log(arr.__proto__ === Array.prototype); // true
console.log(Object.getPrototypeOf(arr)); 
console.log(Object.getPrototypeOf(arr) === Array.prototype); // true
// Array.prototype is of the Object
console.log(Object.getPrototypeOf(Array.prototype) === Object.prototype);// true
console.log(Object.prototype.isPrototypeOf(Array)); // true
Object.prototype === null // true

// Adding any new method inside of Array.prototype
// Extending the prototype of a built-in object is generally not a good idea.
Array.prototype.hello = function (name) {
  return `${name} says: Hello World`;
};

// Remember the keyword 'this' when used in a function as a method always points to the object calling that method
Array.prototype.unique = function () {
  return [...new Set(this)];
}

// Elements and functions
// Shows us the prototypes of an h1 element and all prototypes it can inherit (prototype chain).
const h1 = document.querySelector("h1");
console.dir(h1);

// This is the reason why we can actually call methods on functions. It's because they are objects and objects have prototypes. And in this case, this function prototype. 
console.dir(x => x+1);

// ===================================================================================================================================  

// ========================================================= Coding Challenge #1 =====================================================
/*
  Your tasks:
  1. Use a constructor function to implement a 'Car'. A car has a 'make' and a 
  'speed' property. The 'speed' property is the current speed of the car in 
  km/h
  2. Implement an 'accelerate' method that will increase the car's speed by 10, 
  and log the new speed to the console
  3. Implement a 'brake' method that will decrease the car's speed by 5, and log 
  the new speed to the console
  4. Create 2 'Car' objects and experiment with calling 'accelerate' and 
  'brake' multiple times on each of them
  Test data:
   Data car 1: 'BMW' going at 120 km/h
   Data car 2: 'Mercedes' going at 95 km/h
*/

// Constructor
const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
}

// Methods
Car.prototype.accelerate = function () {
  // this.speed = this.speed + 10;
  this.speed += 10;
  if (this.speed > 300) console.log(`${this.make} ended up as a write-off`);
  else console.log(`${this.make} going at ${this.speed} km/h`);
};

Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(`${this.make} going at ${this.speed} km/h`);
};

// Instances
const car1 = new Car("BMW", 120);
const car2 = new Car("Mercedes", 95);

console.log(Car.prototype.isPrototypeOf(car1)); // true
console.log(Car.prototype.isPrototypeOf(car1) && Object.prototype.isPrototypeOf(Car) && Object.getPrototypeOf(Object.prototype) === null); // true
// ===================================================================================================================================

// ============================================================= ES6 Classes =========================================================
/*
  Classes
  - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes
  - Classes are a template for creating objects. They encapsulate data with code to work on that data. Classes in JS are built 
    on prototypes but also have some syntax and semantics that are not shared with ES5 class-like semantics.
  - Just syntactic sugar they still implement prototypal inheritance behind the scenes but with a syntax that makes more sense 
    to people coming from other programming languages.

  - Classes are in fact "special functions", and just as you can define function expressions and function declarations, 
    the class syntax has two components: class expressions and class declarations

  - Hoisting
    An important difference between function declarations and class declarations is that while functions can be called in code 
    that appears before they are defined, classes must be defined before they can be constructed.

  - Are first-class function.
  - Always executed in strict mode.
*/

// Class declarations
class PersonCl {
  constructor(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  }
  // Methods
  calcAge() {
    console.log(2022 - this.birthYear);
  }
}

/* ES6 classes allow us to define methods all within the classes code block, the methods will still be on the 
prototype of the class object itself and not in the object returned from constructor.*/
console.dir(PersonCl);

// Instance
const jessica = new PersonCl("Jessica", 1996);
jessica.calcAge();
console.log(PersonCl.prototype.isPrototypeOf(jessica)); // true
console.log(Object.getPrototypeOf(jessica) === PersonCl.prototype); // true

// The class really just hides the true nature of prototypal inheritance in JavaScript
// which is why we can still add methods outside manually into the prototype.
PersonCl.prototype.greetUser = function () {
  console.log(`Hello ${this.firstName}`);
};
jessica.greetUser();

// ===================================================================================================================================

// ========================================================= Setters and Getters =====================================================
/*
  getter
  - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get
  - The get syntax binds an object property to a function that will be called when that property is looked up.

  setter
  - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/set
  - The set syntax binds an object property to a function to be called when there is an attempt to set that property.
*/

const account = {
  owner: 'Jessica',
  movements: [200, 300, 500],

  get latest() {
    return this.movements[this.movements.length - 1];
    // this.movements.slice(-1).pop();
  },

  set movement(mov) {
    this.movements.push(mov);
  },
};

// Using getters.
// Instead of calling the method like we usually do, we just use it like an actual property.
console.log(account.latest);

// Using setters.
// Set them like normal properties
account.movement = 5000;
account.movement = 7000;
console.log(account.movements);

// Classes (getter and setters)
class Person2Cl {
  constructor (fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  // Setting a property which already exist (fullName from constructor)
  set fullName(name) {
    console.log(name)
    if (name.includes(" ")) this._fullName = name;
    else alert(`${name} is not a full name`);
  }

  // Getting property from setter
  get fullName() {
    return this._fullName;
  }

  get age() {
    return 2022- this.birthYear;
  }

  set location(str){
    this.address = str;
  }
}

const alysia = new Person2Cl("Alysia Davis", 1990);
console.log(alysia.age);
alysia.address = "Somewhere in London";
console.log(alysia);

// ===================================================================================================================================
