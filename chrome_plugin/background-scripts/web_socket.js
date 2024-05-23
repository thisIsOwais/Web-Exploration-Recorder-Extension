let webSocket = null;
let sessionId = null;

// Store empty session ID in Chrome storage
chrome.storage.local.set({ 'sessionId': "" }, function() {
  console.log("no session started yet");
});

// Function to handle incoming session ID from WebSocket
function handleSessionId(sessionId) {
  // Store session ID in Chrome storage
  chrome.storage.local.set({ 'sessionId': sessionId }, function() {
      console.log('Session ID stored in Chrome storage:', sessionId);
  });
}



function connectToWebSocket() {
  webSocket = new WebSocket('ws://localhost:3008');

  webSocket.onopen = () => {
    console.log('WebSocket connected');
    changeIcon("../icons/server_up.png");

    //handling message sent by backend
    webSocket.onmessage = (message) => {
      console.log(`message received`, message.data);
      console.log(message.data)
      sessionId=JSON.parse(message.data).sessionId;
      // sessionId=message.data.sessionId
      
      if(sessionId!=undefined)
      handleSessionId(sessionId);
     
      console.log(sessionId)
    }
  };

  webSocket.onerror = (err) => {
    console.error('WebSocket error:', err);
    changeIcon("../icons/server_down.png");
  };
}

// Initial connection attempt
connectToWebSocket();

// Reconnect every 5 seconds if not connected
setInterval(() => {
  if (webSocket === null || webSocket.readyState !== WebSocket.OPEN) {
    connectToWebSocket();
  }
}, 5000);

// Create a new port
const port = chrome.runtime.connect();
console.log('new port created...',port)

port.onDisconnect.addListener(() => {
  // Handle disconnection, such as reinitializing or reconnecting
  console.log('Port disconnected, reconnecting...');
  
});

// Message listener from content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  
  console.log("message...........",message)

  if (webSocket && webSocket.readyState === WebSocket.OPEN && message.type === 'rrweb events' && sessionId) {
    message.sessionId = sessionId
    console.log( {payload: message.toString()} )
    console.log(message)
    webSocket.send(JSON.stringify(message));
  } 
  else if(message.action==='startSession')
  {
    webSocket.send(JSON.stringify(message));
  
  }

  else if(message.action==='stopSession')
  {
    webSocket.send(JSON.stringify(message));
    sendResponse({response: "hey there!"});
  }
  else{
    console.log('No active session found, data ignored');
  }
  return true;
});


function changeIcon(imageIcon) {
  chrome.action.setIcon({ path: imageIcon });
}
