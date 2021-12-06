import express from "express";
import path from "path";

import { StartWebSocketServer } from "./utils/socket";
// import WebSocket from "ws";
const WebSocketServer = new StartWebSocketServer();
//const WSClient = new WebSocket('ws://localhost:3300');
const app = express();
const port = 4200;
const publicPath = express.static(path.join(__dirname, "../client/build"), {
  redirect: false,
});
const HRCS04 = require('./utils/hcsr04');

app.use(publicPath);

app.listen(port, () => {
  console.log(`Server Listening on port ${port}`);
  WebSocketServer.connectWS();
  /* WSClient.onopen = ()=> {
    console.log(`Opening...`);
    setInterval(()=>{
      WSClient.send(`message from app.js: ${Math.random()}`);
    },2000);
    
   };*/

  HRCS04.startHcsr0();
});
