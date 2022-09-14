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

// ======================================================== Coding Challenge #1 ======================================================
/*
  PART 1
  1. Create a function 'whereAmI' which takes as inputs a latitude value ('lat') 
  and a longitude value ('lng') (these are GPS coordinates, examples are in test 
  data below).
  2. Do “reverse geocoding” of the provided coordinates. Reverse geocoding means 
  to convert coordinates to a meaningful location, like a city and country name. 
  Use this API to do reverse geocoding: https://geocode.xyz/api. The AJAX call 
  will be done to a URL with this format: 
  https://geocode.xyz/52.508,13.381?geoit=json. Use the fetch API and 
  promises to get the data. Do not use the 'getJSON' function we created, that 
  is cheating �
  3. Once you have the data, take a look at it in the console to see all the attributes 
  that you received about the provided location. Then, using this data, log a 
  message like this to the console: “You are in Berlin, Germany”
  4. Chain a .catch method to the end of the promise chain and log errors to the 
  console
  5. This API allows you to make only 3 requests per second. If you reload fast, you 
  will get this error with code 403. This is an error with the request. Remember, 
  fetch() does not reject the promise in this case. So create an error to reject 
  the promise yourself, with a meaningful error message

  PART 2
  6. Now it's time to use the received data to render a country. So take the relevant 
  attribute from the geocoding API result, and plug it into the countries API that 
  we have been using.
  7. Render the country and catch any errors, just like we have done in the last 
  lecture (you can even copy this code, no need to type the same code)

  Key
  We want to secure and hide this key properly.
  yourapikeyhere = 425330490038403167052x956 
*/

// Helper function fetch/error handling.
const fetchJSON = (url, errMsg = 'Something went wrong') => {
  return fetch(url)
    .then(res => {
      if (!res.ok) {
        return res.json().then(err => {
          console.log(err);
          throw new Error(errMsg);
        });
      }
      return res.json();
    })
    .then(data => {
      if (data.error)
        throw new Error(
          `${errMsg}: ${data.error.description}(${data.error.code})`
        );
      return data;
    });
};

const whereAmI = (lat, lng) => {
  console.log(`Your lat:${lat}, lng:${lng}`);

  // Example 1. With helper function.
  fetchJSON(`https://geocode.xyz/${lat}, ${lng}?geoit=json&auth=yourapikeyhere`)
    .then(data => fetchJSON(`https://restcountries.com/v2/name/${data.country}`,'Country not found'))
    .then(data2 => renderCountry(data2[0]))
    .catch(err => countriesContainer.insertAdjacentText('beforeend', err.message))
    .finally(() => (countriesContainer.style.opacity = 1));


  /* Example 2. direct without helper function
  fetch(`https://geocode.xyz/${lat}, ${lng}?geoit=json&auth=youapikeyhere`)
    .then(res => {
      if (!res.ok) throw new Error(res.statusText);
      return res.json();
    })
    .then(data => {
      return fetch(`https://restcountries.com/v2/name/${data.country}`);
    })
    .then(res => {
      if (!res.ok) throw new Error(res.statusText);
      return res.json();
    })
    .then(data2 => renderCountry(data2[0]))
    .catch(err =>
      countriesContainer.insertAdjacentText('beforeend', err.message)
    )
    .finally(() => (countriesContainer.style.opacity = 1));
  */
};

whereAmI(52.508, 13.381); //bi
// whereAmI(19.037, 72.873); // gm
// whereAmI(37.090240, -95.712891); // usa

// ===================================================================================================================================

// ========================================== Asynchronous Behind the Scenes: The Event Loop =========================================
/*
  Javascript runtime environment is a container which includes all the different pieces necessary to execute javascript code.
  The heart of javascript runtime is the engine itself, this is where code is actually executed (call stack) and where objects are stored
  in memory (heap).

  The important thing to note is javascript is only single threaded with only one thread of execution, meaning it can only do one thing at a time.
  There is no multi task happening in javascript.

  Web api environment 
  These are APIs provided to the engine, but are not actually the javascript language itself.

  Callback queue/Event queue
  This queue holds all the ready to be executed callback functions that are attached to some event that has occurred (tasks which need to be done next)

  Event loop
  Whenever the call stack is empty, the event loop will take callbacks (tasks) from the callback queue and add them into the callstack 
  so they can be executed. The event loop is the essential piece which makes asynchronous behavior possible in javascript. 
  its the reason why we can have a non blocking concurrency model in JavaScript.

  How it works together

  el = document.querySelector("img");
  el.src = "cat.jpg";
  el.addEventListener("load", function () {
    el.classList.add("fadeIn");
  });
  fetch("https://someurl.com/api")
    .then(res => console.log(res));


  1. We select an image element, which is executed inside the call stack (popped off when done).

  2. We set the src attribute for that image to cat.jpg, this will now start to load this image asynchronously in the background,
     everything which is related to the DOM is not apart of javascript but of the web APIs. Its the web APIs environment where 
     the asynchronous tasks related to the DOM will actually run (web apis environment of the browser). If the image was loaded in a synchronous way 
     it would do so directly inside the call stack blocking the execution of the rest of the code, this is why loading images is done asynchronously
     inside of the web APIs environment, allowing the call stack to stay clear to continue executing other tasks. 

  3. To do something after the image has finished loading, we attach an eventlistener to the load event of that image and pass a callback function.
     In practice this means to register this callback in the web APIs environment, exactly where the image is loading. The callback will stay there
     until the load event is emitted.

  4. We make an AJAX call using the fetch api, like before the asynchronous fetch operation will happen in the web APIs environment. We use the 'then' method on 
     the promise returned by the fetch function. This will also register a callback in the web API environment so that we can react to the future 
     resolved value of the promise.

  5. Once the image has finished loading, the load event is emmitted on that image. The callback for this event is then put into the callback queue/event queue.
     This queue is basically an ordered list of all the callback functions that are in line to be executed. If there were any other callback functions already inside
     the callback queue, this new callback would go straight to the end of the queue (first in first out first come first served).
  
  6. The event loop then looks into the call stack and determines whether it is empty or not. If the stack is empty which means theres currently no 
     code being executed, then it will take the first callback from the callback queue and put it in the call stack to be executed. This is called the 
     event loop tick. The event loop has the extremely important task of doing the coordination between the call stack and the callbacks in the callback queue.

  7. Promises have their own queues (microtasks queue), this queue has priority over the callback queue. Even though the load event (eventlistener) was written first,
     it would still be the fetch api which would be executed first. The event loop will actually check inside the microtasks queue first and add those tasks into the call stack before
     it does the tasks inside the callback queue.

     If one microtask adds a new microtask then that new microtask is also executed before any callbacks from the callback queue. This means that the microtasks queue 
     can essentially starve the callback queue (block the callback queue). This is not really a problem but it could happen.

*/
// ===================================================================================================================================

// ==================================================== The Event Loop in Practice ===================================================
/*
  Going of from prev notes above, below is a quick example of the event loop in practice

  - Any top level code (code outside of any callback) runs first

  - Even though both the setTimeout and the promise finish at the exact same time and the setTimeout is still put inside the callback queue 
    before the promise is put inside of the microtasks queue. It would still be the promise which is executes first
    because microtasks queues have priority over the callback queue.
*/

// Example 1.
// Executes 1st
console.log('======= Example 1 =======');
console.log('Test Start (A)');
// // Executes last
setTimeout(() => {
  console.log('0 sec timer (B)');
}, 0);
// Executes 3rd
Promise.resolve('Resolved promise (C)').then(res => console.log(res));
// Executes 2nd
console.log('Test end (D)');

/*
order in which functions log to the console (for above only)
"Test Start"
"Test end"
"Resolved promise 1"
"0 sec timer"
*/

// Example 2.
console.log('======= Example 2 =======');
console.log('Test start 1 (E)');

// setTimeout times are not guaranteed (they will never run before the timer ends, but could run way after a timer has ended).
setTimeout(() => {
  console.log('0 sec timer 2 (F)');
}, 0);

Promise.resolve('Resolved promise 2 (G)').then(res => {
  for (let i = 0; i < 1000000000; i++) {}
  console.log(res);

  // Even though this promise above has executed, the setTimeout is still executed last, because it is put at the end of the callback queue
  setTimeout(() => {
    console.log('0 sec timer 3 (H)');
  }, 0);
});

console.log('Test start 2 (I)');

/*
Order in which functions log to the console (all above)

Test Start (A)
Test end (D)
Test start 1 (E)
Test start 2 (I)
Resolved promise (C)
Resolved promise 2 (G)
0 sec timer (B)
0 sec timer 2 (F)
5 sec timer (H)

Only when the timer expires on a setTimeout, only then is it put into the callback queue.

*/
// ===================================================================================================================================