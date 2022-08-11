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

