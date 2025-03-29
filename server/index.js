require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");



const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// port
const PORT = process.env.PORT || 5000;

// MongoDB connection
const uri = process.env.MONGODB_URI ;

// MongoDB connect
mongoose.set("strictQuery", true);

mongoose.connect(uri).then(() => {console.log("Connected to MongoDB");})
  .catch((err) => {
    console.error("Error connecting to MongoDB", err);
  });



// schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone:Number ,
},{
  timestamps: true,
});

const userModel = mongoose.model("usero", userSchema);

// read data
app.get("/", async(req, res) => {
  const data = await userModel.find({});
  res.json({success:true, data:data});
  // res.send(data); 
});

// create data
app.post("/create", async(req, res) => {
const data = new userModel(req.body);
  await data.save();
  res.send({success:true, data:"data created"});
  console.log(req.body);
});

// start the server
app.listen(PORT, () => {
  console.log(` port ${PORT} is running`);
});
