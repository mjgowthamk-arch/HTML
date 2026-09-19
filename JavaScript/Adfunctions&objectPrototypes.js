// recursion and stack

function sumTo(n) {
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
}

alert( sumTo(5) );

// ----------------------------------------

function sumall(n){
  return (n===0) ? false : n + sumall(n-1)
}
console.log(sumall(5))

// ----------------------------------------

function fact(n){
    let f = 1;
    for (let i = 1; i <= n; i++){ 
        f *= i;
    }
    return f;
}

alert( fact(5) );

// ----------------------------------------

function facts(n) {
  return (n === 0) ? 1 : n * facts(n - 1);
}

console.log(facts(5)); 

// ----------------------------------------

function fibonacci(a){
  if (a<=1){
    return a;
  }
  else {
    return fibonacci(a-1)+fibonacci(a-2);
  }
  
}
console.log(fibonacci(7));

// ----------------------------------------

function fibonacci(a){
    return (a<=1) ? a : fibonacci(a-1)+fibonacci(a-2);
}
console.log(fibonacci(7));

// Rest parameters and spread syntax

// The rest parameters must be at the end

function showName(firstName, lastName, ...titles) {
  alert( firstName + ' ' + lastName ); // Julius Caesar

  // the rest go into titles array
  // titles = ["Consul", "Imperator"]
  alert( titles[0] ); // Consul
  alert( titles[1] ); // Imperator
  alert( titles.length ); // 2
}
showName("Julius", "Caesar", "Consul", "Imperator");

// ----------------------------------------

// special array-like object named arguments that contains all arguments by their index.

function showName() {
  alert( arguments.length );
  alert( arguments[0] );
  alert( arguments[1] );

  for(let arg of arguments) {
    alert(arg);
  }
}
// shows: 2, Julius, Caesar
showName("Julius", "Caesar");

// shows: 1, Ilya, undefined (no second argument)
showName("Ilya");

// ----------------------------------------

// Spread syntax

let arr = [3, 5, 1];
alert( Math.max(...arr) ); // 5 (spread turns array into a list of arguments)

// ----------------------------------------

let arr1 = [1, -2, 3, 4];
let arr2 = [8, 3, -8, 1];
alert( Math.max(...arr1, ...arr2) ); // 8
alert( Math.max(1, ...arr1, 2, ...arr2, 25) ); // 25

// ----------------------------------------

let arr3 = [3, 5, 1];
let arr4 = [8, 9, 15];
let merged = [0, ...arr3, 2, ...arr4];
alert(merged); // [ 0,3,5,1,2,8,9,15 ]

// ----------------------------------------

let str = "Hello";
alert( [...str] ); // [ 'H', 'e', 'l', 'l', 'o' ]

// ----------------------------------------

// Copy an array/object

let arr5 = [1, 2, 3];

let arrCopy = [...arr5]; // spread the array into a list of parameters then put the result into a new array

// do the arrays have the same contents?
alert(JSON.stringify(arr5) === JSON.stringify(arrCopy)); // true

// are the arrays equal?
alert(arr5 === arrCopy); // false (not same reference)

// modifying our initial array does not modify the copy:
arr5.push(4);
alert(arr5); // 1, 2, 3, 4
alert(arrCopy); // 1, 2, 3

// ----------------------------------------

let obj = { a: 1, b: 2, c: 3 };

let objCopy = { ...obj }; // spread the object into a list of parameters then return the result in a new object

// do the objects have the same contents?
alert(JSON.stringify(obj) === JSON.stringify(objCopy)); // true

// are the objects equal?
alert(obj === objCopy); // false (not same reference)

// modifying our initial object does not modify the copy:
obj.d = 4;
alert(JSON.stringify(obj)); // {"a":1,"b":2,"c":3,"d":4}
alert(JSON.stringify(objCopy)); // {"a":1,"b":2,"c":3}

// ----------------------------------------

let runners = ["Alice", "Bob", "Charlie", "Dave"];

let [firstPlace, secondPlace, ...participation] = runners;

console.log(firstPlace); // "Alice"
console.log(secondPlace); // Bob
console.log(participation); // [ 'Charlie', 'Dave' ]

// ----------------------------------------
// Nested functions

function sayHiBye(firstName, lastName) {
  // helper nested function to use below
  function getFullName() {
    // It grabs firstName and lastName from the outer function
    return firstName + " " + lastName; 
  }
  alert( "Hello, " + getFullName() );
  alert( "Bye, " + getFullName() );
}
sayHiBye("Julius", "Caesar");

// ----------------------------------------

function makeCounter() {
  let count = 0;

  return function() {  //  Returning a function
    return count++;
  };
}

let counter = makeCounter();

alert( counter() ); // 0
alert( counter() ); // 1
alert( counter() ); // 2

// ----------------------------------------

// setTimeout

function sayHi(phrase, who) {
  alert( phrase + ', ' + who );
}
setTimeout(sayHi, 1000, "Hello", "John"); // Hello, John

// ----------------------------------------

// Canceling with clearTimeout

let timerId = setTimeout(() => alert("never happens"), 1000);
alert(timerId); // timer identifier

clearTimeout(timerId);
alert(timerId); // same identifier (doesn't become null after canceling)

// setInterval

// repeat with the interval of 2 seconds
let timerId1 = setInterval(() => alert('tick'), 2000);

// after 5 seconds stop
setTimeout(() => { clearInterval(timerId1); alert('stop'); }, 5000);

// ----------------------------------------

// Nested setTimeout

/** instead of:
let timerId = setInterval(() => alert('tick'), 2000);
*/

let timerId2 = setTimeout(function tick() {
  alert('tick');
  timerId2 = setTimeout(tick, 2000); // (*)
}, 2000);

// ----------------------------------------

let i = 0;
setInterval(() => alert(i), 100);        // i = 100000000

// heavy loop taking 2 full seconds      // JavaScript is single-threaded, meaning it can only process one piece of code at a time.
for(let j = 0; j < 100000000; j++) {    
  i++;
}

// ----------------------------------------

function time(from, to){
  let current=from;
  setTimeout(function go(){
    alert(current);
    if (current<to){
      setTimeout(go,1000);
    } current++;
    }, 1000);
}
time(5,10);

// ----------------------------------------

function printNumbers(from, to) {
  let current = from;
  function go() {
    alert(current);
    if (current == to) {
      clearInterval(timerId);
    }
    current++;
  }
  go();
  let timerId = setInterval(go, 1000);
}
printNumbers(5, 10);

// ----------------------------------------

// Function binding
// Losing “this”

let user = {
  firstName: "John",
  sayHi() {
    alert(`Hello, ${this.firstName}!`);
  }
};

setTimeout(user.sayHi, 1000); // Hello, undefined!

// Solution 1: a wrapper

let user1 = {
  firstName: "John",
  sayHi() {
    alert(`Hello, ${this.firstName}!`);
  }
};

setTimeout(function() {
  user1.sayHi(); // Hello, John!
}, 1000);

// Solution 2: bind

let user2 = {
  firstName: "John",
  sayHi() {
    alert(`Hello, ${this.firstName}!`);
  }
};

let func= user2.sayHi.bind(user2);             // setTimeout(user.sayHi.bind(user), 1000);
setTimeout(func, 1000); // Hello, John!

// ----------------------------------------

let user3 = {
  firstName: "John"
};

function func() {
  alert(this.firstName);
}

let funcUser = func.bind(user3);               // func.bind(user3)()
funcUser(); // John

// ----------------------------------------

// Partial functions

function mul(a, b) {
  return a * b;
}

let double = mul.bind(null, 2);

alert( double(3) ); // = mul(2, 3) = 6
alert( double(4) ); // = mul(2, 4) = 8
alert( double(5) ); // = mul(2, 5) = 10

// ----------------------------------------

// Arrow functions
// Arrows have no “arguments”
// Arrow functions do not have their own this or their own arguments object.
// Arrow functions can’t be used as constructors. They can’t be called with new.

function f() {
  let showArg = () => alert(arguments[0]);              // takes them from the outer “normal” function.
  showArg();
}
f(1); // 1


let group = {
  title: "Our Group",
  students: ["John", "Pete", "Alice"],

  showList() {
    this.students.forEach(
      student => alert(this.title + ': ' + student)     // regular function here will cause error
    );
  }
};

group.showList();

// ----------------------------------------
// Object properties
// ----------------------------------------

let user4 = {
  name: "John"
};
let descriptor = Object.getOwnPropertyDescriptor(user4, 'name');
alert( JSON.stringify(descriptor, null, 2 ) ); 

/* {
  "value": "John",
  "writable": true,
  "enumerable": true,
  "configurable": true
}
*/

// ----------------------------------------

obj={};
Object.defineProperty(obj, "name",{ value:'harry'});
a=Object.getOwnPropertyDescriptor(obj,'name');
alert( JSON.stringify(a, null, 2 ) );

/*
{
  "value": "harry",
  "writable": false,
  "enumerable": false,
  "configurable": false
}
*/

// Non-writable

let user5 = {
  name: "John"
};

Object.defineProperty(user5, "name", {              
  writable: false
});

user5.name = "Pete"; // Error: Cannot assign to read only property 'name'  // In strict mode

// ----------------------------------------

let user6 = { };

Object.defineProperty(user6, "name", {
  value: "John",
  // for new properties we need to explicitly list what's true
  enumerable: true,
  configurable: true
});

alert(user6.name); // John
user6.name = "Pete"; // Error  // In strict mode

// ----------------------------------------

// Non-enumerable

let user7 = {
  name: "John",
  toString() {
    return this.name;
  }
};

Object.defineProperty(user7, "toString", {
  enumerable: false
});

// Now our toString disappears:
for (let key in user7) alert(key); // name

// ----------------------------------------

// Non-configurable

let user8 = {
  name: "John"
};

Object.defineProperty(user, "name", {
  configurable: false
});

user.name = "Pete"; // works fine
delete user.name; // Error

// ----------------------------------------

let user9 = {
  name: "John"
};

Object.defineProperty(user9, "name", {
  writable: false,
  configurable: false
});

// won't be able to change user.name or its flags
// all this won't work:
user9.name = "Pete";
delete user9.name;
Object.defineProperty(user9, "name", { value: "Pete" });

// ----------------------------------------
// Object.defineProperties

let obj = {
  name: "John",
  toString() {
    return this.name;
  }
};

Object.defineProperties(obj, {
  "toString": { enumerable: false },
  "name":     { enumerable: false, configurable: false, writable: false }
  
});

let a=Object.getOwnPropertyDescriptor(obj,'name');
alert( JSON.stringify(a, null, 2 ) );

// ----------------------------------------
// Object.getOwnPropertyDescriptors

"use strict"; // To see errors

let original = { name: "John" };

// name strictly read-only
Object.defineProperty(original, "name", { 
  writable: false 
});

// ❌ (Standard cloning)
let normalClone = { ...original };

// It copied the text "John", but it forgot the read-only rule!
normalClone.name = "Pete"; 
console.log("Normal clone name:", normalClone.name); // Pete

// ✅ (Descriptor cloning)
let perfectClone = Object.defineProperties({}, Object.getOwnPropertyDescriptors(original));

// perfectClone.name = "Pete"; // cause error

console.log("Perfect clone name:", perfectClone.name); // John

// ----------------------------------------
// Sealing an object globally

"use strict";

let user10 = { name: "John" };
Object.preventExtensions(user10);

console.log( Object.isExtensible(user10) ); // false (Cannot be extended)

// ✅ ALLOWED: You can still change existing properties
user10.name = "Pete"; 

// ✅ ALLOWED: You can still delete existing properties
delete user10.name;   

// ❌ ERROR: You cannot add new properties
// user10.age = 30; // TypeError: Cannot add property age, object is not extensible

"use strict";

let user11 = { name: "Sarah" };
Object.seal(user11);

console.log( Object.isSealed(user11) ); // true (It is successfully sealed)

// ✅ ALLOWED: You can still change existing values
user11.name = "Jessica"; 

// ❌ ERROR: You cannot add new properties
// user11.age = 25; // TypeError: Cannot add property age

// ❌ ERROR: You cannot delete existing properties
// delete user11.name; // TypeError: Cannot delete property 'name'

"use strict";

let user12 = { name: "Mike" };
Object.freeze(user12);

console.log( Object.isFrozen(user12) ); // true (It is completely frozen)

// ❌ ERROR: You cannot change existing values
// user12.name = "David"; // TypeError: Cannot assign to read only property 'name'

// ❌ ERROR: You cannot add new properties
// user12.age = 40; // TypeError: Cannot add property age

// ❌ ERROR: You cannot delete existing properties
// delete user12.name; // TypeError: Cannot delete property 'name'

// ----------------------------------------
// Getters and setters
// Accessor properties are represented by “getter” and “setter” methods. In an object literal they are denoted by get and set:

/* 
Doing math or combining strings (like making fullName) - Standard getter/setter.
Writing if/else statements to reject bad data and hiding the real data behind an underscore (like _age) - Smart getter/setter.
*/

let user = {
  name: "John",
  surname: "Smith",

  get fullName() {
    return `${this.name} ${this.surname}`;
  },

  set fullName(value) {
    [this.name, this.surname] = value.split(" ");
  }
};

// set fullName is executed with the given value.
user.fullName = "Alice Cooper";

alert(user.name); // Alice
alert(user.surname); // Cooper

// ----------------------------------------
// NORMAL PROPERTY (Unsafe)
let user = { age: 25 };
user.age = -999; // JavaScript allows this. Now your app has a bug!

// SETTER (Safe)
let smartUser = {
  _age: 25,
  set age(value) {
    if (value < 0) alert("Age cannot be negative!");
    else this._age = value;
  }
};
smartUser.age = -999; // The setter blocks the bad data!

// ----------------------------------------

let user = {
  firstName: "John",
  lastName: "Smith",
  
  // No matter how many times firstName changes, fullName is always correct!
  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }
};

user.firstName = "Pete";
console.log(user.fullName); // Instantly outputs "Pete Smith"

// ----------------------------------------

let player = {
  _health: 100,
  
  set health(value) {
    this._health = value;
    console.log("Updating the health bar on the screen...");
    if (this._health <= 0) {
      console.log("GAME OVER!");
    }
  }
};

player.health = 0;

// ----------------------------------------
// Accessor descriptors

let user = {
  name: "John",
  surname: "Smith"
};

Object.defineProperty(user, 'fullName', { enumerable: true,   // get and set define later outside the object
  get() {
    return `${this.name} ${this.surname}`;
  },

  set(value) {
    [this.name, this.surname] = value.split(" ");
  }
});

alert(user.fullName); // John Smith

for(let key in user) alert(key); // name, surname, fullName

// ----------------------------------------
// Compatibility

let user = {
  birthYear: 2001, // The new way we store data
  
  // The old property name is now a getter, calculating on the fly!
  get age() {
    let currentYear = new Date().getFullYear();
    return currentYear - this.birthYear; 
  }
};

console.log(user.birthYear); // 2001 (New code uses this)
console.log(user.age);       // 25 (Old code still works perfectly!)

// ----------------------------------------

function User(name, birthday) {
  this.name = name;
  this.birthday = birthday;

  // age is calculated from the current date and birthday
  Object.defineProperty(this, "age", {
    get() {
      let todayYear = new Date().getFullYear();
      return todayYear - this.birthday.getFullYear();
    }
  });
}

let john = new User("John", new Date(1993, 6, 1));

alert( john.birthday ); // 1993-07-01T00:00:00.000Z
alert( john.age );      // 33

// ----------------------------------------
// Prototypal inheritance

let animal = {
  eats: true
};
let rabbit = {
  jumps: true
};

rabbit.__proto__ = animal; // 

// we can find both properties in rabbit now:
alert( rabbit.eats ); // true
alert( rabbit.jumps ); // true

// ----------------------------------------

let animal1 = {
  eats: true,
  walk() {
    alert("Animal walk");
  }
};

let rabbit1 = {
  jumps: true,
  __proto__: animal1
};

// walk is taken from the prototype
rabbit1.walk(); // Animal walk

// ----------------------------------------

// Writing doesn’t use prototype
// Write/delete operations work directly with the object.

let animal2 = {
  eats: true,
  walk() {
     alert("Animal!");
  }
};

let rabbit2 = {
  __proto__: animal2
};

rabbit2.walk = function() {
  alert("Rabbit!");
};

rabbit2.walk(); // Rabbit! 

// ----------------------------------------

// The value of “this”
// Methods are shared, but state (data) is not shared.

// animal has methods
let animal3 = {
  walk() {
    if (!this.isSleeping) {
      alert(`I walk`);
    }
  },
  sleep() {
    this.isSleeping = true;     // this always points to the object that is calling it (the object right before the dot).
  }
};

let rabbit3 = {
  name: "White Rabbit",
  __proto__: animal3
};

// modifies rabbit.isSleeping
rabbit3.sleep();

alert(rabbit3.isSleeping); // true
alert(animal3.isSleeping); // undefined (no such property in the prototype)

// ----------------------------------------
// for…in loop

let animal4 = {
  eats: true
};

let rabbit4 = {
  jumps: true,
  __proto__: animal4
};

// Object.keys only returns own keys
alert(Object.keys(rabbit4)); // jumps

// for..in loops over both own and inherited keys
for(let prop in rabbit4) alert(prop); // jumps, eats

// ----------------------------------------

let animal5 = {
  eats: true
};

let rabbit5 = {
  jumps: true,
  __proto__: animal5
};

for(let prop in rabbit5) {
  let isOwn = rabbit5.hasOwnProperty(prop);

  if (isOwn) {
    alert(`Our: ${prop}`); // Our: jumps
  } else {
    alert(`Inherited: ${prop}`); // Inherited: eats
  }
}

// ----------------------------------------

let hamster = {
  stomach: [],

  eat(food) {
    this.stomach.push(food);
  }
};

let speedy = {
  __proto__: hamster
};

let lazy = {
  __proto__: hamster
};

// speedy found the food
speedy.eat("apple");
alert( speedy.stomach ); // apple

// lazy also has it
alert( lazy.stomach ); // apple

// ----------------------------------------
// Default F.prototype, constructor property

let animal6 = {
  eats: true
};

function Rabbit(name) {
  this.name = name; 
}

Rabbit.prototype = animal6; // Forces all future rabbits to link to 'animal'

let rabbit = new Rabbit("White Rabbit"); // 'new' builds the object and wires the __proto__

alert( rabbit.eats ); // true 

// ----------------------------------------
// Changing native prototypes

String.prototype.show = function() {
  alert(this);
};

"BOOM!".show(); // BOOM!

delete String.prototype.show; // To delete the custom method

// ----------------------------------------
// Borrowing from prototypes

let obj = {
  0: "Hello",
  1: "world!",
  length: 2,
};

obj.join = Array.prototype.join;

alert( obj.join(',') ); // Hello,world!

// ----------------------------------------
// Add method "f.defer(ms)" to functions

Function.prototype.defer = function(ms) {
  setTimeout(this, ms);
};

function f() {
  alert("Hello!");
}
f.defer(1000); // shows "Hello!" after 1 sec

// ----------------------------------------
// Add the decorating "defer()" to functions

Function.prototype.defer = function(ms) {
  let f = this;
  return function(...args) {
    setTimeout(() => f.apply(this, args), ms);
  }
};

// check it
function f(a, b) {
  alert( a + b );
}

f.defer(1000)(1, 2); // shows 3 after 1 sec

// ----------------------------------------

Function.prototype.defer = function(ms) {
  let f = this;
  return function(...args) {
    setTimeout(() => f.apply(this, args), ms);
  }
};

let user = {
  name: "John",
  sayHi() {
    alert(this.name);
  }
}
user.sayHi = user.sayHi.defer(1000);
user.sayHi();

// ----------------------------------------
// Error handling, "try...catch"

try {

  alert('Start of try runs');  

  lalala; // error, variable is not defined!

  alert('End of try (never reached)');  

} catch (err) {

  alert(`Error has occurred!`); 

}

// ----------------------------------------
// If an exception happens in “scheduled” code, like in setTimeout, then try...catch won’t catch it:

try {
  setTimeout(function() {
    noSuchVariable;
  }, 1000);
} catch (err) {
  alert( "won't work" );
}

// ----------------------------------------

setTimeout(function() {
  try {
    noSuchVariable; 
  } catch {
    alert( "error is caught here!" );
  }
}, 1000);

// ----------------------------------------

try {
  noSuchVariable;
} catch (err) {
  alert("The exact error was: " + err.message);       // .name, .stack, err --- error object
}

// ----------------------------------------

try {
  noSuchVariable;
} catch { // Notice: No (err) here at all!
  alert("Something broke, but we safely caught it.");
}

// ----------------------------------------

let json = "{ bad json }";

try {

  let user = JSON.parse(json); // <-- when an error occurs...
  alert( user.name ); // doesn't work

} catch (err) {
  // ...the execution jumps here
  alert( "Our apologies, the data has errors, we'll try to request it one more time." );
  alert( err.name );
  alert( err.message );
}

// ----------------------------------------
// JavaScript has many built-in constructors for standard errors: 

let error1 = new Error(message);
let error2 = new SyntaxError(message);
let error3 = new ReferenceError(message);

let error = new Error("Things happen o_O");

alert(error.name); // Error
alert(error.message); // Things happen o_O

// ----------------------------------------
// “Throw” operator

let json1 = '{ "age": 30 }'; // incomplete data

try {

  let user = JSON.parse(json1); // <-- no errors

  if (!user.name) {
    throw new SyntaxError("Incomplete data: no name"); // (*)
  }

  alert( user.name );

} catch (err) {
  alert( "JSON Error: " + err.message ); // JSON Error: Incomplete data: no name
}

// ----------------------------------------
// try…catch…finally

try {
  alert( 'try' );
  if (confirm('Make an error?')) BAD_CODE();
} catch (err) {
  alert( 'catch' );
} finally {
  alert( 'finally' );
}

// ----------------------------------------

let num = +prompt("Enter a positive integer number?", 35)
let diff, result;

function fib(n) {
  if (n < 0 || Math.trunc(n) != n) {
    throw new Error("Must not be negative, and also an integer.");
  }
  return n <= 1 ? n : fib(n - 1) + fib(n - 2);
}

let start = Date.now();

try {
  result = fib(num);
} catch (err) {
  result = 0;
} finally {
  diff = Date.now() - start;
}

alert(result || "error occurred");
alert( `execution took ${diff}ms` );

// ----------------------------------------

function f() {
  try {
    alert('start');
    return "result";
  } catch (err) {
    /// ...
  } finally {
    alert('cleanup!');
  }
}
f(); // cleanup!

// ----------------------------------------

function f() {
  try {
    alert('start');
    throw new Error("an error");
  } catch (err) {
    // ...
    if("can't handle the error") {
      throw err;
    }

  } finally {
    alert('cleanup!')
  }
}
f(); // cleanup!