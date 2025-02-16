const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://vishalnema23:yEdRKAlMfbNayPXS@cluster01.sy27j.mongodb.net/devTinder"
  );
};

module.exports = connectDB;
