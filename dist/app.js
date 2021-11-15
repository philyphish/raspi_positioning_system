"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const rpi_gpio_1 = __importDefault(require("rpi-gpio"));
const app = (0, express_1.default)();
const port = 4200;
const publicPath = express_1.default.static(path_1.default.join(__dirname, "../client/build"), {
    redirect: false,
});
const gpio = rpi_gpio_1.default.promise;
const PIN_TRIGGER = 7;
const PIN_ECHO = 11;
app.use(publicPath);
app.listen(port, () => {
    console.log(`Server Listening on port ${port}`);
});
const setTrigger = gpio
    .setup(PIN_TRIGGER, gpio.DIR_OUT)
    .then(() => {
    setTimeout((PIN_TRIGGER) => {
        gpio.write(PIN_TRIGGER, true);
    }, 2000);
    console.log(`PIN ${PIN_TRIGGER} IS SET`);
})
    .catch((err) => {
    console.log(`ERROR: ${PIN_TRIGGER} ${err}`);
});
app.get(`/set`, (req, res) => {
    console.log(`GET SET`);
    setTrigger;
});
///////// GPIO PINS FOR HC-SR04 /////////////////
// VCC Connects to Pin 2 (5v)
// Trig Connects to Pin 7 (GPIO 4)
// Echo Connects to R1 (1k Ω)
// R2 (2k Ω) Connects from R1 to Ground
// Wire from R1 and R2 connects to Pin 11
// GND connects to Pin 6 (Ground)
//# sourceMappingURL=app.js.map