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
alert(merged); // 0,3,5,1,2,8,9,15 

// ----------------------------------------

let str = "Hello";
alert( [...str] ); // H,e,l,l,o

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
