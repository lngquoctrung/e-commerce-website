const mongoose = require('mongoose');

// * Environmental variables for MongoDB configuration
const DB_HOST = process.env.DB_HOST;
const DB_PORT = process.env.DB_PORT;
const DB_NAME = process.env.DB_NAME;

// ! Missing database configurations
if(!DB_HOST || !DB_PORT || !DB_NAME) {
    console.error('Missing configurations for database');
    process.exit(1);
}

const MONGODB_URL = `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`;

// * Connects to database
module.exports = async () => {
    await mongoose.connect(MONGODB_URL);
    console.log('Connected to database');
};