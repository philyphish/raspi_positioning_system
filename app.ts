import express from "express";
import path from "path";

const app = express();
const port = 4200;
const publicPath = express.static(path.join(__dirname, "../client/build"), {
  redirect: false,
});
const HRCS04 = require('./utils/hcsr04');

app.use(publicPath);

app.listen(port, () => {
  console.log(`Server Listening on port ${port}`);
  HRCS04.startHcsr0();
});
