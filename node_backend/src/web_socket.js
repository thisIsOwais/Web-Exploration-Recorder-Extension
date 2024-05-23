import { WebSocketServer } from 'ws';
import fs from 'fs-extra';
import { dataFolderName } from './constants.js'
import path from "path";
import { generateSessionId } from './generateSessionId.js';

//initializing sessionId
let sessionId="";

const startWebSocketServer = () => {
  
  
  const wss = new WebSocketServer({ port: 3008 });
  
  wss.on('connection', (ws) => {
    console.log('WebSocket connection established.');


    let counter =1;
    // Handle incoming messages on the basis of start and stop session
    ws.on('message', (message) => {

    
      const jsonMessage=JSON.parse(message);
    
      console.log("jsonMessage............",jsonMessage);

      if(jsonMessage.action==="rrweb events" || jsonMessage.type==="rrweb events"){
      
        console.log(counter,"...................");
        counter++;
        const payload = JSON.parse(message.toString());
        processPayload(payload);
      }
      else if(jsonMessage.action==="startSession"){
        console.log("startSession............");
        sessionId=generateSessionId();
        ws.send(JSON.stringify({ sessionId: sessionId }));
      }
      else{
        console.log("stopSession............");
        ws.send(JSON.stringify({ sessionId: "" }))
      }
    
    });
    
  });
};






// data processing and fs.write logic
//here i am using sessionId to create directory and inside this directory json file is created with id

let lastUrl = null;
let lastSessionId=null;
// let id = 0;
let id = "";

const sanitizeUrl = (url) => {
  // Replace special characters with underscores
  return url.replace(/[:/]/g, '_');
};

const shortenUrl = (url) => {
  // Get the hostname from the URL
  const { hostname } = new URL(url);
  // Split the hostname by periods and take the first part
  const parts = hostname.split('.');
  const shortName = parts[0];
  return shortName;
};

const processPayload = (payload) => {
  const { type, url, data, sessionId: userSessionId } = payload;
  console.log("*".repeat(80));
  console.log({ type, url, payload });
  console.log("*".repeat(80));
  id = url;
  console.log("id..........", id);
  if (type !== 'rrweb events') {
    return;
  }
  const jsonData = JSON.parse(data);

  // lastSessionId != userSessionId ? (lastSessionId = userSessionId, id = 0) : (id = id);
  lastSessionId != userSessionId ? (lastSessionId = userSessionId) : (id = id);
  let userSession;

  userSession = path.join(dataFolderName, userSessionId);

  // Ensure that the user session directory exists
  fs.ensureDirSync(userSession);

  // Shorten the URL to use as the file name
  const shortFileName = shortenUrl(url);

  // Sanitize the file name to replace special characters
  const sanitizedFileName = sanitizeUrl(shortFileName);

  const eventStoredFile = path.join(userSession, sanitizedFileName);

  console.log("userSession..in if.....", userSession);

  fs.writeJsonSync(eventStoredFile, jsonData, { flag: 'a' });
};





export {
  startWebSocketServer,
};
