import express from "express";
import path from "path";

const app = express();
const port = 4200;
const publicPath = express.static(path.join(__dirname, "../client/build"), {
  redirect: false,
});
const HRCS04 = require("./routes/hcsr04");

app.use("/hrcs04", HRCS04);
app.use(publicPath);

app.listen(port, () => {
  console.log(`Server Listening on port ${port}`);
});
