let promise = new Promise((resolve, reject) => {
    // Simulate an asynchronous operation using setTimeout
    setTimeout(() => {
        let success = false; // Change this to false to simulate an error
        if (success) {
            resolve("Operation completed successfully!");
        } else {
            reject(new Error("Something went wrong!"));
        }
    }, 2000);
});

// Consuming the promise using .then() and .catch()
promise
    .then((message) => {
        console.log("Success:", message);
    })
    .catch((error) => {
        console.error(`Error: ${error.message}`);
    });

// Using async/await to consume the promise
async function asyncExample() {
    try {
        let message = await promise;
        console.log("Async/Await Success:", message);
    } catch (error) {
        console.error("Async/Await Error:", error);
    }
}

asyncExample();