const mongoose = require('mongoose');

// Get mongoDB URL from environmental variables
const mongoURI = process.env.MONGO_URI;

// Connect to database
const connectDB = async () => {
    await mongoose.connect(mongoURI);
    console.log('Connected to database');
}

module.exports = connectDB;