const mongoose = require('mongoose');

const MONGODB_HOST = process.env.MONGODB_HOST;
const MONGODB_PORT = process.env.MONGODB_PORT;
const MONGODB_NAME = process.env.MONGODB_NAME;

if(!MONGODB_HOST || !MONGODB_PORT || !MONGODB_PORT){
    console.error('Missing configurations');
    process(1);
}

const MONGODB_URI = `mongodb://${MONGODB_HOST}:${MONGODB_PORT}/${MONGODB_NAME}`;

module.exports = async () => {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to database');
}