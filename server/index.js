const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(cors());

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("ososa");
});

app.listen(PORT, () => {
  console.log(` port ${PORT} is running`);
});
