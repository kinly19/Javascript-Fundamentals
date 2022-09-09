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

// ============================================== AJAX Call: XMLHttpRequest (Old) ====================================================

// Reuse
const getCountry = (country) => {

  // 1. Make new request
  const request = new XMLHttpRequest();
  // 2. Make AJAX call, with type and url
  request.open('GET', `https://restcountries.com/v2/name/${country}`);
  // 3. Send the request (async)
  request.send();
  // 4. Store data once data has finished fetching
  request.addEventListener('load', function () {
    console.log(this.responseText);
    // convert text into an object we can use with JSON.parse()
    const [data] = JSON.parse(this.responseText);
    // returns an array object, can use array destructuring just to pull the object out of the array it is in.
    console.log(data);

    // create html
    const html = `
      <article class="country">
        <img class="country__img" src=${data.flag} />
        <div class="country__data">
          <h3 class="country__name">${data.name}</h3>
          <h4 class="country__region">${data.region}</h4>
          <p class="country__row"><span>👫</span>${data.population}</p>
          <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
          <p class="country__row"><span>💰</span>${data.currencies[0]['name']}</p>
        </div>
      </article>  
    `;

    // Add html into DOM
    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1;
  });
}; 

// reusing request
// The order in which these cards show in the DOM, depends on which AJAX call finishes first
// If we wanted these AJAX requests done in a predefined order, we could chain the request together (see 'callback hell' notes).

// getCountry("gb");
// getCountry("usa");
// getCountry("canada");

// ===================================================================================================================================

// ======================================================= Welcome to Callback Hell ==================================================
/*
  Callback Hell
  - Is essentially nested callbacks stacked below one another forming a pyramid structure. Every callback depends/waits 
    for the previous callback, thereby making a pyramid structure that affects the readability and maintainability of the code
*/

// Example 1.
const renderCountry = (data, className = '') => {
  const html = `
  <article class="country ${className}">
    <img class="country__img" src=${data.flag} />
    <div class="country__data">
      <h3 class="country__name">${data.name}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span>${data.population}</p>
      <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
      <p class="country__row"><span>💰</span>${data.currencies[0]['name']}</p>
    </div>
  </article>  
`;
  // Add html into DOM
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

const getCountryAndNeighbour = country => {
  
  // AJAX call country 1
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v2/name/${country}`);
  request.send();

  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    console.log(data);

    // Render country
    renderCountry(data);

    // Get neighbour country (2)
    const neighbour = data.borders?.[0];

    if (!neighbour) {
      console.log('Do nothing');
      return;
    }

    // Second request
    const request2 = new XMLHttpRequest();
    request2.open('GET', `https://restcountries.com/v2/alpha/${neighbour}`);
    request2.send();

    request2.addEventListener('load', function () {
      const data2 = JSON.parse(this.responseText);
      console.log(data2);

      renderCountry(data2, 'neighbour');

      // Get neighbour country of neighbour (3rd request)
        // Get neighbour country of neighbour (4th request)
          // Get neighbour country of neighbour (5th request)
            // so on and so forth (Call back hell)
    });
  });
}; 

// getCountryAndNeighbour("gb");
// getCountryAndNeighbour("Australia");


// Example 2.
// Nasty stuff
/*
  setTimeout(() => {
    console.log('1 seconds passed');
    setTimeout(() => {
      console.log('2 seconds passed');
      setTimeout(() => {
        console.log('3 seconds passed');
        setTimeout(() => {
          console.log('4 seconds passed');
          setTimeout(() => {
            console.log('5 seconds passed');
          }, 1000);
        }, 1000);
      }, 1000);
    }, 1000);
  }, 1000);
*/

// ===================================================================================================================================

// =================================================== Promises and the Fetch API ====================================================
/*
  Promise 
  - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
  - Object represents the eventual completion (or failure) of an asynchronous operation and its resulting value.
  - A promise is an object that may produce a single value some time in the future: either a resolved value, or a reason that 
    it's not resolved (e.g., a network error occurred). A promise may be in one of 3 possible states: fulfilled, rejected, or pending.
  - A container for a future value.
  - No longer need to rely on events and callbacks passed into async function to handle async results (e.g XMLHttpRequest).
  - Can chain promises for a sequence of asyn operations, avoiding nested callbacks (callback hell).
  - A promise is only settled once.

  Promise lifecycle
    1. Pending
    2. Settled (fulfilled or rejected)

  Fetch() api
  - https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
  - The Fetch API provides an interface for fetching resources (including across the network). It will seem familiar to anyone who 
    has used XMLHttpRequest, but the new API provides a more powerful and flexible feature set.
  - returns a promise
*/

const request3 = fetch(`https://restcountries.com/v2/alpha/gb`);
// console.log(request3);

// ===================================================================================================================================

// ===================================================================================================================================