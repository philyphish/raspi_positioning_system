import express from "express";
import path from "path";

const app = express();
const port = 4200;
const publicPath = express.static(path.join(__dirname, "../client/build"), {
  redirect: false,
});
const Gpio = require("pigpio").Gpio;
const triggersRoute = require("./routes/trigger");

app.get("/test", (req, res) => {
  res.send("this is the root");

  // The number of microseconds it takes sound to travel 1cm at 20 degrees celcius
  const MICROSECDONDS_PER_CM = 1e6 / 34321;

  const trigger = new Gpio(7, { mode: Gpio.OUTPUT });
  const echo = new Gpio(11, { mode: Gpio.INPUT, alert: true });

  trigger.digitalWrite(0); // Make sure trigger is low

  const watchHCSR04 = () => {
    let startTick: any;

    echo.on("alert", (level: any, tick: any) => {
      if (level == 1) {
        startTick = tick;
      } else {
        const endTick = tick;
        const diff = (endTick >> 0) - (startTick >> 0); // Unsigned 32 bit arithmetic
        console.log(`tick is type of: ${typeof tick}`);
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

app.use(publicPath);

app.listen(port, () => {
  console.log(`Server Listening on port ${port}`);
});

///////// GPIO PINS FOR HC-SR04 /////////////////
// VCC Connects to Pin 2 (5v)
// Trig Connects to Pin 7 (GPIO 4)
// Echo Connects to R1 (1k Ω)
// R2 (1k Ω) Connects from R1 to Ground
// Wire from R1 and R2 connects to Pin 11
// GND connects to Pin 6 (Ground)
