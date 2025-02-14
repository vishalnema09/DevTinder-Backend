const express = require('express');

const app = express();


// (get) this will only handle to GET call /user
app.get("/user/:userId/:name/:password",(req, res) => {
    console.log(req.params);
    res.send({firstname: "Vishal", lastname: "Nema "})
})
//user/707/vishal/xyz

app.listen(7777,()=>{
    console.log('Server is running on port 7777');
})