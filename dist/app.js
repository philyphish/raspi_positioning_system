"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const socket_1 = require("./utils/socket");
const ws_1 = __importDefault(require("ws"));
const WebSocketServer = new socket_1.StartWebSocketServer();
const WSClient = new ws_1.default('ws://localhost:3300');
const app = (0, express_1.default)();
const port = 4200;
const publicPath = express_1.default.static(path_1.default.join(__dirname, "../client/build"), {
    redirect: false,
});
// const HRCS04 = require('./utils/hcsr04');
app.use(publicPath);
app.listen(port, () => {
    console.log(`Server Listening on port ${port}`);
    WebSocketServer.connectWS();
    WSClient.onopen = () => {
        console.log(`Opening...`);
        setInterval(() => {
            WSClient.send(`message from app.js: ${Math.random()}`);
        }, 2000);
    };
    // HRCS04.startHcsr0();
});
//# sourceMappingURL=app.js.map