const express = require("express");

const app = express();

const {adminAuth, userAuth}= require("./middlewares/auth")


// for multiple use routes
app.get("/admin", adminAuth);
// app.get("/user", userAuth);


//if the user is authenticated is not specified
app.get("/user/login",(req , res)=>{
    res.send("logged in successfully");
});

// for single use routes

app.get("/user",userAuth ,(req , res)=>{
    res.send("this is a user details");
});
app.get("/admin/getAllData",(req , res)=>{
    res.send("get all data")
});
app.get("/admin/deleteUser",(req , res)=>{
    res.send("user data deleted")
});
app.listen(7777, () => {
  console.log("Server is running on port 7777");
});
