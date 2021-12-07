import WebSocket, { WebSocketServer } from "ws";
import { v4 as uuidv4 } from "uuid";
import { send } from "process";

// create an object and
// break these into thier functions
export interface StartWebSocketServer {
  [msg: string]: any;
  wss: WebSocketServer;
}

export class StartWebSocketServer {
  constructor() {
    console.log("StartWebSocketServer initalized");
    // this.msg = msg;
    this.wss = new WebSocket.Server({ port: 3300 });
  }

  connectWS() {
    this.wss.on('connection', (ws: WebSocket) => {
      ws.send('Welcome to WS server');
      ws.on('message', (msg: string) => {
        console.log(`Message Recieved ${msg}`);
        this.wss.clients.forEach(client => {
          client.send(msg);
        });
      });
    });
  }
}
