import express from "express";
import { Router } from "express";

const app = express();
const router = Router();

router.get("/", () => {
  console.log('triggers.route');

});

module.exports = router;
