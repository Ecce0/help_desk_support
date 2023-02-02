const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO)
    console.log(`MongoDB Connected: ${connect.connection.host}`.cyan.underline)
  } catch (err) {
    console.log(`Error: ${err.message}`.red.underline.bold)
    process.exit(1)
  }
}

module.exports = connectDB