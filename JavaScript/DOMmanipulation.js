// Browser environment, specs

function sayHi() {
  alert("Hello");
}
window.sayHi();  // global functions are methods of the global object

// --------------------------------------------------------------------------

alert(window.innerHeight); // inner window height

// --------------------------------------------------------------------------

// DOM (Document Object Model)

document.body.style.background = "red";  // change the background color to red
setTimeout(() => document.body.style.background = "", 1000);    // change it back after 1 second                             

// --------------------------------------------------------------------------

// BOM (Browser Object Model)

alert(location.href); // shows current URL
if (confirm("Go to Wikipedia?")) {
  location.href = "https://wikipedia.org"; // redirect the browser to another URL
}

// --------------------------------------------------------------------------

// DOM tree

document.body.style.background = 'red'; // make the background red
setTimeout(() => document.body.style.background = '', 3000); // return back

$0.style.background = 'red' // makes the selected list item red

// Walking the DOM

for (let i = 0; i < document.body.childNodes.length; i++) {
    alert( document.body.childNodes[i] ); // Text, DIV, Text, UL, ..., SCRIPT    
}

// --------------------------------------------------------------------------

elem.childNodes[0] === elem.firstChild
elem.childNodes[elem.childNodes.length - 1] === elem.lastChild

// --------------------------------------------------------------------------

/* 
DOM collections

childNodes looks like an array. but its special array-like iterable object.
*/

for (let node of document.body.childNodes) {
  alert(node); // shows all nodes from the collection
}

// --------------------------------------------------------------------------

// More links: tables

/*
<table id="table">
  <tr>
    <td>one</td><td>two</td>
  </tr>
  <tr>
    <td>three</td><td>four</td>
  </tr>
</table>

<script>
  // get td with "two" (first row, second column)
  let td = table.rows[0].cells[1];
  td.style.backgroundColor = "red"; // highlight it
</script>
*/

// --------------------------------------------------------------------------

// Searching: getElement*, querySelector*

/*
<div id="elem">
  <div id="elem-content">Element</div>
</div>

<script>
  // get the element
  let elem = document.getElementById('elem');

  // make its background red
  elem.style.background = 'red';
</script>
*/

// --------------------------------------------------------------------------

// querySelectorAll

/*
<ul>
  <li>The</li>
  <li>test</li>
</ul>
<ul>
  <li>has</li>
  <li>passed</li>
</ul>
<script>
  let elements = document.querySelectorAll('ul > li:last-child');

  for (let elem of elements) {
    alert(elem.innerHTML); // "test", "passed"
  }
</script>
*/

// --------------------------------------------------------------------------

/* 
<ul id="fruit-list">
  <li class="apple">First Apple</li>
  <li class="apple">Second Apple</li>
  <li class="apple">Third Apple</li>
</ul>

<script>
  let list = document.getElementById('fruit-list');

  // Method 1: using querySelector
  let firstMethod = list.querySelector('.apple');
  firstMethod.style.color = 'red'; 

  // Method 2: using querySelectorAll()[0]
  let secondMethod = list.querySelectorAll('.apple')[0];
  secondMethod.style.fontWeight = 'bold'; 

  // Both variables refer to the exact same "First Apple" element
  console.log(firstMethod === secondMethod); // true
</script>
*/

// --------------------------------------------------------------------------

// The “nodeType” property

let elem = document.body;

// let's examine: what type of node is in elem?
alert(elem.nodeType); // 1 => element

// and its first child is...
alert(elem.firstChild.nodeType); // 3 => text

// for the document object, the type is 9
alert( document.nodeType ); // 9

// --------------------------------------------------------------------------

// Tag: nodeName and tagName

alert( document.body.nodeName ); // BODY
alert( document.body.tagName ); // BODY
 
// for comment
alert( document.body.firstChild.tagName ); // undefined (not an element)
alert( document.body.firstChild.nodeName ); // #comment

// for document
alert( document.tagName ); // undefined (not an element)
alert( document.nodeName ); // #document

// --------------------------------------------------------------------------

// innerHTML: the contents

alert( document.body.innerHTML ); // read the current contents   
document.body.innerHTML = 'The new BODY!'; // replace it
 
document.body.innerHTML = '<b>test'; // forgot to close the tag
alert( document.body.innerHTML ); // <b>test</b> (Browser will fix)

// --------------------------------------------------------------------------

// Beware: “innerHTML+=” does a full overwrite

/*
<div id="box">
  <b>Hello</b>
</div>

<script>
  // STEP 1: The browser sees the current HTML string inside "box"
  // "<b>Hello</b>"

  // STEP 2: We use += to add new HTML
  document.getElementById('box').innerHTML += " <i>World</i>";

  // STEP 3: The browser combines the old string and new string, 
  // replacing the contents of "box" with this final string:
  // "<b>Hello</b> <i>World</i>"
</script>
*/

// --------------------------------------------------------------------------

// outerHTML

// <div id="box" class="fancy">Hello</div>

<script>
  let box = document.getElementById('box');

  console.log(box.innerHTML); // Outputs: "Hello"
  console.log(box.outerHTML); // Outputs: '<div id="box" class="fancy">Hello</div>'
</script>

// --------------------------------------------------------------------------

// Beware: unlike innerHTML, writing to outerHTML does not change the element. Instead, it replaces it in the DOM.

// <div id="box">Old Box</div>

let box = document.getElementById('box');

// We replace the entire <div> with a new <p> tag in the DOM
box.outerHTML = "<p>New Paragraph</p>";

// BEWARE: The webpage now shows "New Paragraph", but...

// 1. The variable 'box' still holds the old <div>!
console.log(box.outerHTML); // Outputs: <div id="box">Old Box</div>

// 2. Changing the variable does nothing to the screen anymore
box.style.background = 'red'; // This will NOT show up on the page

// --------------------------------------------------------------------------

// Attributes and properties
// DOM properties

document.body.myData = {
  name: 'Caesar',
  title: 'Imperator'
};

alert(document.body.myData.title); // Imperator

// --------------------------------------------------------------------------

document.body.sayTagName = function() {
  alert(this.tagName);
};

document.body.sayTagName(); // BODY (the value of "this" in the method is document.body)

// --------------------------------------------------------------------------

Element.prototype.sayHi = function() {
  alert(`Hello, I'm ${this.tagName}`);
};

document.documentElement.sayHi(); // Hello, I'm HTML
document.body.sayHi(); // Hello, I'm BODY

// --------------------------------------------------------------------------

// Creating an element

// 1. Create <div> element
let div = document.createElement('div');

// 2. Set its class to "alert"
div.className = "alert";

// 3. Fill it with the content
div.innerHTML = "<strong>Hi there!</strong> You've read an important message.";

// Insertion methods

let div = document.createElement('div');
div.className = "alert";
div.innerHTML = "<strong>Hi there!</strong> You've read an important message.";

document.body.append(div);

/*
<ol id="ol">
  <li>0</li>
  <li>1</li>
  <li>2</li>
</ol>

<script>
  ol.before('before'); // insert string "before" before <ol>
  ol.after('after'); // insert string "after" after <ol>

  let liFirst = document.createElement('li');
  liFirst.innerHTML = 'prepend';
  ol.prepend(liFirst); // insert liFirst at the beginning of <ol>

  let liLast = document.createElement('li');
  liLast.innerHTML = 'append';
  ol.append(liLast); // insert liLast at the end of <ol>
</script>
*/









/* --------------------------------------------------------------------------
   1. LEARNING HOW TO MANAGE THE BROWSER PAGE
   --------------------------------------------------------------------------
   JavaScript allows you to make your static HTML web pages interactive. 
   When a web page loads, the browser converts your HTML into a JavaScript 
   object. By modifying this object using JavaScript, you can instantly change 
   what the user sees on the screen without reloading the page!
*/


/* --------------------------------------------------------------------------
   2. DOCUMENT
   --------------------------------------------------------------------------
   The `document` object represents your entire HTML page. It is the entry 
   point to all the content on your page. If you want to find, change, or 
   delete an HTML tag, you MUST start with `document`.
*/
// Examples of basic document properties:
console.log(document.title); // Reads the <title> of the webpage
document.title = "New Tab Title!"; // Changes the tab title
console.log(document.body);  // Grabs the entire <body> tag


/* --------------------------------------------------------------------------
   3. BROWSER ENVIRONMENT, SPECS
   --------------------------------------------------------------------------
   The browser gives you a "Global Object" called `window`. 
   `document` is just one part of `window`. It also holds the BOM 
   (Browser Object Model), which lets you control the browser itself.
*/
// WINDOW (The browser tab)
window.alert("Welcome to the page!"); // Pop-up alert
window.innerHeight; // How tall the user's browser window is

// BOM (Browser Object Model - specs about the browser/URL)
console.log(location.href); // Prints the current website URL
location.href = "https://google.com"; // Redirects the user to a new page
console.log(navigator.userAgent); // Tells you what browser the user is using


/* --------------------------------------------------------------------------
   4. DOM TREE
   --------------------------------------------------------------------------
   The DOM (Document Object Model) is structured like an upside-down tree.
   <html> is the root trunk, <head> and <body> are the big branches, and 
   tags like <h1> or <p> are the leaves.
   
   CRITICAL RULE: The DOM Tree contains BOTH "Elements" (real HTML tags) 
   and "Nodes" (which include HTML tags PLUS invisible text spaces/line breaks).
   Always prefer "Element" properties so you don't accidentally select a space!
*/


/* --------------------------------------------------------------------------
   5. WALKING THE DOM
   --------------------------------------------------------------------------
   "Walking" means moving from one HTML tag to its parent, child, or sibling 
   without needing to search the whole document again.
*/
const bodyElement = document.body;

// Going DOWN (Finding children)
bodyElement.firstElementChild;   // Safe: Gets the 1st HTML tag inside body
bodyElement.lastElementChild;    // Safe: Gets the last HTML tag inside body
bodyElement.children;            // Safe: Returns a list of ALL child HTML tags
// bodyElement.childNodes;       // RISKY: Includes invisible spaces/line breaks

// Going UP (Finding parents)
const myHeader = document.body.firstElementChild;
myHeader.parentElement;          // Returns the <body> tag

// Going SIDEWAYS (Finding siblings)
myHeader.nextElementSibling;     // Gets the next HTML tag directly after it
myHeader.previousElementSibling; // Gets the HTML tag right before it


/* --------------------------------------------------------------------------
   6. SEARCHING: getElement*, querySelector*
   --------------------------------------------------------------------------
   If you don't want to "walk", you can search the page directly using CSS selectors.
*/
// --- THE MODERN WAY (Use these 99% of the time) ---
// querySelector: Finds the FIRST element that matches the CSS selector
const box = document.querySelector('.box'); 
const myApp = document.querySelector('#app'); 

// querySelectorAll: Finds ALL matching elements (returns a list you can loop through)
const allButtons = document.querySelectorAll('button'); 

// --- THE OLDER WAYS (Faster, but older syntax) ---
const mainDiv = document.getElementById('main'); // Finds by ID (No '#' needed)
const activeItems = document.getElementsByClassName('active'); // Finds by class
const allLinks = document.getElementsByTagName('a'); // Finds by HTML tag

// --- MATCHING & CLOSEST ---
if (box) {
    box.matches('.active'); // true/false: Does this box have the class 'active'?
    box.closest('section'); // Looks UP the tree to find the nearest <section> parent
}


/* --------------------------------------------------------------------------
   7. NODE PROPERTIES: TYPE, TAG AND CONTENTS
   --------------------------------------------------------------------------
   Once you have an element, you can read what type it is and change its text.
*/
if (box) {
    // Info about the node
    console.log(box.tagName);  // Returns "DIV", "P", "A", etc. (Always UPPERCASE)
    console.log(box.nodeType); // 1 = Element (HTML Tag), 3 = Text, 9 = Document

    // Reading & Changing Content
    box.textContent = "Hello!"; // SAFE: Changes text only. Ignores HTML tags.
    box.innerHTML = "<b>Hi</b>"; // POWERFUL: Renders actual HTML inside the element.
    
    // Hidden Property
    box.hidden = true;  // Instantly makes the element disappear from the screen
    box.hidden = false; // Brings it back
}


/* --------------------------------------------------------------------------
   8. ATTRIBUTES AND PROPERTIES
   --------------------------------------------------------------------------
   Attributes are written in HTML (like id="my-id"). 
   Properties are read in JavaScript (like obj.id).
*/
const inputField = document.querySelector('input');
const link = document.querySelector('a');

if (inputField && link) {
    // PROPERTIES (Standard standard HTML things)
    inputField.value = "User typed this"; // Reads/Writes what is in the input box
    inputField.checked = true;            // Checks a checkbox
    link.href = "https://x.com";          // Changes a link destination

    // ATTRIBUTES (Using get/set for custom or non-standard things)
    box.setAttribute('role', 'button'); // Adds an attribute: role="button"
    box.getAttribute('role');           // Reads it (Returns "button")
    box.removeAttribute('role');        // Deletes the attribute completely

    // DATA ATTRIBUTES (HTML: <div data-user="John">)
    // Always use the .dataset property for "data-*" attributes
    box.dataset.user = "Jane"; // Changes data-user to "Jane"
    console.log(box.dataset.user); // Outputs: Jane
}


/* --------------------------------------------------------------------------
   9. MODIFYING THE DOCUMENT
   --------------------------------------------------------------------------
   How to build new HTML elements from scratch and put them on the screen.
*/
// 1. Create a brand new element in memory
const newTitle = document.createElement('h2'); 
newTitle.textContent = "I am a new heading!";

if (box) {
    // 2. Put it on the page relative to our 'box'
    box.append(newTitle);  // Puts it INSIDE the box, at the very BOTTOM
    box.prepend(newTitle); // Puts it INSIDE the box, at the very TOP
    box.before(newTitle);  // Puts it OUTSIDE the box, right ABOVE it
    box.after(newTitle);   // Puts it OUTSIDE the box, right BELOW it

    // 3. Deleting an element
    // newTitle.remove(); // Un-comment to instantly delete the new heading
}


/* --------------------------------------------------------------------------
   10. STYLES AND CLASSES
   --------------------------------------------------------------------------
   Changing how things look. (Classes are highly preferred over inline styles).
*/
if (box) {
    // --- CLASSES (Best Practice) ---
    box.classList.add('highlight');      // Adds a class
    box.classList.remove('hidden');      // Removes a class
    box.classList.toggle('dark-mode');   // Adds if missing, removes if present!
    box.classList.contains('highlight'); // true/false check

    // --- INLINE STYLES (Use for dynamic math/colors) ---
    // CSS properties with hyphens become camelCase in JS
    box.style.backgroundColor = "blue"; // background-color -> backgroundColor
    box.style.marginTop = "20px";       // margin-top -> marginTop
    
    // Removing an inline style
    box.style.backgroundColor = ""; 
}


/* --------------------------------------------------------------------------
   11. ELEMENT SIZE AND SCROLLING
   --------------------------------------------------------------------------
   Getting the width/height of a specific HTML element.
*/
if (box) {
    // Outer Size (Content + Padding + Borders + Scrollbar)
    console.log(box.offsetWidth); 
    console.log(box.offsetHeight);

    // Inner Size (Content + Padding ONLY. No borders/scrollbars)
    console.log(box.clientWidth);
    console.log(box.clientHeight);

    // Scrollable Size (The FULL size of the content, even if hidden by scroll)
    console.log(box.scrollWidth);
    console.log(box.scrollHeight);

    // Reading & Changing Scroll Position INSIDE an element
    console.log(box.scrollTop);  // Pixels scrolled DOWN
    box.scrollTop = 50;          // Forces the element to scroll down 50px
}


/* --------------------------------------------------------------------------
   12. WINDOW SIZES AND SCROLLING
   --------------------------------------------------------------------------
   Getting the width/height and scroll position of the entire browser tab.
*/
// Visible Browser Size
console.log(window.innerWidth);  // Width of the screen
console.log(window.innerHeight); // Height of the screen

// Window Scroll Position
console.log(window.scrollY); // How far the user scrolled down the whole page
console.log(window.scrollX); // How far the user scrolled right

// Forcing the Window to scroll
window.scrollTo(0, 500); // Instantly jumps exactly 500px down from the very top
window.scrollBy(0, 50);  // Scrolls down 50px from wherever the user is NOW

// Modern Smooth Scrolling
window.scrollTo({
    top: 0,
    behavior: "smooth" // Smoothly scrolls back to the very top of the page!
});


/* --------------------------------------------------------------------------
   13. COORDINATES
   --------------------------------------------------------------------------
   Finding exactly where an element is positioned on the user's screen.
*/
if (box) {
    // getBoundingClientRect() is the most important geometry method!
    // It gives you X/Y coordinates RELATIVE TO THE VISIBLE WINDOW.
    const rect = box.getBoundingClientRect();
    
    console.log(rect.top);    // Distance from top of screen to top of element
    console.log(rect.bottom); // Distance from top of screen to bottom of element
    console.log(rect.left);   // Distance from left of screen to left of element
    console.log(rect.right);  // Distance from left of screen to right of element
    
    // Remember: rect.top changes as the user scrolls down (because the element moves up!)
    
    // Absolute Document Position (Always stays the same regardless of scroll)
    const absoluteY = rect.top + window.scrollY;
    
    // Find what element exists at a specific coordinate (X, Y)
    // Helpful for drag-and-drop features!
    const centerElement = document.elementFromPoint(
        window.innerWidth / 2, 
        window.innerHeight / 2
    ); 
    // centerElement is whatever HTML tag is dead center of the screen right now.
}

/* --------------------------------------------------------------------------
   14. EVENTS (Making things interactive)
   --------------------------------------------------------------------------
   Events are how you make your JavaScript react when a user does something 
   (like clicking, typing, scrolling, or submitting a form).
*/

document.body.innerHTML = '<button id="myButton">Click Me</button>';
document.getElementById("myButton").addEventListener("click", function() {
  location.href = "https://google.com";
});

// --------------------------------------------------------------------------

const myButton = document.querySelector('button');

if (myButton) {
    // Basic Click Event
    myButton.addEventListener('click', function(event) {
        console.log("Button was clicked!");
        
        // event.target is super useful! It tells you EXACTLY which 
        // HTML element triggered the event.
        console.log(event.target); 
    });
}

// --------------------------------------------------------------------------

// 1. Create a form with named inputs
document.body.innerHTML = `
  <form id="signupForm" style="padding: 20px;">
    <input type="text" name="firstName" placeholder="First Name" required />
    <input type="email" name="userEmail" placeholder="Email Address" required />
    <button type="submit">Send Data</button>
  </form>
  <div id="result"></div>
`;

// 2. Target the form
const myForm = document.querySelector('form');

myForm.addEventListener('submit', function(event) {
    // Stop the page reload
    event.preventDefault(); 
    
    // 3. Scoop up the data using FormData
    const data = new FormData(myForm);
    
    // 4. Read specific fields using their 'name' attribute
    const nameValue = data.get('firstName');
    const emailValue = data.get('userEmail');
    
    // Log it to the console
    console.log("Captured Name:", nameValue);
    console.log("Captured Email:", emailValue);
    
    // 5. Update the webpage instantly to show the user it worked
    document.getElementById('result').innerHTML = 
        `<h3 style="color: green;">Success! Saved ${nameValue}'s email (${emailValue}).</h3>`;
});

/* --------------------------------------------------------------------------
   15. HTML TABLES (Built-in Shortcuts)
   --------------------------------------------------------------------------
   Using querySelector on tables can get really messy. Luckily, the DOM 
   gives you special built-in properties just for tables!
*/
const myTable = document.querySelector('table'); 

if (myTable) {
    // Rows (<tr>)
    console.log(myTable.rows);       // Gets a list of ALL rows in the table
    console.log(myTable.rows[0]);    // Gets the very 1st row

    // Columns/Cells (<td> or <th>)
    console.log(myTable.rows[0].cells);    // Gets ALL cells inside the 1st row
    console.log(myTable.rows[0].cells[1]); // Gets the cell in Row 1, Column 2
    
    // Example: Highlight a specific cell
    myTable.rows[0].cells[1].style.backgroundColor = "yellow";
}


/* --------------------------------------------------------------------------
   16. INDEXING (Selecting by Number)
   --------------------------------------------------------------------------
   Whenever a DOM method returns a list (like querySelectorAll or children), 
   you can pick out a specific item using brackets [].
   Remember: JavaScript always starts counting from 0!
*/
const allLinksList = document.querySelectorAll('a');

if (allLinksList.length > 0) {
    console.log(allLinksList[0]); // Gets the 1st link on the page
    console.log(allLinksList[1]); // Gets the 2nd link on the page
    
    // How to get the VERY LAST item in a list without knowing how long it is:
    const lastLink = allLinksList[allLinksList.length - 1];
    console.log(lastLink); 
}