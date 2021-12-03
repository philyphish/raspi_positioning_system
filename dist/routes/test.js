"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const socket = require('../utils/socket');
let number;
router
    .get('/', () => {
    console.log('TEST ROUTE!');
    setInterval(() => {
        socket.webSocketModule(`this is a test message ${count(1)}`);
    }, 1000);
    function count(num) {
        number = number + num;
        return number;
    }
});
module.exports = router;
//# sourceMappingURL=test.js.map