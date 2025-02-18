require("dotenv").config();
const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
// const { adminAuth, userAuth } = require("./middlewares/auth");
const { validateSignUpData } = require("./utils/validation");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { userAuth} = require("./middlewares/auth");

app.use(express.json());
app.use(cookieParser());
// signup data
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
      password: hashedPassword,
    });
    await user.save();
    res.send("User registered successfully");
  } catch (err) {
    res.status(500).send("Server Error " + err.message);
  }
});
// login
app.post("/login", async (req, res) => {
  try {
    const { emailID, password } = req.body;

    const user = await User.findOne({ emailID: emailID });
    if (!user) {
      throw new Error("invalid credentials");
    }

    const isPasswordValid = await user.validatePassword(password);

    if (isPasswordValid) {
      const token = await user.getJWT();

      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000),
      });
      res.send("login success");
    } else {
      throw new Error("invalid credentials");
    }
  } catch (err) {
    res.status(500).send("Server Error " + err.message);
  }
});

app.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;

    res.send(user);
  } catch (err) {
    res.status(403).send("Unauthorized access");
  }
});

app.post("/sendConnectionRequest", userAuth, async (req, res) => {
  const user = req.user;

  console.log("sending a request");

  res.send(user.firstName + "sent the request");
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
