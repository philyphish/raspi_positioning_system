"use strict";
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
// The code below will be moved into
// it's own file in the route dir
// set PIN_TRIGGER
gpio
    .setup(PIN_TRIGGER, gpio.DIR_OUT)
    .then(() => {
    console.log(`PIN ${PIN_TRIGGER} IS SET`);
    gpio.write(PIN_TRIGGER, true).then(() => {
        gpio.write(PIN_TRIGGER, false);
    });
})
    .catch((err) => {
    console.log(`ERROR: ${PIN_TRIGGER} ${err}`);
});
// set PIN_ECHO
gpio
    .setup(PIN_ECHO, gpio.DIR_IN)
    .then(() => {
    console.log(`PIN ${PIN_ECHO} IS SET`);
    gpio.read(PIN_ECHO).then((res) => {
        if (res === false) {
            // start timer
            timer.start;
            console.log(`Timer started: ${timer.isStarted}`);
        }
        else {
            // stop timer
            timer.stop();
            console.log(`Timer is stopped: ${timer.isStopped} at ${timer.time}`);
        }
    });
})
    .catch((err) => {
    console.log(`ERROR: ${PIN_ECHO} ${err}`);
});
app.get(`/set`, (req, res) => {
    console.log(`GET SET`);
});
///////// GPIO PINS FOR HC-SR04 /////////////////
// VCC Connects to Pin 2 (5v)
// Trig Connects to Pin 7 (GPIO 4)
// Echo Connects to R1 (1k Ω)
// R2 (2k Ω) Connects from R1 to Ground
// Wire from R1 and R2 connects to Pin 11
// GND connects to Pin 6 (Ground)
//# sourceMappingURL=app.js.map