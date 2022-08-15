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
