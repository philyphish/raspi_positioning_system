"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_2 = require("express");
const app = (0, express_1.default)();
const router = (0, express_2.Router)();
const Gpio = require("pigpio").Gpio;
router.get("/messure", () => {
    // The number of microseconds it takes sound to travel 1cm at 20 degrees celcius
    const MICROSECDONDS_PER_CM = 1e6 / 34321;
    const trigger = new Gpio(4, { mode: Gpio.OUTPUT });
    const echo = new Gpio(17, { mode: Gpio.INPUT, alert: true });
    trigger.digitalWrite(0); // Make sure trigger is low
    const watchHCSR04 = () => {
        let startTick;
        echo.on("alert", (level, tick) => {
            if (level == 1) {
                startTick = tick;
            }
            else {
                const endTick = tick;
                const diff = (endTick >> 0) - (startTick >> 0); // Unsigned 32 bit arithmetic
                console.log(diff / 2 / MICROSECDONDS_PER_CM);
            }
        });
    };
    watchHCSR04();
    // Trigger a distance measurement once per second
    setInterval(() => {
        trigger.trigger(10, 1); // Set trigger high for 10 microseconds
    }, 1000);
});
module.exports = router;
///////// GPIO PINS FOR HC-SR04 /////////////////
// VCC Connects to Pin 2 (5v)
// Trig Connects to Pin 7 (GPIO 4)
// Echo Connects to R1 (1k Ω)
// R2 (1k Ω) Connects from R1 to Ground
// Wire from R1 and R2 connects to Pin 11
// GND connects to Pin 6 (Ground)
//# sourceMappingURL=hcsr04.js.map