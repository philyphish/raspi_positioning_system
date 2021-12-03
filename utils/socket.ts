import WebSocket from "ws";
import { v4 as uuidv4 } from "uuid";

module.exports = {
  startWebSocketServer: (msg: string) => {
    const wss = new WebSocket.Server({ port: 3300 });
    const clients = wss.clients;

    wss.on("connection", (ws) => {
      ws.send(msg);
    });

    wss.on('message', (ws)=> {
      console.log(`Message Recieved`);
      ws.send('Message recieved')
    })
  },
};
