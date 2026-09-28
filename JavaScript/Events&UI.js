// <input value="Click me" onclick="alert('Click!')" type="button">

// -----------------------------------------------------------------

function countRabbits() {
    for(let i=1; i<=3; i++) {
        alert("Rabbit number " + i);
    }
}
// <input type="button" onclick="countRabbits()" value="Count rabbits!">

// -----------------------------------------------------------------

elem.onclick = function() {
    alert('Thank you');  
};
  
// -----------------------------------------------------------------

function sayThanks() {
  alert('Thanks!');
}
elem.onclick = sayThanks;

// -----------------------------------------------------------------

// 1. Store the function in a variable (creating a single reference)
const handleClick = () => alert('Thanks!');

elem.addEventListener( "click" , handleClick);
elem.removeEventListener( "click" , handleClick);

// -----------------------------------------------------------------

// Event Type

elem.onclick = function(event) {
    // show event type, element and coordinates of the click
    alert(event.type + " at " + event.currentTarget);
    alert("Coordinates: " + event.clientX + ":" + event.clientY);  
};

// -----------------------------------------------------------------

// Object handlers: handleEvent
  
let obj = {
    handleEvent(event) {
        alert(event.type + " at " + event.currentTarget);
    }
}; 
elem.addEventListener('click', obj);

// -----------------------------------------------------------------

onclick="this.hidden=true" // hide button on click // inline html

bt.onclick = () => {      // DOM
    bt.hidden = true;
};
 
// -----------------------------------------------------------------

// Bubbling
// click on <p>, then we’ll see 3 alerts: p → div → form

/*
<form onclick="alert('form')">FORM  
  <div onclick="alert('div')">DIV
    <p onclick="alert('p')">P</p>
  </div>
</form>
*/

// -----------------------------------------------------------------


// Stopping bubbling

/*
<body onclick="alert(`the bubbling doesn't reach here`)">
  <button onclick="event.stopPropagation()">Click me</button>
</body>
*/

// -----------------------------------------------------------------

// Capturing
 
for(let elem of document.querySelectorAll('*')) {
    elem.addEventListener("click", e => alert(`Capturing: ${elem.tagName}`), true);
    elem.addEventListener("click", e => alert(`Bubbling: ${elem.tagName}`));
}

// -----------------------------------------------------------------

// Preventing browser actions

// <a href="/" onclick="return false">Click here</a>
// or
// <a href="/" onclick="event.preventDefault()">here</a>
// or
// <a href="/" id="my-link">Click here</a>
const link = document.getElementById("my-link");

link.addEventListener("click", function(event) {
  // 1. You MUST use preventDefault() here
  event.preventDefault(); 
  
  console.log("Navigation prevented!");
  
  // 2. Doing this does absolutely NOTHING inside addEventListener
  // return false; 
});

// -----------------------------------------------------------------

menu.onclick = function(event) {
  if (event.target.nodeName != 'A') return;

  let href = event.target.getAttribute('href');
  alert( href ); // ...can be loading from the server, UI generation etc

  return false; // prevent browser action (don't go to the URL)
};

// -----------------------------------------------------------------

const menu = document.getElementById('menu');

menu.addEventListener("click", function(event) {
  // 1. Ignore clicks that aren't on links
  if (event.target.nodeName != 'A') return;

  // 2. Get the link data and do something with it
  let href = event.target.getAttribute('href');
  alert( href ); 

  // 3. Prevent the browser from navigating (since return false won't work here)
  event.preventDefault(); 
});

// -----------------------------------------------------------------

// event.defaultPrevented

/*
<button>Right-click shows browser context menu</button>

<button oncontextmenu="alert('Draw our menu'); return false">
  Right-click shows our context menu
</button>
*/

// -----------------------------------------------------------------

/*
<p>Right-click here for the document context menu</p>
<button id="elem">Right-click here for the button context menu</button>
*/

elem.oncontextmenu = function(event) {
    event.preventDefault();
    alert("Button context menu");  
};

document.oncontextmenu = function(event) {    // Wont prevent bubbling
    event.preventDefault();
    alert("Document context menu");
};

// -----------------------------------------------------------------

// Dispatching custom events
// dispatchEvent

// <button id="elem" onclick="alert('Click!');">Autoclick</button>

let event0 = new Event("click"); // Event constructor
elem.dispatchEvent(event0);      // Dispatching (triggering) the event

// Creating a basic event:
let event1 = new Event("my-event", { bubbles: true, cancelable: true });

// Creating a custom event with data (CustomEvent):
let customEvent = new CustomEvent("my-event", { detail: { id: 123 } });

element.dispatchEvent(customEvent);

// -----------------------------------------------------------------

let event = new MouseEvent("click", {
  bubbles: true,
  cancelable: true,
  clientX: 100,              // ignored by Event
  clientY: 100
});

alert(event.clientX); // 100

// This program creates a custom user-login event that passes a username and bubbles up to the document.

/*
<div id="login-box">
  <button id="login-btn">Log In</button>
</div>
*/

const button = document.getElementById('login-btn');
// 1. Listen for the custom event anywhere in the DOM (because we will set bubbles: true)
document.addEventListener('user-login', (event) => {
  alert(`Welcome, ${event.detail.username}!`);
});

// 2. Trigger the custom event when the button is clicked
button.addEventListener('click', () => {
  // Create the event with custom data
  let loginEvent = new CustomEvent('user-login', {
    bubbles: true,
    detail: { username: 'JohnDoe' }
  });
  // Dispatch it from the button
  button.dispatchEvent(loginEvent); 
});

// -----------------------------------------------------------------

// event.preventDefault()
/*
<pre id="rabbit">
  |\   /|
   \|_|/
   /. .\
  =\_Y_/=
   {>o<}
</pre>
<button onclick="hide()">Hide()</button>
*/
  
function hide() {
    
  let event = new CustomEvent("hide", {
    cancelable: true // without that flag preventDefault doesn't work
  });
  if (!rabbit.dispatchEvent(event)) {
    alert('The action was prevented by a handler');
  } else {
    rabbit.hidden = true;
  }
}
rabbit.addEventListener('hide', function(event) {
  if (confirm("Call preventDefault?")) {
    event.preventDefault();
  }
});

// -----------------------------------------------------------------

// Mouse events

// Modifiers: shift, alt, ctrl and meta
// <button id="button">Alt+Shift+Click on me!</button>

button.onclick = function(event) {
  if (event.altKey && event.shiftKey) {
    alert('Hooray!');
  }
};

// -----------------------------------------------------------------

// Coordinates: clientX/Y, pageX/Y

// <input onmousemove="this.value=event.clientX+':'+event.clientY" value="Mouse over me"></input>

// -----------------------------------------------------------------

// Preventing selection on mousedown

// <span ondblclick="alert('dblclick')"> Double-click me </span> 
// <b ondblclick="alert('Click!')" onmousedown="return false"> Double-click me </b>

// Preventing copying
/*
<div oncopy="alert('Copying forbidden!');return false">
  Dear user,
  The copying is forbidden for you.
  If you know JS or HTML, then you can get everything from the page source though.
</div>
*/