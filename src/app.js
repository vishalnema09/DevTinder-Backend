const express = require('express');

const app = express();


// (get) this will only handle to GET call /user
app.get("/user",(req, res) => {
    res.send({firstname: "Vishal", lastname: "Nema "})
})
app.post("/user",(req, res) => {
    res.send("data successfully saved to the database")
})
app.delete("/user",(req, res) => {
    res.send("delete data successfully")
})

// (use) this will match all the http methods
app.use("/test",(req , res) =>{
    res.send("hello this is test")
})
app.listen(7777,()=>{
    console.log('Server is running on port 7777');
})