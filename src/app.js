require('dotenv').config()
const express = require("express");
const connectDB = require("./config/db");

connectDB();

const app = express();

const {adminAuth, userAuth}= require("./middlewares/auth")

app.use("/", (err, req, res, next) => {
    if(err){
        res.status(401).send("Unauthorized access");
    }
});
app.get("/getUserData", (req,res)=>{
    // try{
        throw new Error("shfjhsdjkhfkjl");
        res.send("User data");
//     }
//     catch(err){
//         res.status(504).send("something wrong")
//     }
});

// wildcard error handling
app.use("/", (err, req, res, next) => {
    if(err){
        res.status(500).send("something went wrong");
    }
});
app.listen(7777, () => {
  console.log("Server is running on port 7777");
});
