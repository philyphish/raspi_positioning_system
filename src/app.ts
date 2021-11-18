import express from "express";
import path from "path";
import GPIO from "rpi-gpio";
import { Timer, Time, TimerOptions } from "timer-node";

const app = express();
const port = 4200;
const publicPath = express.static(path.join(__dirname, "../client/build"), {
  redirect: false,
});
const gpio = GPIO.promise;
const PIN_TRIGGER = 7;
const PIN_ECHO = 11;
const timer = new Timer({ label: "echo-timer" });

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
  .then(() => {
    console.log(`Set ${PIN_TRIGGER} to false`);
    gpio.write(PIN_TRIGGER, false);
  })
  .then(() => {
    setTimeout(() => {
      console.log(`Set ${PIN_TRIGGER} to true`);
      gpio.write(PIN_TRIGGER, true).then(() => {
        console.log(`Set ${PIN_TRIGGER} to false`);
        gpio.write(PIN_TRIGGER, false).then(() => {
          ECHO.then(() => {
            console.log(`FIRST READING ECHO PIN: `, gpio.read(PIN_ECHO));
          });
        })
        .then(() => {
          ECHO.then(() => {
            console.log(`SECOND READING ECHO PIN: `, gpio.read(PIN_ECHO));
          });
        });
      });
    }, 1000);
  });

///////// GPIO PINS FOR HC-SR04 /////////////////
// VCC Connects to Pin 2 (5v)
// Trig Connects to Pin 7 (GPIO 4)
// Echo Connects to R1 (1k Ω)
// R2 (1k Ω) Connects from R1 to Ground
// Wire from R1 and R2 connects to Pin 11
// GND connects to Pin 6 (Ground)
