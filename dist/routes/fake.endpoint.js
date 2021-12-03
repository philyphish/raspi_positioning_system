"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get("/", (req, res, next) => {
    function testEndpoint() {
        setInterval(() => {
            let data = Math.random() * 1000;
            console.log(data);
            return data;
        }, 1000);
    }
    next();
});
module.exports = router;
//# sourceMappingURL=fake.endpoint.js.map