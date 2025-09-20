const promise = Promise.resolve("Resolved Value");

promise.then(value => {
    console.log(value); // Output: Resolved Value
});

// Example of a rejected promise
const rejectedPromise = Promise.reject(new Error("Rejected Value"));

rejectedPromise.catch(error => {
    console.error(error.message); // Output: Rejected Value
});

// Example of Promise.all
const promise1 = Promise.resolve(3);
const promise2 = 42;
const promise3 = new Promise((resolve, reject) => {
    // setTimeout(resolve, 100, 'foo');
    setTimeout(reject, 100, new Error('Error in Promise 3')); // To demonstrate rejection, uncomment this line
});

setTimeout(() => {
    console.log('This will run after 200ms');
}, 200);

Promise.all([promise1, promise2, promise3])
.then(values => {
    console.log(values); // Output: [3, 42, "foo"]
})
.catch(error => {
    console.error("One of the promises rejected:", error.message); // Output: One of the promises rejected: bar
});

// Promise race example
const promiseA = new Promise((resolve) => {
    setTimeout(resolve, 500, 'one');
});

const promiseB = new Promise((resolve) => {
    setTimeout(resolve, 100, 'two'); // This will resolve first
});

Promise.race([promiseA, promiseB])
.then(value => {
    console.log(value); // Output: two
})
.catch(error => {
    console.error("Error:", error);
});
