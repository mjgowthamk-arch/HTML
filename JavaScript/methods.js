// -----------------------------------------------------------------------------------------
// 1. STRING METHODS (Primitives are immutable; methods return a new string)
// -----------------------------------------------------------------------------------------
// Search & Check
console.log("hello".includes("ell"));                 // true
console.log("hello".indexOf("l"));                    // 2
console.log("hello".lastIndexOf("l"));                // 3
console.log("hello".startsWith("he"));                // true
console.log("hello".endsWith("lo"));                  // true
console.log("hello".search(/e/));                     // 1 (Regex index)

// Extract & Parse
console.log("hello".slice(1, 4));                     // "ell" (Supports negatives)
console.log("hello".substring(1, 4));                 // "ell" (No negatives)
console.log("hello".at(-1));                          // "o"   (Gets char at index)
console.log("hello".charAt(1));                       // "e"
console.log("A".charCodeAt(0));                       // 65 (ASCII value)
console.log("cat".match(/a/));                        // ['a', index: 1, input: 'cat']
console.log(Array.from("abc"));                       // [ 'a', 'b', 'c' ]     
console.log("a,b,c".split(","));                      // [ 'a', 'b', 'c' ]
console.log("cat".split(""));                         // [ 'c', 'a', 't' ]
console.log([..."cat"]);                              // [ 'c', 'a', 't' ]


// Transform & Format
console.log("hello".toUpperCase());                   // "HELLO"
console.log("HELLO".toLowerCase());                   // "hello"
console.log("hello".replace("l", "r"));               // "herlo" (Replaces first match)
console.log("hello".replaceAll("l", "r"));            // "herro" (Replaces all matches)
console.log("Hello".concat(" World"));                // "Hello World"
console.log("ha".repeat(3));                          // "hahaha"
console.log("5".padStart(3, "0"));                    // "005" (use str.length + 1)
console.log("5".padEnd(3, "0"));                      // "500" (use str.length + 1)
console.log("  hi  ".trim());                         // "hi"
console.log(" hi".trimStart());                       // "hi"
console.log("hi ".trimEnd());                         // "hi"
console.log("a".localeCompare("b"));                  // -1 (Alphabetical sorting)


// -----------------------------------------------------------------------------------------
// 2. ARRAY METHODS (Categorized by Behavior)
// -----------------------------------------------------------------------------------------
// Static Methods
console.log(Array.isArray([1, 2]));                   // true
console.log(Array.from("abc"));                       // ['a', 'b', 'c']
console.log(Array.of(1, 2, 3));                       // [1, 2, 3]

// -----------------------------------------------------------------------------------------
let arr = ["a", "b", "c"];

// Get the total number of items
console.log(arr.length);              // 3
// Truncate an array by reducing its length
arr.length = 2;
console.log(arr);                     // ["a", "b"]
// Empty an array completely
arr.length = 0;
console.log(arr);                     // []

// -----------------------------------------------------------------------------------------
let arr = [10, 20, 30];

// MUTATING (Changes original array)
arr.push(40);                                         // Adds to end: [10, 20, 30, 40]
arr.pop();                                            // Removes last: [10, 20, 30]
arr.unshift(5);                                       // Adds to start: [5, 10, 20, 30]
arr.shift();                                          // Removes first: [10, 20, 30]
arr.reverse();                                        // [30, 20, 10]
arr.sort((a, b) => a - b);                            // [10, 20, 30] (Ascending sort) // sort() -- based on first number -- 12,2,3
arr.splice(1, 1, 99);                                 // [10, 99, 30] (Start, Delete Count, Insert)
arr.fill(0, 1, 2);                                    // [10, 0, 30] (Value, Start, End)
arr.copyWithin(0, 1, 2);                              // [0, 0, 30] (Target, Start, End)

// NON-MUTATING (Returns new array - ES2023+)
console.log([1, 2, 3].toReversed());                  // [3, 2, 1]
console.log([3, 1, 2].toSorted());                    // [1, 2, 3]
console.log([1, 2, 3].toSpliced(1, 1));               // [1, 3]
console.log([1, 2, 3].with(1, 99));                   // [1, 99, 3] (Replaces index 1)

// Combining & Slicing
console.log([1].concat([2]));                         // [1, 2]
console.log(["a", "b", "c"].slice(1, 3));             // ["b", "c"]
console.log(["a", "b"].join("-"));                    // "a-b"
console.log([1, [2, [3]]].flat(2));                   // [1, 2, 3] (Flattens nesting)

// Iteration & Transformation
console.log([1, 2, 3].map(x => x * 2));               // [2, 4, 6]
console.log([1, 2, 3, 4].filter(x => x > 2));         // [3, 4]
console.log([1, 2, 3].reduce((acc, x) => acc + x, 0));// 6
console.log(["a","b"].reduceRight((a, b) => a + b));  // "ba"
console.log([1, 2].flatMap(x => [x, x * 2]));         // [1, 2, 2, 4]
[1, 2].forEach(x => console.log(x));                  // Prints 1, then 2 (No return)

// Searching & Checking
console.log(arr.at(-1));                              // 30 (Last item)
console.log([1, 2, 3].includes(2));                   // true
console.log([1, 2, 1].indexOf(1));                    // 0
console.log([1, 2, 1].lastIndexOf(1));                // 2
console.log([1, 5, 10].find(x => x > 4));             // 5 (First match)
console.log([1, 5, 10].findIndex(x => x > 4));        // 1 (Index of first match)
console.log([1, 5, 10].findLast(x => x > 4));         // 10 (Last match)
console.log([2, 4, 6].every(x => x % 2 === 0));       // true (All must match)
console.log([1, 2, 15].some(x => x > 10));            // true (At least one match)


// -----------------------------------------------------------------------------------------
// 3. OBJECT METHODS (Key/Value pairs)
// -----------------------------------------------------------------------------------------
let user = { name: "Sam", age: 20 };

// Access & Extract
console.log(Object.keys(user));                       // ["name", "age"]
console.log(Object.values(user));                     // ["Sam", 20]
console.log(Object.entries(user));                    // [["name", "Sam"], ["age", 20]]
console.log(Object.fromEntries([["a", 1]]));          // { a: 1 } (Reverse of entries)

// Modify & Combine
console.log(Object.assign({ a: 1 }, { b: 2 }));       // { a: 1, b: 2 }
let proto = { greet() { return "Hi"; } };
let child = Object.create(proto);                     // Creates obj with prototype 'proto'

// Check & Inspect
console.log(user.hasOwnProperty("name"));             // true
console.log(Object.hasOwn(user, "name"));             // true (Safer than hasOwnProperty)
console.log(Object.is(NaN, NaN));                     // true (Strict equality check)
console.log(Object.getPrototypeOf(child) === proto);  // true

// Protection (Preventing modifications)
let frozenObj = Object.freeze({ x: 10 });             // Read-only (No add, edit, or delete)
console.log(Object.isFrozen(frozenObj));              // true

let sealedObj = Object.seal({ y: 20 });               // Can edit existing, no add/delete
console.log(Object.isSealed(sealedObj));              // true

let noExtObj = Object.preventExtensions({ z: 30 });   // Can edit/delete, no adding new
console.log(Object.isExtensible(noExtObj));           // false


// -----------------------------------------------------------------------------------------
// 4. NUMBER METHODS
// -----------------------------------------------------------------------------------------
console.log(Number.isInteger(4));                     // true
console.log(Number.isSafeInteger(9007887666777890));  // true
console.log(Number.isNaN(NaN));                       // true
console.log(Number.isFinite(10 / 0));                 // false (Infinity)
console.log(Number.parseFloat("3.14px"));             // 3.14
console.log(Number.parseInt("10px"));                 // 10

let num = 123.456;
console.log(num.toFixed(2));                          // "123.46" (String)
console.log(num.toPrecision(4));                      // "123.5" (String)
console.log(num.toExponential(2));                    // "1.23e+2" (String)


// -----------------------------------------------------------------------------------------
// 5. MATH METHODS
// -----------------------------------------------------------------------------------------
// Constants
console.log(Math.PI);                                 // 3.141592653589793
console.log(Math.E);                                  // 2.718281828459045

// Rounding
console.log(Math.round(4.5));                         // 5 (Nearest integer)
console.log(Math.floor(4.9));                         // 4 (Rounds down)
console.log(Math.ceil(4.1));                          // 5 (Rounds up)
console.log(Math.trunc(-4.9));                        // -4 (Strips decimals)

// Operations
console.log(Math.abs(-5));                            // 5 (Absolute value)
console.log(Math.sign(-50));                          // -1 (Returns 1, -1, 0, or -0)
console.log(Math.max(1, 5, 2));                       // 5
console.log(Math.min(1, 5, 2));                       // 1
console.log(Math.pow(2, 3));                          // 8 (Same as 2 ** 3)
console.log(Math.sqrt(9));                            // 3 (Square root)
console.log(Math.cbrt(27));                           // 3 (Cube root)
console.log(Math.random());                           // Random float between 0 and 0.999...


// -----------------------------------------------------------------------------------------
// 6. DATE METHODS
// -----------------------------------------------------------------------------------------
let now = new Date();                                 // Current Date & Time
console.log(now);                                     // 2026-09-18T13:38:58.131Z
console.log(Date.now());                              // 1789738920812 (ms since 1970)

let d = new Date("2024-01-15T12:00:00");
console.log(d.getFullYear());                         // 2024
console.log(d.getMonth());                            // 0 (0 = Jan, 11 = Dec)
console.log(d.getDate());                             // 15 (Day of the month)
console.log(d.getDay());                              // 1 (Day of week: 0 = Sun, 6 = Sat)
console.log(d.getHours());                            // 12
console.log(d.getTime());                             // 1705320000000 (ms timestamp)
console.log(d.toISOString());                         // "2024-01-15T12:00:00.000Z"
console.log(d.toLocaleDateString());                  // "1/15/2024" (Based on local timezone)


// -----------------------------------------------------------------------------------------
// 7. SETS & MAPS (Modern Collections)
// -----------------------------------------------------------------------------------------
// SET: Unique values only
let set = new Set([1, 2, 2, 3]);
set.add(4);                                           // Set(4) {1, 2, 3, 4}
set.delete(2);                                        // Set(3) {1, 3, 4}
console.log(set.has(3));                              // true
console.log(set.size);                                // 3
console.log([...set]);                                // [1, 3, 4] (Convert back to array)
set.clear();                                          // Empties the Set

// MAP: Key-Value pairs of ANY type (unlike objects which only use strings/symbols for keys)
let map = new Map();
map.set("name", "Sam");
map.set(10, "Ten");                                   // Key can be a number
console.log(map.get("name"));                         // "Sam"
console.log(map.has(10));                             // true
console.log(map.size);                                // 2
console.log([...map.keys()]);                         // ["name", 10]
console.log([...map.values()]);                       // ["Sam", "Ten"]
map.delete("name");                                   // Removes "name" key
map.clear();                                          // Empties the Map

// -----------------------------------------------------------------------------------------
// 8. PROMISES (Asynchronous JS)
// -----------------------------------------------------------------------------------------
let p1 = Promise.resolve("Success!");
let p2 = Promise.reject("Failed!");

p1.then(res => console.log(res))                      // Handles success
  .catch(err => console.log(err))                     // Handles errors
  .finally(() => console.log("Done"));                // Runs regardless of outcome

// Promise Combinators
Promise.all([p1, p1])                                 // Resolves if ALL resolve, rejects if 1 fails
  .then(res => console.log(res));                     // ["Success!", "Success!"]

Promise.allSettled([p1, p2])                          // Waits for all, regardless of pass/fail
  .then(res => console.log(res));                     // [{status: "fulfilled", value: "Success!"}, {status: "rejected", reason: "Failed!"}]

Promise.race([p1, p2])                                // Returns the FIRST to finish (pass or fail)
Promise.any([p1, p2])                                 // Returns the FIRST to succeed (ignores fails)


// -----------------------------------------------------------------------------------------
// 9. JSON METHODS
// -----------------------------------------------------------------------------------------
let obj = { name: "Sam", role: "Dev" };

// Object to String
let jsonStr = JSON.stringify(obj);                    // '{"name":"Sam","role":"Dev"}'
let prettyJson = JSON.stringify(obj, null, 2);        // Formats string with 2 spaces indentation

// String to Object
let parsed = JSON.parse('{"name":"Sam"}');            // { name: "Sam" }
console.log(parsed.name);                             // "Sam"


 