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

// The code below will be moved into
// it's own file in the route dir

// set PIN_ECHO
gpio
  .setup(PIN_ECHO, gpio.DIR_IN)
  .then(() => {
    gpio.read(PIN_TRIGGER);
    console.log(`PIN ${PIN_ECHO} IS SET`);
  })
  .catch((err) => {
    console.log(`ERROR: ${PIN_ECHO} ${err}`);
  });

// set PIN_TRIGGER
gpio
  .setup(PIN_TRIGGER, gpio.DIR_OUT)
  .then(() => {
    gpio.write(PIN_TRIGGER, true);
    console.log(`PIN ${PIN_TRIGGER} IS SET`);
  })
  .catch((err) => {
    console.log(`ERROR: ${PIN_TRIGGER} ${err}`);
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
