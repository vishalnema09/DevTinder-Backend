require("dotenv").config();
const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
const { adminAuth, userAuth } = require("./middlewares/auth");
const { validateSignUpData } = require("./utils/validation");
const bcrypt = require("bcrypt");

app.use(express.json());
app.post("/signup", async (req, res) => {
  //   console.log(req.body)

  try {
    //validate the signup data
    validateSignUpData(req);

    const { firstName, lastName, emailID, password } = req.body;

    //encryption the signup data
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // creating a new instance
    const user = new User({
      firstName,
      lastName,
      emailID,
      password : hashedPassword,
    });
    await user.save();
    res.send("User registered successfully");
  } catch (err) {
    res.status(500).send("Server Error " + err.message);
  }
});

//get user by email
app.get("/user", async (req, res) => {
  const userEmail = req.body.emailID;

  try {
    const users = await User.find({ emailID: userEmail });
    if (users.length === 0) {
      res.status(404).send("User not found");
    } else {
      res.send(users);
    }
  } catch (err) {
    // console.log(err)
    res.status(404).send("something went wrong");
  }
});

//get all users
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    // console.log(err)
    res.status(404).send("something went wrong");
  }
});

//user user
app.delete("/user", async (req, res) => {
  const userID = req.body.userID;
  try {
    const user = await User.findByIdAndDelete(userID);
    res.send("user deleted successfully");
  } catch (err) {
    // console.log(err)
    res.status(404).send("something went wrong");
  }
});

//update user
app.patch("/user", async (req, res) => {
  const userID = req.body.userID;
  const data = req.body;
  try {
    //to knwo user detail before and after update
    const user = await User.findByIdAndUpdate({ _id: userID }, data, {
      returnDocument: "before",
    });
    console.log(user);
    res.send("user updated successfully");
  } catch (err) {
    res.status(404).send("something went wrong");
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
