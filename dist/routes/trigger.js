"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const rpi_gpio_1 = __importDefault(require("rpi-gpio"));
const timer_node_1 = require("timer-node");
const express_2 = require("express");
const app = (0, express_1.default)();
const router = (0, express_2.Router)();
const gpio = rpi_gpio_1.default.promise;
const TRIGGER = 7;
const ECHO = 11;
const timer = new timer_node_1.Timer({ label: "echo-timer" });
let startTime;
let stopTime;
router.get("/", () => {
    console.log(`GET WORKS!`);
    gpio
        .setup(TRIGGER, gpio.DIR_OUT)
        .then(() => {
        gpio.write(TRIGGER, false);
        console.log(`pin ${TRIGGER} is set to false`);
    })
        .then(() => {
        setTimeout(() => {
            gpio.write(TRIGGER, true);
            console.log(`pin ${TRIGGER} is set to true`);
        }, 1000);
    })
        .then(() => {
        setTimeout(() => {
            gpio.write(TRIGGER, false);
            console.log(`pin ${TRIGGER} is set to false`);
        }, 1);
    })
        .catch((err) => console.error(err));
    gpio
        .setup(ECHO, gpio.DIR_IN)
        .then(() => {
        gpio.read(ECHO)
            .then(() => {
            console.log(`Timer is started`);
            startTime = timer.start();
        })
            .then(() => {
            console.log(`Timer stopped`);
            stopTime = timer.stop();
        });
    })
        .finally(() => {
        console.log(`Start Time: ${startTime}`);
        console.log(`Stop Time: ${stopTime}`);
        console.log(`Elapsed Time: ${timer.ms()}`);
    })
        .catch(err => console.log(err));
});
///////// GPIO PINS FOR HC-SR04 /////////////////
// VCC Connects to Pin 2 (5v)
// Trig Connects to Pin 7 (GPIO 4)
// Echo Connects to R1 (1k Ω)
// R2 (1k Ω) Connects from R1 to Ground
// Wire from R1 and R2 connects to Pin 11
// GND connects to Pin 6 (Ground)
module.exports = router;
//# sourceMappingURL=trigger.js.map