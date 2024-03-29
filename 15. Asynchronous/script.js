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

// ==================================================== Building a Simple Promise ====================================================
/*
  The Promise constructor
  - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/Promise 
  - Is primarily used to wrap functions that do not already support promises.
  - Promisifying means to convert callback based asynchronous behavior to promise based.
  - Can only be constructed with 'new' keyword.
  - When called via new, the Promise constructor returns a promise object. The promise object will become resolved when 
    either of the functions resolutionFunc or rejectionFunc are invoked.

  Syntax
  - new Promise(executor)
  - Executor a function to be executed by the constructor. It receives two functions as parameters (resolved, reject)

*/

// Creating a promise
// As soon as this promise constructor runs, it will immediately run the callback function passed into it.

const lotteryPromise = new Promise(function (resolve, reject) {
  console.log('Lottery draw in process');
  setTimeout(() => {
    if (Math.random() >= 0.5) {
      resolve('You Win');
    } else {
      reject(new Error('You lose'));
    }
  }, 2000);
});

// Consuming promise
lotteryPromise.then(res => console.log(res)).catch(err => console.log(err));

// Promisifying
const wait = seconds => {
  return new Promise(resolve => {
    setTimeout(resolve, seconds * 1000);
  });
};

// Consume
wait(2)
  .then(() => {
    console.log('Waited 2 seconds');
    return wait(1);
  })
  .then(() => console.log('Waited 1 second'));

// Fulfill or Reject promise immediately
Promise.resolve('Resolve immediately').then(res => console.log(res));
Promise.reject('Reject immediately').catch(err => console.log(err));

// ===================================================================================================================================

// ================================================= Promisifying the Geolocation API ================================================

const getPosition = () => {
  return new Promise((resolve, reject) => {
    /*
    navigator.geolocation.getCurrentPosition(
      position => resolve(position),
      err => reject(err)
    );
    */

   // getCurrentPosition() takes two arguments (success callback, error callback)
   // Resolve and reject will be the callback functions we pass into getCurrentPoistion()
   navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

// Calling getposition will return a promise making it 'thenable' 
getPosition()
  .then(res => console.log(res))
  .catch(err => console.error(err.message));

// Using function above with prev example

// Helper function fetch/error
const fetchJSON2 = (url, errMsg = 'Something went wrong') => {
  return fetch(url)
  .then(res => {
    if (!res.ok) throw new Error(errMsg);
    return res.json();
  })
  .then(data => {
    // Check for any error properties inside returning data object
    if (data.error) throw new Error( errMsg = data.error.description)
    return data;
  })
};

const whereAmI2 = () => {
  getPosition()
    .then(res => {
      const { latitude: lat, longitude: lng } = res.coords;
      // Return another promise
      return fetchJSON2(`https://geocode.xyz/${lat}, ${lng}?geoit=json&auth=835713086121572646369x19578`);
    })
    .then(data => fetchJSON2(`https://restcountries.com/v2/name/${data.country}`,'Country not found'))
    .then(data2 => renderCountry(data2[0]))
    .catch(err => countriesContainer.insertAdjacentText('beforeend', err.message))
    .finally(() => (countriesContainer.style.opacity = 1));
};

// whereAmI2();

// ===================================================================================================================================

// ======================================================== Coding Challenge #2 ======================================================
/*
  For this challenge you will actually have to watch the video! Then, build the image 
  loading functionality that I just showed you on the screen.
  Your tasks:
  Tasks are not super-descriptive this time, so that you can figure out some stuff by 
  yourself. Pretend you're working on your own �

  PART 1
  1. Create a function 'createImage' which receives 'imgPath' as an input. 
  This function returns a promise which creates a new image (use 
  document.createElement('img')) and sets the .src attribute to the 
  provided image path
  2. When the image is done loading, append it to the DOM element with the 
  'images' class, and resolve the promise. The fulfilled value should be the 
  image element itself. In case there is an error loading the image (listen for 
  the'error' event), reject the promise
  3. If this part is too tricky for you, just watch the first part of the solution

  PART 2
  4. Consume the promise using .then and also add an error handler
  5. After the image has loaded, pause execution for 2 seconds using the 'wait'
  function we created earlier
  6. After the 2 seconds have passed, hide the current image (set display CSS 
  property to 'none'), and load a second image (Hint: Use the image element 
  returned by the 'createImage' promise to hide the current image. You will 
  need a global variable for that �)
  7. After the second image has loaded, pause execution for 2 seconds again
  8. After the 2 seconds have passed, hide the current image
  Test data: Images in the img folder. Test the error handler by passing a wrong 
  image path. Set the network speed to “Fast 3G” in the dev tools Network tab, 
  otherwise images load too fast
*/

const imgContainer = document.querySelector(".images");
let currentImage;

const createImage = imgPath => {
  // 1. Return promise
  return new Promise((resolve, reject) => {
    // 2. Create img element
    const img = document.createElement('img');
    img.src = imgPath;
    // 3. Append image to DOM when image has loaded
    img.addEventListener('load', () => {
      imgContainer.append(img);
      currentImage = img;
      // 4. set resolve value 
      resolve(img);
    });
    // 5. Handle error
    img.addEventListener('error', () => reject(new Error('image not found')));
  });
};

createImage('img/img-1.jpg')
  .then(img => {
    currentImage = img;
    console.log('Image 1 has loaded');
    return wait(2);
  })
  .then(() => {
    currentImage.style.display = 'none';
    return createImage('img/img-2.jpg');
  })
  .then(img => {
    currentImage = img;
    console.log('Image 2 has loaded');
    return wait(2);
  })
  .then(() => currentImage.style.display = 'none')
  .catch(err => console.log(err.message));

// ===================================================================================================================================

// ================================================ Consuming Promises with Async/Await ==============================================
/*
  The await operator
  - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await
  - Is used to wait for a Promise and get its fulfillment value. It can only be used inside an async function or a JavaScript module.
  - The await expression causes async function execution to pause until a promise is settled (fulfilled or rejected), 
    and to resume execution of the async function after fulfillment. When resumed, the value of the await expression is that of the fulfilled promise.
  - Because await is only valid inside async functions and modules, which themselves are asynchronous and return promises. 
    The await expression never blocks the main thread and only defers execution of code that actually depends on the result, 
    i.e. anything after the await expression.
*/

// Async function
const whereAmI3 = async (country) => {
  console.log('%cFetching data...', 'color: orange');
  // Await will stop code execution at this point of the function until the promise is fulfilled ('data' has been fetched).
  const res = await fetch(`https://restcountries.com/v2/name/${country}`);
  console.log('%cData fetched...', 'color: green');
  const data = await res.json();
  renderCountry(data[0]);
  
  /* Await is Exactly same as below with .then method (syntactic sugar)
    fetch(`https://restcountries.com/v2/name/${country}`)
    .then((res) => res.json())
    .then(data => renderCountry(data[0]))
  */
}

// whereAmI3("gb");

// Example 2.
const whereAmI4 = async () => {
  // Get Geolocation
  const pos = await getPosition();
  const { latitude: lat, longitude: lng } = pos.coords;
  
  // Reverse geocoding
  const resGeo =  await fetch(`https://geocode.xyz/${lat}, ${lng}?geoit=json&auth=835713086121572646369x19578`);
  const dataGeo = await resGeo.json();
  
  // Country data
  console.log('%cFetching data...', 'color: orange');
  const response = await fetch(`https://restcountries.com/v2/name/${dataGeo.country}`);
  
  console.log('%cData fetched...', 'color: green');
  const data = await response.json();
  
  // Render data
  renderCountry(data[0]);
};

// whereAmI4();

// ===================================================================================================================================

// ================================================== Error Handling With try...catch ================================================
/*
  try...catch 
  - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch
  - Statement is comprised of a try block and either a catch block, a finally block, or both. The code in the try block is executed first, 
    and if it throws an exception (fails), the code in the catch block will be executed. 
    The code in the finally block will always be executed before control flow exits the entire construct.
  - The try, catch, and finally blocks must be blocks, instead of single statements.

  Syntax
    try {
      try Statement
    } catch (exceptionVar) {
      catch Statement
    } finally {
      finally statements
    }
*/

const whereAmI5 = async () => {
  try {
    // Get Geolocation
    const pos = await getPosition();
    const { latitude: lat, longitude: lng } = pos.coords;

    // Reverse geocoding
    const resGeo = await fetch(
      `https://geocode.xyz/${lat}, ${lng}?geoit=json&auth=835713086121572646369x19578`
    );

    // Handle error message
    if (!resGeo.ok) throw new Error(`Something went wrong: ${resGeo.status}`);
    const dataGeo = await resGeo.json();

    // Country data
    const response = await fetch(
      `https://restcountries.com/v2/name/${dataGeo.countryss}`
    );
    
    // Handle error message
    if (!response.ok) throw new Error(`Problem getting country`);
    const data = await response.json();

    // Render data
    renderCountry(data[0]);

    // Catch/display errors
  } catch (err) {
    countriesContainer.insertAdjacentText("afterbegin", err)
    countriesContainer.style.opacity = 1;
  }
};

// ===================================================================================================================================

// =============================================== Returning Values from Async Functions =============================================
/*
  Async functions will always return a promise. If the return value of an async function is not explicitly a promise, 
  it will be implicitly wrapped in a promise.
*/

  let cityData;

  const whereAmI6 = async country => {
    try {
      const response = await fetch(`https://restcountries.com/v2/name/${country}`);

      if (!response.ok) throw new Error('Something went wrong...');
      const [data] = await response.json();

      /* Store data into variable
      cityData = data
      */

      // return data
      // Whatever is returned will be the fulfilled value of this promise
      return data;

    } catch (err) {
      console.log(err);
      // Even if we had an error above, the promise returned would still be fulfilled but not rejected.
      // Rethrowing an error allows us to propagate the error down and reject the promise.
      throw err;
    }
  };

  // Do something with returned data from above async function
  // IIFE function with async
  (async (data) => {
    console.log("1: Will get location");
    try {
      const city = await whereAmI6(data);
      // Do something with data
      console.log("2: City location");
    } catch (err) {
      console.log(`2: ${err}`);
    } finally {
      console.log("3: Finished getting location");
    }
  })('usa');
  
  // Using .then method (same as above)
  // whereAmI6("usa")
  // .then(data => console.log("2: City data"))
  // .catch(err => console.log(`2: ${err}`))
  // .finally(() => console.log("3: Finished getting location"));

// ===================================================================================================================================

// ==================================================== Running Promises in Parallel =================================================
/*
  The Promise.all()
  - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all
  - Method takes an iterable of promises as an input (array of promises), and returns a single Promise that resolves 
    to an array of the results of the input promises.
  - This returned promise will fulfill when all... of the input's promises have fulfilled.
  - It rejects immediately upon any of the input promises rejecting or non-promises throwing an error, and will reject with this first rejection message / error.
*/

// Running promises in sequence.
const get3Countries = async (c1, c2, c3) => {
  try {
    // Each fetch (promise) below after the first fetch has to 'wait' for the previous fetch to complete (data2 waits for data1 to finish etc).
    // DevTools 'network' tab will show us this.
    // This wouldnt make sense as each fetch does not depend on any data from the previous fetch.
    // Instead of running each of these promises in sequence, we can fix this by running each promise in parallel (all at the same time).
    const [data1] = await getJSON(`https://restcountries.com/v2/name/${c1}`);
    const [data2] = await getJSON(`https://restcountries.com/v2/name/${c2}`);
    const [data3] = await getJSON(`https://restcountries.com/v2/name/${c3}`);

    // Return an array of capitals from each fetch above
    console.log([data1.capital, data2.capital, data3.capital]);
  } catch (err) {
    console.log(err);
  }
};

get3Countries('portugal', 'south africa', 'great britain');

// Running promises in parallel (all at the same time).
const getAll3Countries = async (c1, c2, c3) => {
  try {
    const data = await Promise.all([
      getJSON(`https://restcountries.com/v2/name/${c1}`),
      getJSON(`https://restcountries.com/v2/name/${c2}`),
      getJSON(`https://restcountries.com/v2/name/${c3}`),
    ]);

    // Promise.all() returns an array of results from each promise.
    // [[promise1 results], [promise2 results], [promise3 results]]
    console.log(data);

    // Return an array of capitals from each fetch above.
    console.log(data.map(d => d[0].capital));
  } catch (err) {
    console.log(err);
  }
};

getAll3Countries('portugal', 'south africa', 'great britain');

/* Same as above With .then method (without async await)
// Example 1.
const getAll3Countries2 = (c1, c2, c3) => {
  return Promise.all([
    getJSON(`https://restcountries.com/v2/name/${c1}`),
    getJSON(`https://restcountries.com/v2/name/${c2}`),
    getJSON(`https://restcountries.com/v2/name/${c3}`),
  ]);
};

getAll3Countries2('portugal', 'south africa', 'great britain')
  .then(data => console.log(data.map(d => d[0].capital)));

// Example 2.
const promises = [
  new Promise(resolve => resolve(getJSON(`https://restcountries.com/v2/name/portugal`))),
  new Promise(resolve => resolve(getJSON(`https://restcountries.com/v2/name/gb`))),
];

Promise.all(promises)
  .then(data => console.log(data.map( d => d[0].capital)));


// or
Promise.all([
  getJSON(`https://restcountries.com/v2/name/portugal`),
  getJSON(`https://restcountries.com/v2/name/gb`),
])
.then(data => console.log(data.map( d => d[0].capital)));

*/
// ===================================================================================================================================

// ========================================= Other Promise Combinators: race, allSettled and any =====================================
/*
  The Promise.race()
  - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/race
  - Method returns a promise that fulfills or rejects as soon as one of the promises in an iterable fulfills or rejects, 
    with the value or reason from that promise.
  - Like a race the first promise which fulfills comes first (this also includes whether a promise is fulfilled or rejected).

  The Promise.allSettled()
  - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled
  - Method returns a promise that fulfills after all of the given promises have either fulfilled or rejected, with an array 
    of objects that each describes the outcome of each promise.
  - Does the same thing as Promise.all() and returns all values of each promise, but will not short circuit if a promise is rejected.
  - Returns an array of promises which are either fullfiled or rejected. 

  The Promise.any()
  - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/any
  - Takes an iterable of Promise objects. It returns a single promise that fulfills as soon as any of the promises in the iterable fulfills, 
    with the value of the fulfilled promise. If no promises in the iterable fulfill (if all of the given promises are rejected), 
    then the returned promise is rejected with an AggregateError, a new subclass of Error that groups together individual errors.
*/

// Promise.race()
(async () => {
  const res = await Promise.race([
    getJSON(`https://restcountries.com/v2/name/portugal`),
    getJSON(`https://restcountries.com/v2/name/gb`),
    getJSON(`https://restcountries.com/v2/name/usa`),
  ])
  // Only the first promise which fulfills is returned.
  console.log(res);
})();

// Example 2.
// Using a timeout function to reject a promise after a set amount of time.
const timeout = s => {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error('Fetch timeout'));
    }, s * 1000);
  });
};

/* 
We have the two promises (getJSON and timeout) race against each other. If the timeout happens first
then the whole promise below is rejected and the fetch is aborted.
*/
Promise.race([getJSON(`https://restcountries.com/v2/name/tanzania`), timeout(2)])
  .then(data => console.log(data[0]))
  .catch(err => console.log(err));

// Promise.allSettled()
Promise.allSettled([
  getJSON(`https://restcountries.com/v2/name/tanzania`),
  getJSON(`https://restcountries.com/v2/name/south africa`),
  getJSON(`https://restcountries.com/v2/name/south dfffdsfsf`,"Fetch failed")
])
.then(data => {
  console.table(data);
  // only do something with fullfiled promise values.
  data.filter(item => {
    if (item.status === "fulfilled") console.log(item.value[0]);
  })
})

// Promise.any() ES2021
Promise.any([
  Promise.resolve('Success 1'),
  Promise.reject('Error'),
  Promise.resolve('Success 2'),
])
  // Returns a single promise that fulfills as soon as any of the promises above fulfills (ignores rejected promises).
  // If all promises above fail(reject) it will return an AggregateError.
  .then(data => console.log(data));

// ===================================================================================================================================

// ========================================================= Coding Challenge #3 =====================================================
/*
  Your tasks:
  PART 1
  1. Write an async function 'loadNPause' that recreates Challenge #2, this time 
  using async/await (only the part where the promise is consumed, reuse the 
  'createImage' function from before)
  2. Compare the two versions, think about the big differences, and see which one 
  you like more
  3. Don't forget to test the error handler, and to set the network speed to “Fast 3G”
  in the dev tools Network tab

  PART 2
  1. Create an async function 'loadAll' that receives an array of image paths 
  'imgArr'
  2. Use .map to loop over the array, to load all the images with the 
  'createImage' function (call the resulting array 'imgs')
  3. Check out the 'imgs' array in the console! Is it like you expected?
  4. Use a promise combinator function to actually get the images from the array �
  5. Add the 'parallel' class to all the images (it has some CSS styles)
  Test data Part 2: ['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']. To test, turn off the 'loadNPause' function
*/

const imgContainer = document.querySelector(".images");
let currentImage;

// Handlers
const wait = seconds => {
  return new Promise(resolve => {
    setTimeout(resolve, seconds * 1000);
  });
};

const createImage = imgPath => {
  // 1. Return promise
  return new Promise((resolve, reject) => {
    // 2. Create img element
    const img = document.createElement('img');
    img.src = imgPath;
    // 3. Append image to DOM when image has loaded
    img.addEventListener('load', () => {
      imgContainer.append(img);
      currentImage = img;
      // 4. set resolve value 
      resolve(img);
    });
    // 5. Handle error
    img.addEventListener('error', () => {
      reject(new Error('image not found'))
    });
  });
};

const loadAll = async imgArr => {
  try {
    // Create an array and load images with createImage
    const imgs = imgArr.map(async img => await createImage(img));
    console.log(imgs);

    // Create an array of all promise results
    const imgEl = await Promise.all(imgs);
    // use promise.all to get the actual values of each promise
    console.log(imgEl);

    //Add a class style to each image element
    imgEl.forEach(imgEl => {
      imgEl.classList.add('parallel');
    });
  } catch (err) {
    // (side note on errors the remaining images are still appended into the DOM with createImage which is why no styles are added to images)
    throw new Error(err);
  }
};

const loadNPause = async () => {
  try {
    let img = await createImage('img/img-1.jpg');
    console.log('Image 1 has loaded');
    currentImage = img;
    await wait(2);
    currentImage.style.display = 'none';

    img = await createImage('img/img-2.jpg');
    console.log('Image 2 has loaded');
    currentImage = img;
    await wait(2);
    currentImage.style.display = 'none';
    
  } catch (err) {
    console.log(err.message);
  }
};

// loadNPause();
loadAll(['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']);
// ===================================================================================================================================