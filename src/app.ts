import express from "express";
import { stat } from "fs";
import path from "path";
import GPIO from "rpi-gpio";
import { Timer, Time, TimerOptions } from "timer-node";

const app = express();
const port = 4200;
const publicPath = express.static(path.join(__dirname, "../client/build"), {
  redirect: false,
});
const gpio = GPIO;
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
gpio.setup(PIN_TRIGGER, gpio.DIR_OUT);
gpio.setup(PIN_ECHO, gpio.DIR_IN, gpio.EDGE_BOTH);
writeToTrigger(false);

setTimeout(() => {
  writeToTrigger(true);
  setTimeout(()=> {
    writeToTrigger(false);
  }, 1);
}, 2000); // 2 seconds to allow PIN to settle

listenToEcho();

function writeToTrigger(status: boolean) {
  gpio.write(PIN_TRIGGER, status, (err: any) => {
    if (err) throw err;
    console.log(`Trigger is set to ${status}`);
  });
}

function listenToEcho() {
  gpio.on("change", (PIN_ECHO, value) => {
    console.log(`Echo is set to ${value}`);
  });
}

///////// GPIO PINS FOR HC-SR04 /////////////////
// VCC Connects to Pin 2 (5v)
// Trig Connects to Pin 7 (GPIO 4)
// Echo Connects to R1 (1k Ω)
// R2 (1k Ω) Connects from R1 to Ground
// Wire from R1 and R2 connects to Pin 11
// GND connects to Pin 6 (Ground)
