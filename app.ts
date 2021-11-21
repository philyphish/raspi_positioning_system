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
const triggersRoute = require('./routes/trigger');

app.use(publicPath);

app.listen(port, () => {
  console.log(`Server Listening on port ${port}`);
});

app.get(`/set`, (req, res) => {
  console.log(`GET SET`);
});
app.use('/triggers', triggersRoute);
