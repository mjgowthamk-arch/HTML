// Callback in callback

// 1. Define the callback function
function greeting(name) {
  console.log("Hello " + name);
}
// 2. Define a function that takes a callback as an argument
function processUserInput(callback) {
  let name = "Alice";
// 3. Execute the callback function when ready
  callback(name); 
}
// 4. Call the main function and pass the greeting function to it
processUserInput(greeting);

// ----------------------------------------
// Handling errors

// A machine that pretends to download a file
function downloadFile(fileName, callback) {
  // 3. The machine tries to download the file. 
  let internetDropped = false; 

  if (internetDropped) {
    // 4a. IF IT FAILS: Pass an error message into spot #1. Leave spot #2 empty.
    callback("No internet!", null);
  } else {
    // 4b. IF IT SUCCEEDS: Pass 'null' (no error) into spot #1. Pass the file into spot #2.
    callback(null, fileName + " is downloaded");
  }
}

// 1. We write an instruction card with TWO blank spots: (error, file)
function myInstructionCard(error, file) {
  // 5. We must check the error spot FIRST.
  if (error) {
    console.log("Uh oh: " + error);
  } else {
    // 6. If the error spot is empty (null), we are safe to use the file.
    console.log("Success! " + file);
  }
}

// 2. ACTION STARTS HERE. We ask for a song, and hand it our instruction card.
downloadFile("song1.mp3", myInstructionCard);

// ----------------------------------------
// The Pyramid of Doom

// 1. ACTION STARTS HERE. We start Song 1.
downloadFile("song1.mp3", function(error1, file1) {
  // 2. Song 1 finishes. We check for errors.
  if (error1) {
    console.log("Stopped. Failed to get Song 1.");
  } else {
    console.log(file1 + " is ready.");

    // 3. Song 1 succeeded. Now we start Song 2 INSIDE the success block.
    downloadFile("song2.mp3", function(error2, file2) {
      // 4. Song 2 finishes. We check for errors again.
      if (error2) {
        console.log("Stopped. Failed to get Song 2.");
      } else {
        console.log(file2 + " is ready.");

        // 5. Song 2 succeeded. Now we start Song 3.
        downloadFile("song3.mp3", function(error3, file3) {
          // 6. Song 3 finishes. Final error check.
          if (error3) {
            console.log("Stopped. Failed to get Song 3.");
          } else {
            // 7. EVERYTHING FINALLY FINISHED.
            console.log(file3 + " is ready. All songs downloaded!");
          }
        }); // <-- End of Song 3's instruction card

      }
    }); // <-- End of Song 2's instruction card

  }
}); // <-- End of Song 1's instruction card

// ----------------------------------------
// Promise

let promise = new Promise(function(resolve, reject) {
  // the function is executed automatically when the promise is constructed

  // after 1 second signal that the job is done with the result "done"
  setTimeout(() => resolve("done"), 1000);
});

// ----------------------------------------

let promise1 = new Promise(function(resolve, reject) {
  // after 1 second signal that the job is finished with an error
  setTimeout(() => reject(new Error("Whoops!")), 1000);
});

// ----------------------------------------
// Consumers: then, catch

let promise2 = new Promise(resolve => {
  setTimeout(() => resolve("done!"), 1000);
});

promise2.then(alert); // shows "done!" after 1 second

// ----------------------------------------

let promise3 = new Promise(function(resolve, reject) {
  setTimeout(() => resolve("done!"), 1000);
});                                                                        // .then here for shortcut

// resolve runs the first function in .then
promise3.then(              // then => 2 function, catch => 1 funtion
  result => alert(result), // shows "done!" after 1 second
  error => alert(error)   // doesn't run
);

// ----------------------------------------

let promise4 = new Promise(function(resolve, reject) {
  setTimeout(() => reject(new Error("Whoops!")), 1000);
});

// reject runs the second function in .then
promise4.then(              
  result => alert(result), // doesn't run
  error => alert(error)   // shows "Error: Whoops!" after 1 second
);

// ----------------------------------------

let promise5 = new Promise((resolve, reject) => {
  setTimeout(() => reject(new Error("Whoops!")), 1000);
});

// .catch(f) is the same as promise.then(null, f)
promise5.catch(alert); // shows "Error: Whoops!" after 1 second

// ----------------------------------------
// finally

new Promise((resolve, reject) => {
  setTimeout(() => resolve("value"), 2000);
})
  .finally(() => alert("Promise ready")) // triggers first
  .then(result => alert(result)); // <-- .then shows "value"

// ----------------------------------------

new Promise((resolve, reject) => {
  throw new Error("error");
})
  .finally(() => alert("Promise ready")) // triggers first
  .catch(err => alert(err));  // <-- .catch shows the error

// Example: loadScript

// Callback Version
function loadScript(src, callback) {
  let script = document.createElement('script');
  script.src = src;

  script.onload = () => callback(null, script);
  script.onerror = () => callback(new Error(`Script load error for ${src}`));

  document.head.append(script);
}

loadScript("https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.11/lodash.js", function(error, script) {
  if (error) {
    console.error(error.message);
  } else {
    console.log(`${script.src} is loaded successfully!`);
  }
});
  
// ----------------------------------------

// Using Promises

function loadScript(src) {
  return new Promise(function(resolve, reject) {
    let script = document.createElement('script');
    script.src = src;

    script.onload = () => resolve(script);
    script.onerror = () => reject(new Error(`Script load error for ${src}`));

    document.head.append(script);
  });
}


let promise6 = loadScript("https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.11/lodash.js");

promise6.then(
  script => alert(`${script.src} is loaded!`),
  error => alert(`Error: ${error.message}`)
);

promise6.then(script => alert('Another handler...'));

// ----------------------------------------
// Promises chaining

new Promise(function(resolve, reject) {

  setTimeout(() => resolve(1), 1000); // (*)

}).then(function(result) { // (**)

  alert(result); // 1
  return result * 2;

}).then(function(result) { // (***)

  alert(result); // 2
  return result * 2;

}).then(function(result) {

  alert(result); // 4
  return result * 2;

});

// ----------------------------------------
// Example: fetch

// 1. We reach out to your local user.json file
fetch('user.json')
// 2. We tell the browser to unpack it as a JSON object, not just raw text
.then(function(response) {
  return response.json(); 
})
// 3. Now we have a real JavaScript object, so we can grab the name!
.then(function(data) {
  console.log("Success! The user's name is: " + data.name);
  console.log("Is the user an admin? " + data.isAdmin);
});

// ----------------------------------------
// Error handling with promises

fetch('https://no-such-server.blabla') // rejects
  .then(response => response.json())
  .catch(err => alert(err)) // TypeError: failed to fetch (the text may vary)
  
// ----------------------------------------
// Implicit try…catch

 new Promise((resolve, reject) => {
  throw new Error("Whoops!");              //  reject(new Error("Whoops!"));
}).catch(alert); // Error: Whoops!

// ----------------------------------------
// Rethrowing

new Promise((resolve, reject) => {

  throw new Error("Whoops!");})
  .catch(()=> alert("The error is handled, continue normally"))   // .catch(function(error) { alert("The error is handled, continue normally");})
  .then(() => alert("Next successful handler runs"));             // argument // .then((data) => alert("Hello " + data.name)) 

// ----------------------------------------
// Unhandled rejections

  new Promise(function() {
  noSuchFunction(); // Error here (no such function)
})
  .then(() => {
      // successful promise handlers, one or more
  }); // without .catch at the end cause error

// ----------------------------------------
// Promise API

// Promise.all
// Promise.all takes an iterable (usually, an array of promises) and returns a new promise.
// If even one single promise in Promise.all gets rejected (fails), the entire Promise.all instantly fails and goes straight to the .catch() block.

Promise.all([
  new Promise(resolve => setTimeout(() => resolve(1), 3000)), // 1
  new Promise(resolve => setTimeout(() => resolve(2), 2000)), // 2
  new Promise(resolve => setTimeout(() => resolve(3), 1000))  // 3
]).then(alert); // 1,2,3 when promises are ready: each promise contributes an array member

// ----------------------------------------

Promise.all([
  Promise.resolve("Success 1"),
  Promise.reject(new Error("Boom! Something went wrong")), // This one fails!
  Promise.resolve("Success 3")
])
 
.then(results => {
  // This will NEVER run because the second promise failed
  console.log(results);
})
.catch(error => {
  // It instantly jumps right here!
  alert(error.message); // Alerts: "Something went wrong"
});

// ----------------------------------------

let urls = [
  'https://api.github.com/users/iliakan',
  'https://api.github.com/users/remy',
  'https://api.github.com/users/jeresig'
];

// map every url to the promise of the fetch
let requests = urls.map(url => fetch(url));

// Promise.all waits until all jobs are resolved
Promise.all(requests)
  .then(responses => responses.forEach(
    response => alert(`${response.url}: ${response.status}`)
  ));

// ----------------------------------------
// Promise.allSettled

  Promise.allSettled([
  Promise.resolve("Success 1"),
  Promise.reject(new Error("Boom! Something went wrong")), // This one fails!
  Promise.resolve("Success 3")
])
  .then(results => {
    // This WILL run because allSettled never rejects the whole batch!
    results.forEach((result, index) => {
      if (result.status === "fulfilled") {
        console.log(`Item ${index + 1} succeeded with:`, result.value);
      } else {
        // It catches the failure for just this specific item inside the report card
        console.log(`Item ${index + 1} failed with error:`, result.reason.message);
      }
    });
  });

// ----------------------------------------
// We use a for...of loop instead of .forEach()

  Promise.allSettled([
  Promise.resolve("Success 1"),
  Promise.reject(new Error("Boom! Something went wrong")),
  Promise.resolve("Success 3")
])
  .then(results => {
    let index = 1;
    for (let result of results) {
      if (result.status === "fulfilled") {
        console.log(`Item ${index} succeeded with:`, result.value);
      } else {
        console.log(`Item ${index} failed with error:`, result.reason.message);
      }
      index++;
    }
  });

// ----------------------------------------
// Promise.race
// Similar to Promise.all, but waits only for the first settled promise and gets its result (or error).

Promise.race([
  new Promise((resolve, reject) => setTimeout(() => resolve(1), 1000)),
  new Promise((resolve, reject) => setTimeout(() => reject(new Error("Whoops!")), 2000)),
  new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000))
]).then(alert); // 1

// Promise.any
// Similar to Promise.race, but waits only for the first fulfilled promise and gets its result. If all of the given promises are rejected, then the returned promise is rejected with AggregateError

Promise.any([
  new Promise((resolve, reject) => setTimeout(() => reject(new Error("Whoops!")), 1000)),
  new Promise((resolve, reject) => setTimeout(() => resolve(1), 2000)),
  new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000))
]).then(alert); // 1

// Promisification
// Callback function

function waitTwoSeconds(callback) {
  setTimeout(() => {
    callback("Done waiting!"); // returns data via callback
  }, 2000);
}

// Promisifying it
function waitTwoSecondsPromise() {
  return new Promise((resolve) => {
    waitTwoSeconds((message) => {
      resolve(message); // turns the callback into a resolve()
    });
  });
}

waitTwoSecondsPromise().then(result => console.log(result)); // Prints "Done waiting!" after 2 seconds