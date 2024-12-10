const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/database');

// Load environmental variables
const port = process.env.SERVER_PORT;

// Initialize service
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({
    // origin: [], The list of domains are allowed to access
    withCredentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Cookie'],
}));
app.use(cookieParser());

// Health check
app.get('/health_check', (req, res) => {
    res.status(200).send('Server is UP');
});

// Routers
app.use('/api/users', require('./routes/userRoutes'));

// Start service
app.listen(port, async () => {
    console.clear();
    await connectDB();
    console.log(`The user service is running on port ${port}`);
});
