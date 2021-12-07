"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StartWebSocketServer = void 0;
const ws_1 = __importDefault(require("ws"));
class StartWebSocketServer {
    constructor() {
        console.log("StartWebSocketServer initalized");
        // this.msg = msg;
        this.wss = new ws_1.default.Server({ port: 3300 });
    }
    connectWS() {
        this.wss.on('connection', (ws) => {
            ws.send('Welcome to WS server');
            ws.on('message', (msg) => {
                console.log(`Message Recieved ${msg}`);
                this.wss.clients.forEach(client => {
                    client.send(msg);
                });
            });
        });
    }
}
exports.StartWebSocketServer = StartWebSocketServer;
//# sourceMappingURL=socket.js.map