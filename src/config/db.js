const mongoose = require('mongoose')

const connectDb = async () => {
    await mongoose.connect(process.env.PORT)
}

module.exports = connectDb;