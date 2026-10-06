// XMLHttpRequest

const xhr = new XMLHttpRequest();
// Pointing to a real public API that returns fake data
xhr.open('GET', 'https://jsonplaceholder.typicode.com/users/1');

xhr.onload = function() {
  if (xhr.status === 200) {
    const data = JSON.parse(xhr.responseText);
    console.log("✅ XHR Success! User Name:", data.name);
  }
};

xhr.send();


// Resumable File Upload

async function uploadFileInChunks(file) {
  const chunkSize = 5 * 1024 * 1024; // 5MB chunks
  const totalChunks = Math.ceil(file.size / chunkSize);

  for (let i = 0; i < totalChunks; i++) {
    // 1. Calculate the start and end byte for the current chunk
    const start = i * chunkSize;
    const end = Math.min(start + chunkSize, file.size);
    
    // 2. Slice the file (File objects are Blobs, which have a slice method)
    const chunk = file.slice(start, end);
    
    // 3. Create form data to hold the chunk and metadata
    const formData = new FormData();
    formData.append('file', chunk);
    formData.append('chunkIndex', i);
    formData.append('fileName', file.name);

    // 4. Upload the chunk. (In a real app, wrap this in a try/catch to retry on failure)
    await fetch('/api/upload-chunk', {
      method: 'POST',
      body: formData
    });
    
    console.log(`Uploaded chunk ${i + 1} of ${totalChunks}`);
  }
  console.log("Upload complete!");
}


// Long Polling

async function startLongPolling() {
  try {
    // 1. Send request and wait. The server will DELAY its response 
    // until it actually has a new message to give us.
    const response = await fetch('/api/messages/poll');
    
    if (response.ok) {
      const data = await response.json();
      console.log("New message received:", data.message);
    }
  } catch (error) {
    console.error("Polling error, waiting before reconnecting", error);
    // Add a slight delay on error to prevent spamming the server if it's down
    await new Promise(resolve => setTimeout(resolve, 3000));
  } finally {
    // 2. As soon as the request completes (success or fail), instantly poll again
    startLongPolling();
  }
}

// Start the cycle
startLongPolling();


// WebSocket

// Connect to a real public echo server
const socket = new WebSocket('wss://ws.postman-echo.com/raw');

socket.onopen = function() {
  console.log("✅ WebSocket Connected!");
  // Send a message to the server
  socket.send("Hello Server, this is a live WebSocket test!");
};

socket.onmessage = function(event) {
  // The server echoes our message back
  console.log("📩 Server replied:", event.data);
  
  // Close it so it doesn't run forever
  socket.close(); 
};


// Server-Sent Events (SSE)

console.log("Connecting to Wikipedia live stream...");
// Connect to a real live SSE stream
const eventSource = new EventSource('https://stream.wikimedia.org/v2/stream/recentchange');

let count = 0;
eventSource.onmessage = function(event) {
  const data = JSON.parse(event.data);
  console.log(`✅ Live Edit on Wikipedia: ${data.title} (by ${data.user})`);
  
  count++;
  // Disconnect after 3 edits so it doesn't flood your console
  if (count >= 3) {
    console.log("Closing stream.");
    eventSource.close();
  }
};

