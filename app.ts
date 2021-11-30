import express from "express";
import path from "path";

const app = express();
const port = 4200;
const publicPath = express.static(path.join(__dirname, "../client/build"), {
  redirect: false,
});

const triggersRoute = require('./routes/trigger');

app.use(publicPath);

app.listen(port, () => {
  console.log(`Server Listening on port ${port}`);
});

// app.get(`/set`, (req, res) => {
//   console.log(`GET SET`);
// });
app.use('/triggers', triggersRoute);
