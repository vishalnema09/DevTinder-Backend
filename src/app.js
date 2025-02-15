const express = require("express");

const app = express();

// app.use("/route", rH , [rH2 , rH3] , rH4 , rH5);


app.use(
  "/user",
  (req, res, next) => {
    console.log("handling the first route user");
    next();
  },
  (req, res, next) => {
    console.log("handling the second route user");
    // res.send("2nd response");
    next();
  },
  (req, res, next) => {
    console.log("handling the 3 route user");
    // res.send("3rd response");
    next();
  },
  (req, res, next) => {
    console.log("handling the 4 route user");
    // res.send("4th response");
    next();
  },
  (req, res, next) => {
    console.log("handling the 5 route user");
    // res.send("5th response");
    next();
  },
);
//user/707/vishal/xyz

app.listen(7777, () => {
  console.log("Server is running on port 7777");
});
