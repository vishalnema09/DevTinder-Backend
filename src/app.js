require('dotenv').config()
const express = require("express");
const connectDB = require("./config/db");


const app = express();
const User = require("./models/user");


app.post("/signup", async (req,res)=>{
    const user = new User({
        firstName:"ranveer",
        lastName:"singh",
        emailID:"ranveer@gmail.com",
        password:"1235556"
    });

    //error handling
    try{
        await user.save();
        res.send("User added successfully");
    } catch (err){
        res.status(500).send("error saving user" + err.message);
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