const express = require('express');

const authRouter = express.Router();
const { validateSignUpData } = require("../utils/validation");
const User = require("../models/user");
const bcrypt = require("bcrypt");



authRouter.post("/signup", async (req, res) => {
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

authRouter.post("/login", async (req, res) => {
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

module.exports = authRouter;