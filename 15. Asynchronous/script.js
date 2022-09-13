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

// ======================================================= Consuming Promises ========================================================
/*
  Response.json()
  - https://developer.mozilla.org/en-US/docs/Web/API/Response/json
  - Method of the Response interface takes a Response stream (body of the response object) and reads it to completion. 
    It returns a promise which resolves with the result of parsing the body text as JSON.
  - It allows us to read and use the data within the response body.

  Promise.prototype.then()
  - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then
  - The then() method returns a Promise (object). It takes up to two arguments: a success handler and an error handler.
*/

const getCountryData = country => {
  fetch(`https://restcountries.com/v2/name/${country}`)
    // Once promise is fullied
    .then(res => {
      // Do something with returned object from the promise (which is the 'res' object)
      // In order to use the data inside the body of the 'res' obj we have to use the json() method
      // json method (async function) returns another promise with the results of parsing the body text as JSON
      // We then return the promise from the json method in order to handle its promise.
      return res.json();
    })
    .then(data => {
      // Actual data from the body of 'res' object above.
      console.log(data[0]);
      // Render data into DOM
      renderCountry(data[0]);
    })
};

// Promises do not get rid of callbacks, we still use them but they remove callback hell...

// getCountryData("gb");

// ===================================================================================================================================

// ======================================================== Chaining Promises ========================================================

const getCountryAndNeighbour2 = country => {
  // 1st fetch
  fetch(`https://restcountries.com/v2/name/${country}`)
    .then(res => res.json())
    .then(data => {
      console.log(data);
      renderCountry(data[0]);
      const neighbourCountry = data[0].borders?.[0];

      // Only fetch for a neighbour country if we have one
      if (!neighbourCountry) return;

      // 2nd fetch
      // Whatever we return here inside this promise, will become the fulfilled value of the promise.
      return fetch(`https://restcountries.com/v2/alpha/${neighbourCountry}`);
    })
    .then(res2 => res2.json()) // this promise object comes from the returned fetch above
    .then(data2 => renderCountry(data2, 'neighbour'));
};

// getCountryAndNeighbour2('gb');
// ===================================================================================================================================

// ==================================================== Handling Rejected Promises ===================================================
/*
  Promise.prototype.catch() 
  - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/catch 
  - Method returns a Promise and deals with rejected cases only
  - Any promise within our promise chain which is rejected (errors), our block of code will automatically move striaght to the 'catch' block

  Promise.prototype.finally()
  - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/finally
  - Method schedules a function to be called regardless if a promise is fulfilled or rejected.
*/

const getCountryAndNeighbour3 = country => {
  // 1st fetch
  fetch(`https://restcountries.com/v2/name/${country}`)
    .then(res => res.json())
    .then(data => {
      renderCountry(data[0]);
      const neighbourCountry = data[0].borders?.[0];
      // fetch if we have
      if (!neighbourCountry) return;
      return fetch(`https://restcountries.com/v2/alphsa/${neighbourCountry}`);
    })
    .then(res2 => res2.json()) // this promise object comes from the returned fetch above
    .then(data2 => renderCountry(data2, 'neighbour'))
    // Catching any errors (rejected promises).
    .catch(err => {
      // Show error
      countriesContainer.insertAdjacentText('afterbegin', err);
    })
    .finally(() => (countriesContainer.style.opacity = 1));
};

// ===================================================================================================================================

// ===================================================== Throwing Errors Manually ====================================================

// Helper function to handle fetch/errors
const getJSON = (url, errMsg = "Something went wrong") => {
  // This function will return another promise
  return fetch(url).then(res => {
    if (!res.ok)
      return res.json().then(err => {
        console.log(err)
        throw new Error(`${errMsg}: ${err.message}`);
      });
    return res.json();
  });
};

const getCountryAndNeighbour4 = country => {
  // 1st fetch
  getJSON(`https://restcountries.com/v2/name/${country}`)
    .then(data => {
      renderCountry(data[0]);
      const neighbourCountry = data[0].borders?.[0];
      // Instead of returning nothing, we throw a new error for catch.
      if (!neighbourCountry) throw new Error("No neighbour found");
      // 2nd fetch
      return getJSON(`https://restcountries.com/v2/alpha/${neighbourCountry}`, "Country not found");
    })
    .then(data2 => renderCountry(data2, 'neighbour'))
    .catch(err => {
      countriesContainer.insertAdjacentText('beforeend', err.message);
    })
    .finally(() => (countriesContainer.style.opacity = 1));
};


// Without helper function
/*
const getCountryAndNeighbour4 = country => {
  // 1st fetch
  fetch(`https://restcountries.com/v2/names/${country}`)
    .then(res => {
      if (!res.ok) {
        return res.json().then(err => {
          throw new Error(`Something went wrong: ${err.message}`);
        });
      }
      return res.json();
    })
    .then(data => {
      renderCountry(data[0]);
      const neighbourCountry = data[0].borders?.[0];
      // fetch if we have
      if (!neighbourCountry) throw new Error("No neighbour found");
      // 2nd fetch
      return fetch(`https://restcountries.com/v2/alpha/${neighbourCountry}`);
    })
    .then(res2 => {
      if(!res2.ok) {
        return res2.json().then(err => {
          throw new Error(`Something went wrong: ${err.message}`);
        })
      }
      return res2.json();
    })
    .then(data2 => renderCountry(data2, 'neighbour'))
    .catch(err => {
      countriesContainer.insertAdjacentText('afterbegin', err.message);
    })
    .finally(() => (countriesContainer.style.opacity = 1));
};

*/

btn.addEventListener('click', () => {
  getCountryAndNeighbour4('australia');
});

// ===================================================================================================================================