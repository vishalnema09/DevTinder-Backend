const express = require('express');

const app = express();

app.get("/",(req, res) =>{
    res.send("hello this is dashboard")
})
app.get("/hello",(req , res) =>{
    res.send("hello world!");
})
app.get("/test",(req , res) =>{
    res.send("hello this is test")
})
app.listen(7777,()=>{
    console.log('Server is running on port 7777');
})