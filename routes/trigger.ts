import express from "express";
import GPIO from "rpi-gpio";
import { Timer, Time, TimerOptions } from "timer-node";
import { Router } from "express";

const app = express();
const router = Router();

const gpio = GPIO.promise;
const TRIGGER = 7;
const ECHO = 11;
const timer = new Timer({ label: "echo-timer" });

let startTime: Timer;
let stopTime: Timer;

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
      while (gpio.read(ECHO)) {
        startTime = timer.start();
      }
    })
    .then(() => {
      while (gpio.read(ECHO)) {
        stopTime = timer.stop();
      }
    })
    .finally(() => {
      console.log(`Start Time: ${startTime}`);
      console.log(`Stop Time: ${stopTime}`);
      console.log(`Elapsed Time: ${timer.ms()}`);
    });
});

module.exports = router;
