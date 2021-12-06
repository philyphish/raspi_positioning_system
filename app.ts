import express from "express";
import path from "path";

import { StartWebSocketServer } from "./utils/socket";
const WebSocketServer = new StartWebSocketServer();

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
  HRCS04.startHcsr0();
});
