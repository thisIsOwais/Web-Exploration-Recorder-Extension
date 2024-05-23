let sessionId="";

//taking session id stored in chrome storage
chrome.storage.local.get('sessionId', function(result) {
    console.log(result)
    sessionId = result.sessionId;
    if (sessionId) {
        // Render session ID in HTML
        const sessionIdElement = document.getElementById('session-id');
        sessionIdElement.textContent = sessionId;
    } else {
        sessionId=""
        console.log('Session ID not found in storage.');
    }
  })


  // Handle start session button click
document.getElementById('start-session-btn').addEventListener('click', function() {
    
    // Send message to background script to request sessionId
    chrome.runtime.sendMessage({ action: 'startSession' });
    

    //wait for sessionId which is coming from backend
    setTimeout(()=>{chrome.storage.local.get('sessionId', function(result) {
        console.log(result)
        sessionId = result.sessionId;
        if (sessionId) {
            // Render session ID in HTML
            const sessionIdElement = document.getElementById('session-id');
            sessionIdElement.textContent = sessionId;
        } else {
            sessionId=""
            console.log('Session ID not found in storage.');
        }
      })},2000);  
    
   
    document.getElementById('session-id').textContent =sessionId;

});

// Handle stop session button click
document.getElementById('stop-session-btn').addEventListener('click', function() {
    // Send message to background script to stop session
    chrome.runtime.sendMessage({ action: 'stopSession' });
    
    document.getElementById('session-id').textContent ="No active Session";

});
