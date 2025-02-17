require('dotenv').config()
const express = require("express");
const connectDB = require(".config/database");
const app = express();
const User  = require("./models/user");
const {adminAuth, userAuth}= require("./middlewares/auth")


app.post("/signup", async (req , res)=>{
    const user = new User({
        firstName: "harsh",
        lastName: "pathak",
        email: "harsh@gmail.com",
        password: "123456"
    });

    try{
        await user.save();
        res.send("User registered successfully");
    } catch(err){
        res.status(500).send("Server Error"+ err.message);
    }
});

connectDB()
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(7777, () => {
        console.log("Server is running on port 7777");
      });
  })
  .catch((err) => {
    console.log("Failed to connect to MongoDB");
  });