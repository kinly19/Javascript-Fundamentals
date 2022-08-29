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
    - The easiest and most straightforwards way of linking an object to a prototype object.
    
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
  - Constructor functions are just normal functions, but the difference is that we call a constructor function with the new operator.
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

// =========================================================== Static Methods ========================================================
/*
  Static methods are created inside of the class constructor itself, and can only be called on the class (Class name space).
  non static methods (instance methods) are created inside of the classes .prototype which is why we can use prototypal inheritance.

  static keyword
  - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/static
  - defines a static method or property for a class, or a class static initialization block 
    static methods and static properties can not be called on instances of the class. 
    Instead, they're called on the class itself (directly on the classes name space).
*/

class Person3Cl {
  constructor(firstName) {
    // Below code is stored inside the object which is return from the constructor.
    this.firstName = firstName;

    // Creating an object(instance) creates a new method for each new object created by the Person3Cl.
    this.inside = function () {
      return 'Inside';
    };
  }

  // Instance methods
  // Stored inside of the class .prototype.
  greet() {
    console.log(`Hello ${this.firstName}`);
  }

  // Static methods
  // Stored directly inside of the class constructor.
  static staticGreet() {
    console.log(`Hello`);
  }
}

const jason = new Person3Cl("Jason");

// Instance methods
jason.greet(); // Hello Jason

// Static methods
/*
jason.staticGreet() // Returns an error
*/

Person3Cl.staticGreet(); // Hello

// ===================================================================================================================================

// ============================================================ Object.create ========================================================
/*
Object.create()
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create 
- Method creates a new object, using an existing object as the prototype... of the newly created object.
- There is still the idea of prototypal inheritance. However, there are no .prototype properties involved. 
And also no constructor functions, and no new operator.
- We use Object.create to manually set the prototype of an object, to any object we want.
- The object created with Object.create, its prototype will be/come from the object we point it to.
*/

// Object literal
const PersonProto = {
  calcAge() {
    console.log(2022 - this.birthYear);
  },
  
  init(name, birthYear) {
    this.firstName = name;
    this.birthYear = birthYear;
  },
  
  locationThis() {
    // 'This' keyword used inside of a method always points to the object calling that method.
    console.log(this);
  },
};

const steven = Object.create(PersonProto); // setting 'steven' object prototype to be/come from 'PersonProto' object.
console.log(PersonProto.isPrototypeOf(steven)); // true
console.log(steven.__proto__ === PersonProto); // true


steven.init("Steven", 1985);
steven.calcAge();
steven.locationThis(); // steven object

// ===================================================================================================================================

// ========================================================= Coding Challenge #2 =====================================================
/*
  Your tasks:
  1. Re-create Challenge #1, but this time using an ES6 class (call it 'CarCl')
  2. Add a getter called 'speedUS' which returns the current speed in mi/h (divide 
  by 1.6)
  3. Add a setter called 'speedUS' which sets the current speed in mi/h (but 
  converts it to km/h before storing the value, by multiplying the input by 1.6)
  4. Create a new car and experiment with the 'accelerate' and 'brake'
  methods, and with the getter and setter.
  Test data:
  § Data car 1: 'Ford' going at 120 km/h
*/

class CarCl {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  // Methods
  accelerate() {
    console.log(`${this.make} is going at ${(this.speed += 10)} km/h`);
  }

  brake() {
    console.log(`${this.make} is going at ${(this.speed -= 10)} km/h`);
  }

  // Get speed in mi/h
  get speedUS() {
    return this.speed / 1.6;
  }

  // set speed from mi/h to km/h
  set speedUS(speed) {
    this.speed = speed * 1.6;
  }
}

const car3 = new CarCl("Ford", 120);
car3.accelerate();
car3.brake();
console.log(car3.speedUS); // 75mi/h
car3.speedUS = 250;
console.log(car3.speedUS); // 250mi/h
console.log(car3.speed); // 400 km/h

// ===================================================================================================================================

// ========================================= Inheritance Between "Classes": Constructor Functions ====================================
/*
  call() 
  - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call
  - Method calls the function with a given 'this' value and arguments provided individually.

  - The difference between call() and bind() is that the call() sets the this keyword and executes the function immediately and 
    it does not create a new copy of the function, while the bind() creates a copy of that function and sets the this keyword
*/

const Person3 = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};

Person3.prototype.calcAge = function () {
  console.log(2022 - this.birthYear);
};

const Student = function(firstName, birthYear, course) {
  /*
    Calling 'Person3' function without the new keyword, we are essentially calling a normal function
    The 'This' keyword inside of a function is undefined. We use the 'call' method to set the keyword 'this' 
    to be of the 'this' value inside of 'Person3' function. 
  */
  Person3.call(this, firstName, birthYear);
  this.course = course;
};

// Linking prototypes
// Set Student .prototype object to inherit from 'Person3' .prototype
Student.prototype = Object.create(Person3.prototype);

// Dont! inherit/link prototypes like this.
// Student.prototype = Person3.prototype.

// Always link prototypes before adding any methods.
Student.prototype.intro = function () {
  console.log(`My name is ${this.firstName} and i study ${this.course}`);
};

// Creating instance
const mike = new Student("Mike", 1995, "Computer science");
mike.intro(); // My name is Mike and i study Computer science (comes from Student)
mike.calcAge(); // 27 (comes from Person3)

// mike and Student .prototype both point to Person3.prototype 
console.log(Person3.prototype.isPrototypeOf(mike)); // true
console.log(Person3.prototype.isPrototypeOf(Student.prototype)); // true
// mike.prototype -> Student.prototype Student.prototype -> Person3.prototype

// Prototypal chain
console.log(mike.__proto__);
console.log(mike.__proto__.__proto__);
console.log(mike instanceof Student); // true
console.log(mike instanceof Person3); // true
console.log(mike instanceof Object); // true

// Set constructor property to reference the actual constructor function that created the instance object
Student.prototype.constructor = Student;
console.dir(Student.prototype.constructor);

// ===================================================================================================================================

// ========================================================= Coding Challenge #3 =====================================================
/*
  Your tasks:
    1. Use a constructor function to implement an Electric Car (called 'EV') as a child
    "class" of 'Car'. Besides a make and current speed, the 'EV' also has the 
    current battery charge in % ('charge' property)
    2. Implement a 'chargeBattery' method which takes an argument 
    'chargeTo' and sets the battery charge to 'chargeTo'
    3. Implement an 'accelerate' method that will increase the car's speed by 20, 
    and decrease the charge by 1%. Then log a message like this: 'Tesla going at 140 
    km/h, with a charge of 22%'
    4. Create an electric car object and experiment with calling 'accelerate', 
    'brake' and 'chargeBattery' (charge to 90%). Notice what happens when 
    you 'accelerate'! Hint: Review the definiton of polymorphism �
    Test data:
    § Data car 1: 'Tesla' going at 120 km/h, with a charge of 23%
*/

const Car4 = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

Car4.prototype.accelerate = function () {
  this.speed += 20;
  console.log(`${this.make} is going at ${this.speed} km/h`);
};

Car4.prototype.brake = function () {
  this.speed -= 20;
  console.log(`${this.make} is going at ${this.speed} km/h`);
};

const EV = function (make, speed, charge) {
  Car4.call(this, make, speed);
  this.charge = charge;
};

// Inherit/Link prototypes
EV.prototype = Object.create(Car4.prototype);

EV.prototype.chargeBattery = function (chargeTo) {
  this.charge = chargeTo;
};

EV.prototype.accelerate = function () {
  this.speed += 20;
  this.charge--;

  console.log(`${this.make} going at ${this.speed}Km/h, with a charge of ${this.charge}%`);
};

const tesla = new EV("Tesla", 120, 23);
tesla.chargeBattery(50);
tesla.accelerate();
tesla.brake();
tesla.accelerate();

console.log(tesla instanceof (EV));
console.log(tesla instanceof (Car4));
console.log(Car4.prototype.isPrototypeOf(EV.prototype)) // true

// tesla.prototype --> EV.prototype EV.prototype --> Car4 (Because of Object.create)

/*
Even though Car4 and EV have the exact same method names, if there are any methods or properties with the same name in a prototype chain,
Javascript will use the first one which appears in the prototype chain (polymorphism)
*/

// ===================================================================================================================================

// ============================================= Inheritance Between "Classes": ES6 Classes ==========================================
/*
  extends
  - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/extends 
  - Keyword is used in class declarations or class expressions to create a class that is a child of another class.
  - The extends keyword can be used to subclass custom classes as well as built-in objects
  - Any constructor that can be called with new keyword (that is, it has the prototype property) can be the candidate for the parent class.
  - Will set the prototype of the ChildClass and its .prototype
  - Inherit one class from another class.

  super
  - Keyword is used to access properties on an object literal or class's [[Prototype]], or invoke a superclass's constructor.
  - In English The super keyword is used to call the constructor of its parent class to access the parent's properties and methods.
*/

// ES6 class
class Person4Cl {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  calcAge() {
    console.log(2022 - this.birthYear);
  }

  greet() {
    console.log(`Hey ${this.fullName}`);
  }

  get age() {
    return 2022 - this.birthYear;
  }

  set fullName(name) {
    if (name.includes(' ')) this._fullName = name;
    else alert(`${name} is not a full name!`);
  }

  get fullName() {
    return this._fullName;
  }
}

// Inherit Person4Cl (Link prototypes)
class StudentCl extends Person4Cl {
  constructor(fullName, birthYear, course) {
    /*
      originally with the constructor function approach 
      we called the constructor function (normal function without 'new' keyword) 
      with the 'call' keyword to set the 'this' keyword for that function

      Person4Cl.call(this, fullName, birthYear);
    */

    /*
     super() is basically the constructor function of the parent class
     and does the the same thing as above, sets 'this' keyword for this subclass
    */

    // Always needs to happen first before using 'this'
    super(fullName, birthYear);
    this.course = course;
  }

  intro() {
    console.log(`Hello my name is ${this.fullName} and i am studying ${this.course}`);
  }
}

const martha = new StudentCl("Martha Jones", 1999, "Web Development");
// Methods from Person4Cl
martha.greet();
martha.calcAge();
martha.age;
// Methods from StudentCl
martha.intro();

// Prototype chain
console.log(martha instanceof (StudentCl)); // true
console.log(martha instanceof (Person4Cl)); // true
console.log(martha instanceof Object); // true
// martha prototype --> StudentCl.prototype StudentCl.prototype --> Person4Cl.prototype Person4Cl.prototype --> Object.prototype.

// ===================================================================================================================================

// ======================================== Inheritance Between "Classes": Object.create =============================================
/*
  Object.create allows us to set an existing object...(the actual object) as the prototype of the newly created object.
*/

const PersonProto2 = {
  calcAge() {
    console.log(2022 - this.birthYear)
  },

  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

// set prototypes
const alexa = Object.create(PersonProto2);
const StudentProto = Object.create(PersonProto2);

// Create method inside of 'StudentProto' (call 'init' function from 'PersonProto2' to set values for 'firstName', 'birthYear' and add/set own property)
StudentProto.init = function (firstName, birthYear, course) {
  PersonProto2.init.call(this, firstName, birthYear);
  this.course = course;
};

StudentProto.intro = function () {
  console.log(`Hello my name is ${this.firstName} and i study ${this.course}`);
};

const jay = Object.create(StudentProto);
jay.init("Jay", 1999, "Javascript");
jay.intro();

alexa.init("Alexa", 1999);
alexa.calcAge(); // 23

console.log(alexa.prototype === PersonProto2.prototype); // true
console.log(StudentProto.prototype === PersonProto2.prototype); // true
console.log(jay.prototype === StudentProto.prototype); // true

// ===================================================================================================================================

// ============================================= Another Class Example Fake Encapsulation ============================================
/*
  Navigator.language
  - https://developer.mozilla.org/en-US/docs/Web/API/Navigator/language
  - Read-only property returns a "string" representing the preferred language of the user, usually the language of the browser UI.

  Encapsulation: Protected Properties and Methods
  - Encapsulation means to keep some properties and methods private inside the class.

  - https://javascript.info/private-protected-properties-methods
  - Protected properties are usually prefixed with an underscore _.
  - This is not actually enforced on the language, we can still change private properties and methods outside a class but there is a well 
    known convention between programmers that such properties and methods should not be accessed from the outside the class.
*/

class Account {
  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    this.locals = navigator.language;
    // Protected properties (property names prefixed with an underscore _)
    this._movements = [];
    this._pin = pin;
    console.log(`Thank you ${this.owner} for opening an account with us`);
  }

  deposit(movement) {
    this._movements.push(movement);
  }

  withdraw(value) {
    this._movements.push(-value);
  }

  getMovements() {
    return this._movements;
  }

  showTotalDeposits() {
    this.totalDeposits = this._movements.reduce((prev, cur) => {
      if (cur > 0) {
        return prev + cur;
      } else {
        return prev;
      }
    }, 0);

    return this.totalDeposits;
  }

  // set totalDeposits(deposits) {
  //   this._totalDeposits = deposits;
  // }

  // get totalDeposits() {
  //   return this._totalDeposits
  // }
}

// Object/Class Instance
const acc1 = new Account("Jonas", "EUR", 1111);

// Interacting with properties
// Not a good way (interact with properties via methods)
acc1._movements.push(250);
acc1._movements.push(-250);
 
// Better
acc1.deposit(1000);
acc1.withdraw(-250);

// Allowing access to private properties
console.log(acc1.getMovements());

console.log(acc1.showTotalDeposits());
console.log(acc1);
console.log("Total deposits:" + acc1.totalDeposits);

// ===================================================================================================================================

// ========================== Encapsulation: Private Class Fields and Methods (Javascript Class field) ===============================
/*
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Public_class_fields
  1. Public fields
  2. Private fields
  3. Public methods
  4. Private methods
  // (There are also static versions for each of the above 8 in total)
*/

class Account2 {
  // Always outside the constructor
  // 1. Public fields (Avaliable on all instances and not on the prototype)
  locale = navigator.language;

  // 2. Private fields prefixed with # (instances)
  #movements = [];
  #pin;

  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    this.#pin = pin;
    console.log(`Thank you ${this.owner} for opening an account with us`);
  }

  // 3. Public methods (exactly the same)
  // Public interface of our class
  deposit(movement) {
    this.#movements.push(movement);
  }

  withdraw(value) {
    this.#movements.push(-value);
  }

  getMovements() {
    return this.#movements;
  }

  getAccountPin() {
    return this.#pin;
  }

  requestLoan(value) {
    if (this.#approveLoan(value)) {
      this.deposit(value);
      console.log('Loan Approved');
    }
  }

  getMessage() {
    return this.#privateMethod();
  }

  // 4. Private methods names prefixed with #
  #approveLoan(value) {
    return true;
  }

  #privateMethod() {
    return 'Hello World';
  }
}

const acc2 = new Account2("Emily", "EUR", 2222);
acc2.deposit(1000);
acc2.withdraw(-250);
acc2.requestLoan(1000);

// Access private properties/methods from outside a class
// acc2.#movement; // Returns error
// acc2.#pin; // Returns error
// cacc2.#privateMethod(); // Returns error
// acc2.#approveLoan(); // Property '#approveLoan' is not accessible outside class 'Account2'

// Can still access private properties via methods
console.log(acc2.getMovements());
console.log(acc2.getAccountPin());
console.log(acc2.getMessage());
console.log(acc2);

// ===================================================================================================================================

// ======================================================= Chaining Methods ==========================================================
/*
  Method chaining
  - In JavaScript, method chaining is when methods are invoked from one object to another without creating intermediate variables. 
    In otherwords it is a single statement of multiple method invocations which we instruct our program to perform.

  To chain methods all we have to do is return the object itself at the end of a method that we want to be chainable.
*/

class Account3 {
  // Public
  locale = navigator.language;

  // Private
  #movements = [];
  #pin;

  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    this.#pin = pin;
  }

  // Public methods
  deposit(value) {
    this.#movements.push(value);
    // Chaining methods
    // Return 'this' (the whole acc3 object) allows us to chain on methods.
    return this;
  }

  withdraw(value) {
    this.#movements.push(-value);
    return this;
  }

  getMovements() {
    return this.#movements;
  }

  requestLoan(value) {
    if (this.#approveLoan(value)) {
      this.#movements.push(value);
      console.log('Loan Approved');
      return this;
    }
  }

  // Private methods
  #approveLoan(value) {
    return true;
  }
}

const acc3 = new Account3('Lisa', 'EUR', 3333);
// Chaining methods (see line 1009)
acc3.deposit(500).withdraw(100).requestLoan(1000);

// ===================================================================================================================================

// ===================================================================================================================================