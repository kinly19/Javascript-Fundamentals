'use strict'

/* 
4 Steps to solve any problem
1. Understand the problem
2. Divide and conquer - break big problems down into smaller problems
3. Dont be afraid to do as much research as possible
4. For bigger problems, write pseudo-code before writing actual code
*/

/*
Problem 1:
  We work for a company building a smart home thermometer. Our most recent task is this:
  "Given an array of temperatures of one day, calculate the temperature amplitude. Keep in mind
  that sometimes there might be a sensor error.
*/

const temperatures = [3, -2, -6, -1, "error", 9, 13, 17, 15, 14, 9, 5];
const temperatures2 = [7, -23, -3, 21, 15, 21, 23, "error", 14, 9, 5];

// 1. Understanding the problem.
// - What is temp amplitude? 
// --The difference between the highest and lowest temperature
// - How to compute max and min temmperatures?
// - Whats a sensor error? And what to do? 

// 2. Breaking up into sub-problems
// - How to ignore errors?
// - Find max value in temp array
// - Find min value in temp array
// - Subtract min from max (amplitude) and return it

// Example 1.
const calcTempAmplitude = (temps) => {
  const sortedArray = [];

  // sort array and remove string values in order to use Math.min and Math.max
  for (let i = 0; i < temps.length; i++) {
    if (typeof temps[i] !== 'number') continue
    sortedArray.push(temps[i]);
  }

  // get max and min values from sortedArray
  const maxTemp = Math.max(...sortedArray);
  const minTemp = Math.min(...sortedArray);

  // return temp amplitude
  return maxTemp - minTemp;
}

// Example 2.
const calcTempAmplitude2 = (temps) => {
  // initial value
  let max = temps[0];
  let min = temps[0];

  // Loop through each item inside the array and check if value of i is greater than 'max' (or less than min) if true store the new greater (or smaller) value.
  for (let i = 0; i < temps.length; i++) {
    const currentTemp = temps[i];

    if (typeof temps[i] !== 'number') continue;
    
    if (currentTemp> max) {
      max = currentTemp;
    }

    if (currentTemp < min) {
      min = currentTemp;
    }
  }
  return max - min;
};

const amplitude = calcTempAmplitude2(temperatures);
console.log(`Temp amplitude: ${amplitude}`);


// Problem 2: 
// Function should now receive 2 array of temps.

// 1. Understanding the problem
// - With 2 arrays, should we implement functionality twice?
// -- no just merge the two array

// 2. Breaking up into sub-problems
// - How to merge 2 arrays

const calcTempAmplitude3 = (temp1, temp2) => {
  const temps = temp1.concat(temp2);
  let max = temps[0];
  let min = temps[0];

  // loop through merged array
  for (let i = 0; i < temps.length; i++) {
    const currentTemp = temps[i];

    if (typeof temps[i] !== "number") continue;

    if (currentTemp > max) {
      max = currentTemp;
    }

    if (currentTemp < min) {
      min = currentTemp;
    }
  }
  return max - min;
}

const amplitude2 = calcTempAmplitude3(temperatures, temperatures2); 
console.log(`amplitude: ${amplitude2}`);

// ==================================================== Exercise ===================================================
// Given an array of forecasted maximum temperatures, the thermometer displays a string with these temperatures

// Example: [17, 21, 23] will print "...17C in 1 days... 21c in 2days ... 23c in 3days..."

// Create a function 'printForecast' which takes in an array 'arr' and logs a string like the above to the console. 

// 1. Understand the problem
// - Array transformed to string, separated by ...
// - What is the X days? Answer: index + 1

// 2. Breaking up into sub-problems
// - Create a function which takes in an array as an argument
// - Loop through array
// - Transform each element in array to string with ­°C
// - Strings need to contain day (index + 1) and ... between each string
// - Print out message

const data1 = [17, 21, 23];
const data2 = [12, 5, -5, 0, 4];

const printForecast = (arr) => {
  let message = "";

  for (let i = 0; i < arr.length; i++) {
    message += `${arr[i]}°C in ${i + 1} days... `; // the value of itself plus... +=
  }
  console.log(`... ${message}`);
};

printForecast(data2);

// =================================================================================================================