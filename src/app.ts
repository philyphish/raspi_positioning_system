import express from "express";
import path from "path";
import GPIO from "rpi-gpio";

const app = express();
const port = 4200;
const publicPath = express.static(path.join(__dirname, "../client/build"), {
  redirect: false,
});
const gpio = GPIO.promise;
const PIN_TRIGGER = 7;
const PIN_ECHO = 11;

app.use(publicPath);

app.listen(port, () => {
  console.log(`Server Listening on port ${port}`);
});

gpio
  .setup(PIN_TRIGGER, gpio.DIR_OUT)
  .then(() => {
    console.log(PIN_ECHO);
  })
  .catch((err) => {
    console.log(`ERROR: ${PIN_TRIGGER} ${err}`);
  });
///////// GPIO PINS FOR HC-SR04 /////////////////
// VCC Connects to Pin 2 (5v)
// Trig Connects to Pin 7 (GPIO 4)
// Echo Connects to R1 (1k Ω)
// R2 (2k Ω) Connects from R1 to Ground
// Wire from R1 and R2 connects to Pin 11
// GND connects to Pin 6 (Ground)
