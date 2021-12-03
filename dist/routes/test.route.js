"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ws_1 = require("ws");
const router = (0, express_1.Router)();
const socket = require("../utils/socket");
router.get("/", (req, res, next) => {
    console.log("TEST ROUTE!");
    const webSocketClient = new ws_1.WebSocket("ws://localhost:3300");
    webSocketClient.onopen = (event) => {
        console.log("WS Opened");
        webSocketClient.send("message from node client");
        next();
    };
});
module.exports = router;
//# sourceMappingURL=test.route.js.map