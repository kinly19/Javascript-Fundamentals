'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

// ==================================================== What is Asynchronous code ======================================================
/*
  Asynchronous programming
  - A technique that enables your program to start a potentially long-running task but still allow your program to be 
    responsive to other events while that task runs, rather than having to wait until that task has finished. 
    Once that task has finished, your program is presented with the result.
  - Code is executed after a task that runs in the background finishes.
  - Asynchronous code is 'non-blocking'.
  - Execution does not wait for an asynchronous task to finish its work.

  Synchronous
  - Code runs in sequence which means that each operation must wait for the previous operation to complete before executing.
  - Most code is synchronous.
  - Synchronous code is executed line by line.
  - Each line of code waits for the previous line to finish.
  - Long running operations block code execution. 
*/
// ===================================================================================================================================
