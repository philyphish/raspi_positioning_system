"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = __importDefault(require("ws"));
module.exports = {
    startWebSocketServer: (msg) => {
        const wss = new ws_1.default.Server({ port: 3300 });
        const clients = wss.clients;
        wss.on("connection", (ws) => {
            ws.send(msg);
        });
        wss.on('message', (ws) => {
            console.log(`Message Recieved`);
            ws.send('Message recieved');
        });
    },
};
//# sourceMappingURL=socket.js.map