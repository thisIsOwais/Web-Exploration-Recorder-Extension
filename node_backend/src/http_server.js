import express from 'express';
import fs from "fs";
import path from 'path';
import { dataFolderName } from './constants.js'

const __dirname = path.resolve();


const startHttpServer = () => {
  const app = express();
  app.use(express.static('public'));

  app.get('/rrweb-events', (req, res) => {
    res.sendFile((__dirname + '/public/rrweb_events.html'));
  });
  app.get('/api/rrweb-events', (req, res) => {
    res.sendFile((__dirname + '/public/index.html'));
  });

  let counter=1;
  // Nested routing (api/rrweb_events) is a bit tricky, leaving for the take home assignment
  app.get('/api-rrweb-events', async (req, res) => {
    const {sessionId,id}=req.query;

    const events = fetchRrwebEvents(sessionId, id);
    return res.json(events); 

  });
 

  const port = 3000;
  app.listen(port, () => console.log(`Server listening on port ${port}`));
}

const fetchRrwebEvents = (sessionId,id) => {
  
  const dataFilePath = path.join(dataFolderName,sessionId, id.toString())
  console.log(dataFilePath)
  const rrwebEvents = fs.readFileSync(dataFilePath, 'utf-8');

  let x=rrwebEvents.split("\n").filter(line => line.length > 0).map(ff => JSON.parse(ff));
  return x;
 
}


export {
  startHttpServer
}
