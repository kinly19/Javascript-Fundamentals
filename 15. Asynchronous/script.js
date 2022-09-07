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

getCountry("gb");
getCountry("usa");
getCountry("canada");

// ===================================================================================================================================