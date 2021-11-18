"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const rpi_gpio_1 = __importDefault(require("rpi-gpio"));
const timer_node_1 = require("timer-node");
const app = (0, express_1.default)();
const port = 4200;
const publicPath = express_1.default.static(path_1.default.join(__dirname, "../client/build"), {
    redirect: false,
});
const gpio = rpi_gpio_1.default.promise;
const PIN_TRIGGER = 7;
const PIN_ECHO = 11;
const timer = new timer_node_1.Timer({ label: "echo-timer" });
app.use(publicPath);
app.listen(port, () => {
    console.log(`Server Listening on port ${port}`);
});
app.get(`/set`, (req, res) => {
    console.log(`GET SET`);
});
// set PINs
const ECHO = gpio.setup(PIN_ECHO, gpio.DIR_IN);
gpio
    .setup(PIN_TRIGGER, gpio.DIR_OUT)
    .then(() => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Set ${PIN_TRIGGER} to false`);
    yield gpio.write(PIN_TRIGGER, false);
}))
    .then(() => __awaiter(void 0, void 0, void 0, function* () {
    yield setTimeout(() => {
        gpio.write(PIN_TRIGGER, true);
        console.log(`Set ${PIN_TRIGGER} to true`);
        gpio.write(PIN_TRIGGER, false);
        console.log(`Set ${PIN_TRIGGER} to false`);
    }, 2000);
}))
    .then(() => {
    ECHO.then(() => {
        if (gpio.read(PIN_ECHO)) {
            console.log(`Echo is true`);
        }
        else {
            console.log(`Echo is false`);
        }
        ;
    });
});
///////// GPIO PINS FOR HC-SR04 /////////////////
// VCC Connects to Pin 2 (5v)
// Trig Connects to Pin 7 (GPIO 4)
// Echo Connects to R1 (1k Ω)
// R2 (1k Ω) Connects from R1 to Ground
// Wire from R1 and R2 connects to Pin 11
// GND connects to Pin 6 (Ground)
//# sourceMappingURL=app.js.map