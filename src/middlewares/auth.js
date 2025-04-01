const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).send("please login");
    }

    const decodedOjb = await jwt.verify(token, process.env.JWT_SECRET);
    const { _id } = decodedOjb;

    const user = await User.findById(_id);

    if (!user) {
      throw new Error("user not find");
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(404).send("Error: " + error.message);
  }
};
module.exports = {
  userAuth,
};
