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
});

// create data
app.post("/create", async(req, res) => {
const data = new userModel(req.body);
  await data.save();
  res.send({success:true, data:"Data created",data : data} );
});

// update data
app.put("/update", async (req, res) => {
  const data = await userModel.findByIdAndUpdate(req.body._id, req.body, { new: true });
  res.json({ success: true, message: "Data updated", data });
});

// delete data
app.delete("/delete/:id", async (req, res) => {
  const data = await userModel.findByIdAndDelete(req.params.id);
  res.json({ success: true, message: "Data deleted", data });
});

// start the server
app.listen(PORT, () => {
  console.log(` port ${PORT} is running`);
});
