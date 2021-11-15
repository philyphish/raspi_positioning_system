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

// The code below will be moved into
// it's own file in the route dir

// set PIN_TRIGGER
gpio
  .setup(PIN_TRIGGER, gpio.DIR_OUT)
  .then(() => {
    gpio.write(PIN_TRIGGER, false).then(() => {
      console.log(`PIN ${PIN_TRIGGER} SET false`);
    });

    gpio.write(PIN_TRIGGER, true).then(() => {
      console.log(`PIN ${PIN_TRIGGER} SET TO true`);
    });

    gpio.write(PIN_TRIGGER, false).then(() => {
      console.log(`PIN ${PIN_TRIGGER} SET TO false`);
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
      console.log(`response: ${res}`);
      // while (res === false) {
      //   // start timer
      //   timer.start();
      //   console.log(`Timer started: ${timer.isStarted()}`);
      // }
      // while (res === true) {
      //   // stop timer
      //   timer.stop();
      //   console.log(
      //     `Timer is stopped: ${timer.isStopped()} at ${timer.time()}`
      //   );
      // }
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
