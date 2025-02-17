require('dotenv').config()
const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User  = require("./models/user");
const {adminAuth, userAuth}= require("./middlewares/auth")

app.use(express.json());
app.post("/signup", async (req , res)=>{
    //   console.log(req.body)

    const user = new User(req.body);

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