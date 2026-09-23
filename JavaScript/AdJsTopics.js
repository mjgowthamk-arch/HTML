// Proxy

let target = {};
let proxy = new Proxy(target, {}); // empty handler             

proxy.test = 5; // writing to proxy 
alert(target.test); // 5, the property appeared in target!

alert(proxy.test); // 5, we can read it from proxy too 

for(let key in proxy) alert(key); // test, iteration works 

// ---------------------------------------- 

let numbers = [0, 1, 2];

numbers = new Proxy(numbers, {
  get(target, prop) {
    if (prop in target) {                     // in operator checks for keys (indexes), while includes() checks for values
      return target[prop];
    } else {
      return 0; // default value
    }
  }
});

alert( numbers[1] ); // 1
alert( numbers[123] ); // 0 (no such item)

// ---------------------------------------- 

let user = {
  username: "johndoe",
  _password: "supersecretpassword" 
};

let secureUser = new Proxy(user, {
  get(target, prop) {
    if (prop.startsWith('_')) {
      return "Access Denied"; // Hides any property starting with "_"
    }
    return target[prop];
  }
});

console.log(secureUser.username); // "johndoe"
console.log(secureUser._password); // "Access Denied"

// ----------------------------------------

let person = {
  firstName: "Jane",
  lastName: "Smith"
};

let smartPerson = new Proxy(person, {
  get(target, prop) {
    if (prop === "fullName") {
      return target.firstName + " " + target.lastName;
    }
    return target[prop];
  }
});

// "fullName" doesn't exist in the original object, but the Proxy creates it!
console.log(smartPerson.fullName); // "Jane Smith"

// ----------------------------------------

let dictionary = {
  'Hello': 'Hola',
  'Bye': 'Adiós'
};

dictionary = new Proxy(dictionary, {
  get(target, phrase) { // intercept reading a property from dictionary
    if (phrase in target) { // if we have it in the dictionary
      return target[phrase]; // return the translation
    } else {
      // otherwise, return the non-translated phrase
      return phrase;
    }
  }
});

// Look up arbitrary phrases in the dictionary!
// At worst, they're not translated.
alert( dictionary['Hello'] ); // Hola
alert( dictionary['Welcome to Proxy']); // Welcome to Proxy (no translation)

// ----------------------------------------
// Iteration with “ownKeys” and “getOwnPropertyDescriptor”

let user1 = {
  name: "John",
  age: 30,
  _password: "***"
};

user1 = new Proxy(user1, {
  ownKeys(target) {
    return Object.keys(target).filter(key => !key.startsWith('_'));
  }
});

// "ownKeys" filters out _password
for(let key in user1) alert(key); // name, then: age

// same effect on these methods:
alert( Object.keys(user1) ); // name,age
alert( Object.values(user1) ); // John,30

// ----------------------------------------

let user2 = { };

user2 = new Proxy(user, {
  ownKeys(target) {
    return ['a', 'b', 'c'];
  }
});

alert( Object.keys(user2) ); // <empty>

// ----------------------------------------

let user3 = { };

user3 = new Proxy(user3, {
  ownKeys(target) { // called once to get a list of properties
    return ['a', 'b', 'c'];
  },

  getOwnPropertyDescriptor(target, prop) { // called for every property
    return {
      enumerable: true,
      configurable: true
      /* ...other flags, probable "value:..." */
    };
  }

});

alert( Object.keys(user3) ); // a, b, c

// ----------------------------------------
// “In range” with “has” trap

let range = {
  start: 1,
  end: 10
};

range = new Proxy(range, {
  has(target, prop) {
    return prop >= target.start && prop <= target.end;
  }
});

alert(5 in range); // true
alert(50 in range); // false

// ----------------------------------------
// Wrapping functions: "apply"

function delay(f, ms) {
  // return a wrapper that passes the call to f after the timeout
  return function() { // (*)
    setTimeout(() => f.apply(this, arguments), ms);
  };
}

function sayHi(user) {
  alert(`Hello, ${user}!`);
}

// after this wrapping, calls to sayHi will be delayed for 3 seconds
sayHi = delay(sayHi, 3000);

sayHi("John"); // Hello, John! (after 3 seconds)

// ----------------------------------------
// Reflect

let user4 = {};

Reflect.set(user4, 'name', 'John');

alert(user4.name); // John

// ----------------------------------------

let user5 = {
  name: "John",
};

user5 = new Proxy(user5, {
  get(target, prop, receiver) {
    alert(`GET ${prop}`);
    return Reflect.get(target, prop, receiver); // (1)
  },
  set(target, prop, val, receiver) {
    alert(`SET ${prop}=${val}`);
    return Reflect.set(target, prop, val, receiver); // (2)
  }
});

let name = user5.name; // shows "GET name"
user5.name = "Pete"; // shows "SET name=Pete"

// ----------------------------------------

let user6 = {
  _name: "Guest",
  get name() {
    return this._name;
  }
};

let userProxy = new Proxy(user6, {
  get(target, prop, receiver) { // receiver = admin
    return Reflect.get(target, prop, receiver); // (*)
  }
});

let admin = {
  __proto__: userProxy,
  _name: "Admin"
};

alert(admin.name); // Admin

// ----------------------------------------
// Revocable proxies

let object = {
  data: "Valuable data"
};

let {proxy, revoke} = Proxy.revocable(object, {});

// pass the proxy somewhere instead of object...
alert(proxy.data); // Valuable data

// later in our code
revoke();

// the proxy isn't working any more (revoked)
alert(proxy.data); // Error

// ----------------------------------------
// Eval: run a code string

let code = 'alert("Hello")';
eval(code); // Hello
// ----------------------------------------

let value1 = eval('1+1');
alert(value1); // 2
// ----------------------------------------

let value2 = eval('let i = 0; ++i');
alert(value2); // 1
// ----------------------------------------

let a = 1;
function f() {
  let a = 2;
  eval('alert(a)'); // 2
}
f()
// ----------------------------------------

let x = 5;
eval("x = 10");
alert(x); // 10, value modified
// ----------------------------------------

// In strict mode, functions/variables declared inside eval are not visible outside.
eval("let x = 5; function f() {}");
alert(typeof x); // undefined (no such variable)
// function f is also not visible
// ----------------------------------------

let expr = prompt("Type an arithmetic expression?", '2*3+2');
alert( eval(expr) );

// ----------------------------------------
// Currying

function curry(f) { // curry(f) does the currying transform
  return function(a) {
    return function(b) {
      return f(a, b);
    };
  };
}

// usage
function sum(a, b) {
  return a + b;
}

let curriedSum = curry(sum);

alert( curriedSum(1)(2) ); // 3

// ----------------------------------------
// Advanced curry implementation 

function curry(func) {

  return function curried(...args) {
    if (args.length >= func.length) {
      return func.apply(this, args);
    } else {
      return function(...args2) {
        return curried.apply(this, args.concat(args2));
      }
    }
  };
}

function sum(a, b, c) {
  return a + b + c;
}

let curriedSum1 = curry(sum);

alert( curriedSum1(1, 2, 3) ); // 6, still callable normally
alert( curriedSum1(1)(2,3) ); // 6, currying of 1st arg
alert( curriedSum1(1)(2)(3) ); // 6, full currying

// ----------------------------------------
// Reference Type

let user7 = {
  name: "John",
  hi() { alert(this.name); },
  bye() { alert("Bye"); }
};

user7.hi(); // works

// now let's call user.hi or user.bye depending on the name
(user7.name == "John" ? user7.hi : user7.bye)(); // Error!     // user7.name == "John" ? user7.hi() : user7.bye();

// ----------------------------------------

let user8 = {
  name: "John",
  hi() { alert(this.name); }
};

// split getting and calling the method in two lines
let hi = user8.hi;                                             // user8.hi.bind(user8);
hi(); // Error, because this is undefined

// ----------------------------------------
// WeakRef

//  the user variable holds a strong reference to the object
let user5 = { name: "John" };

//  the admin variable holds a weak reference to the object
let admin1 = new WeakRef(user5);

let ref = admin1.deref();

if (ref) {
  // the object is still accessible: we can perform any manipulations with it
} else {
  // the object has been collected by the garbage collector
}

// ----------------------------------------
// Example №1: using WeakRef for caching

// A dummy function representing a heavy task, like downloading an image
function fetchImg(name) {
    return { name: name, data: "heavy image data..." };
}

function weakRefCache(fetchImg) { 
    // 1. Create a private "vault" to store our images. 
    // Because we use a closure, only the returned function can access this Map.
    const imgCache = new Map(); 

    // 2. Return the actual function the user will call to get an image
    return (imgName) => { 
        
        // 3. Check our vault. Does it have a WeakRef for this image name?
        const cachedImg = imgCache.get(imgName); 

        // 4. The magic step: .deref() looks inside the WeakRef.
        // - The '?.' safely stops if cachedImg is undefined (we never fetched it).
        // - .deref() asks the browser: "Is this image still in RAM?"
        // - If the Garbage Collector hasn't deleted it yet, it returns the image!
        if (cachedImg?.deref()) { 
            console.log("Image found in cache! Skipping download.");
            return cachedImg?.deref(); // Return the cached image instantly
        }

        // 5. If we reach this line, it means one of two things:
        // A) We never downloaded this image before.
        // B) We DID download it, but the browser's Garbage Collector deleted it to save RAM.
        console.log("Image not in memory. Downloading fresh copy...");
        const newImg = fetchImg(imgName); 

        // 6. Wrap the heavy new image in a WeakRef before saving it.
        // This tells the browser: "Keep this if you can, but delete it if you need RAM."
        imgCache.set(imgName, new WeakRef(newImg)); 

        // 7. Hand the fresh image back to the user
        return newImg;
    };
}
// Create our smart caching tool
const getCachedImg = weakRefCache(fetchImg);

// --- Testing it out ---

// 1st call: Downloads a fresh copy and wraps it in a WeakRef
let img1 = getCachedImg("logo.png"); 
// 2nd call: If the browser hasn't deleted it yet, it instantly returns the cached one!
let img2 = getCachedImg("logo.png");

// ----------------------------------------
// Example №2: Using WeakRef to track DOM objects

// 1. Grab the button that starts the messages
const startMessagesBtn = document.querySelector('.start-messages'); 
// 2. Grab the button that closes (deletes) the window
const closeWindowBtn = document.querySelector('.window__button'); 

// 3. Grab the chat window itself, but wrap it in a WeakRef.
// This tells the browser: "I am watching this window, but if it gets removed 
// from the webpage, please permanently delete it from the computer's memory."
const windowElementRef = new WeakRef(document.querySelector(".window__body")); 

// 4. When the user clicks the "Start" button...
startMessagesBtn.addEventListener('click', () => { 
    // Start the loop, passing in our WeakRef wrapper
    startMessages(windowElementRef);
    // Disable the button so the user can't accidentally start 10 timers at once
    startMessagesBtn.disabled = true;
});
// 5. When the user clicks the "Close" button...
// We find the window and use .remove() to physically rip it out of the HTML document.
closeWindowBtn.addEventListener('click', () =>  document.querySelector(".window__body").remove()); 

const startMessages = (element) => {
    // 6. Start a timer that wakes up every 1,000 milliseconds (1 second)
    const timerId = setInterval(() => { 
        
        // 7. .deref() asks: "Did the Garbage Collector delete this window yet?"
        if (element.deref()) { 
            // The window is still alive! 
            // Create a new paragraph with the time, and paste it into the window.
            const payload = document.createElement("p");
            payload.textContent = `Message: System status OK: ${new Date().toLocaleTimeString()}`;
            element.deref().append(payload);
            
        } else { 
            // 8. The user clicked close, the window was removed, AND the browser deleted it from memory!
            // The wrapper is now empty.
            
            // 9. Show a message, and most importantly: KILL THE TIMER.
            // If we didn't do this, the timer would run forever in the background trying to update a dead window.
            alert("The element has been deleted."); 
            clearInterval(timerId);
        }
    }, 1000);
};

// FinalizationRegistry

// 1. Create the Registry (The Cleanup Crew)
// The 'label' is the sticky note we pass in step 3.
const cleanupCrew = new FinalizationRegistry((label) => {
    console.log(`🧹 ALERT: The Garbage Collector just destroyed: ${label}`);
});

function playLevel() {
    // 2. Create a heavy object in memory
    let enemy = { name: "Boss Dragon", health: 10000 };
    console.log("1. Enemy created.");

    // 3. Register the object with our Cleanup Crew.
    // We say: "Watch this 'enemy' object. When you delete it, read me this string."
    cleanupCrew.register(enemy, "Level 1 Boss Dragon");
    console.log("2. Enemy registered with the cleanup crew.");

    // 4. We finish the level and overwrite the variable. 
    // The object still exists in memory, but our app has forgotten it.
    enemy = null; 
    console.log("3. Enemy variable erased. Waiting for the Garbage Collector...");
}

playLevel();

// Note: Nothing happens immediately after playLevel() finishes. 
// The console.log inside the registry will only fire randomly in the future 
// when the browser decides it needs to clean up RAM!

// ----------------------------------------
// Caching with FinalizationRegistry

// 1. THE SETUP
const cache = new Map();

// The Cleanup Crew: removes empty wrappers when the computer deletes the data
const registry = new FinalizationRegistry((label) => {
    console.log(`🧹 [CLEANUP]: The computer deleted '${label}'. Erasing empty wrapper from cache!`);
    cache.delete(label);
});

// A fake "heavy" function to simulate downloading something huge
function downloadHeavyData(name) {
    console.log(`☁️ [NETWORK]: Downloading huge file for '${name}'...`);
    return { fileName: name, content: "Lots of heavy data..." };
}
// 2. THE SMART CACHE FUNCTION
function getCachedData(name) {
    const wrapper = cache.get(name);

    // Check if we have it AND if it survived the Garbage Collector
    if (wrapper?.deref()) {
        console.log(`✅ [CACHE HIT]: Found '${name}' in memory! Skipping download.`);
        return wrapper.deref(); // Return instantly
    }

    // If not, we must download it
    console.log(`❌ [CACHE MISS]: '${name}' not found. We must download it.`);
    const newData = downloadHeavyData(name);

    // Save it for next time (wrapped safely)
    cache.set(name, new WeakRef(newData));
    registry.register(newData, name); // Tell the cleanup crew to watch it

    return newData;
}
// 3. TESTING IT OUT
console.log("--- REQUEST 1 ---");
let file1 = getCachedData("movie.mp4"); 
// Result: ❌ Miss -> ☁️ Downloads
console.log("\n--- REQUEST 2 ---");
let file2 = getCachedData("movie.mp4"); 
// Result: ✅ Hit! (Skips download because it's in the cache)
console.log("\n--- REQUEST 3 ---");
let file3 = getCachedData("song.mp3"); 
// Result: ❌ Miss -> ☁️ Downloads