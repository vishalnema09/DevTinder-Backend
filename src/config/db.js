const mongoose = require('mongoose')

const connectDb = async () => {
    await mongoose.connect(process.env.PORT)
    console.log('MongoDB connected')
}

module.exports = connectDb;