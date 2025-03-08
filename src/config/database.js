const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(process.env.PORT);
};

module.exports = connectDB;

