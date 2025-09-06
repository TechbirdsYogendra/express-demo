console.log("Async Exercises");

// Exercise 1: Create a function that returns a promise that resolves after a specified time
function wait(ms) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, ms);
    });
}

// Exercise 2: Create an async function that uses the wait function to pause execution
async function asyncWaitExample() {
    console.log("Waiting for 2 seconds...");
    await wait(2000);
    console.log("Done waiting!");
}

// Exercise 3: Create a function that fetches data from an API and returns a promise
import fetch from "node-fetch";

function fetchData(url) {
    return fetch(url)
        .then(response => response.json())
        .catch(error => console.error("Error fetching data:", error));
}

// Exercise 4: Create an async function that fetches data from an API and logs the result
async function asyncFetchExample() {
    const url = "https://jsonplaceholder.typicode.com/posts";
    console.log(`Fetching data from ${url}...`);
    const data = await fetchData(url);
    console.log("Fetched data:", data);
}

// Exercise 5: Create a function that simulates an asynchronous operation using setTimeout
function simulateAsyncOperation(name, duration) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(`${name} completed`);
        }, duration);
    });
}

// Exercise 6: Create an async function that runs multiple asynchronous operations in parallel
async function asyncParallelExample() {
    console.log("Starting parallel operations...");
    const results = await Promise.all([
        simulateAsyncOperation("Operation 1", 1000),
        simulateAsyncOperation("Operation 2", 1000),
        simulateAsyncOperation("Operation 3", 1000)
    ]);
    console.log("All operations completed:", results);
}

// Run the examples
(async () => {
    await asyncWaitExample();
    await asyncFetchExample();
    await asyncParallelExample();
})();

// Note: To run this code, ensure you have node-fetch installed in your project
// You can install it using: npm install node-fetch