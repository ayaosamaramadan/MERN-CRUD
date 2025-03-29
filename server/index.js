require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");



const app = express();

// Middleware
app.use(cors());

// port
const PORT = process.env.PORT || 5000;

// MongoDB connection
const uri = process.env.MONGODB_URI ;

mongoose.set("strictQuery", true);

mongoose.connect(uri).then(() => {console.log("Connected to MongoDB");})
  .catch((err) => {
    console.error("Error connecting to MongoDB", err);
  });


// root route
app.get("/", (req, res) => {
  res.send("ososa");
});

// start the server
app.listen(PORT, () => {
  console.log(` port ${PORT} is running`);
});
