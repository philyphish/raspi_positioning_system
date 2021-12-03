"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const port = 4200;
const publicPath = express_1.default.static(path_1.default.join(__dirname, "../client/build"), {
    redirect: false,
});
const HRCS04 = require('./utils/hcsr04');
app.use(publicPath);
app.listen(port, () => {
    console.log(`Server Listening on port ${port}`);
    HRCS04.startHcsr0();
});
//# sourceMappingURL=app.js.map