const express = require('express');
const cors = require('cors');
const rate_limit = require('express-rate-limit');
const cookie_parser = require('cookie-parser');
const body_parser = require('body-parser');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();
const response_helper = require('./helpers/response_helper');
const connect_database = require('./config/database');
const start_user_cleanup_cron = require('./config/user_cleanup_cron');


// * The environmental variables for server configure
const HOST = process.env.HOST;
const PORT = process.env.PORT;
// ! Missing configurations
if(!HOST || !PORT) {
    console.error('Missing configurations for the server');
    process.exit(1);
}


// * Initialize the server and set middlewares
const app = express();
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS', 'HEAD'],
    allowHeaders: ['Content-Type', 'Authorization', 'Cookie'],
    credentials: true,
}));
app.use(rate_limit({
    windowMs: 1000 * 60 * 15,   // 15m
    max: 100,                   // Maximum 100 requests sent in 15 minutes
    message: (req, res) => {
        return res.status(429).json(response_helper.error(
            429,
            "Too many request, please try again after 15 minutes"
        ));
    },
    skip: (req) => {
        return req?.path === '/health-check';
    }
}));
app.use(cookie_parser());
app.use(body_parser.urlencoded({ extended: true }));
app.use(body_parser.json());
app.use(helmet());
app.use(morgan('combined'));


// * Routes
// GET /health-check        # Check status of the server
app.get('/health-check', (req, res) => {
    return res.status(200).json(
        response_helper.success(
            200,
            "Server is UP",
        )
    );
});
// Main routes
app.use('/api/v1/users', require('./routes/user_routes'));
// Invalid routes
app.use((req, res) => {
    return res.status(404).json(
        response_helper.error(
            404,
            "Invalid endpoint",
        )
    );
});


// * Start the server
const server = app.listen(PORT, HOST, async () => {
    console.clear();
    await connect_database();
    start_user_cleanup_cron();
    console.log(`The user server started on http://${HOST}:${PORT}`);
});


// * Notify when the server closed
process.on('SIGTERM', () => {
    console.log('The SIGTERM signal received');
    server.close(() => {
        console.log('The user server closed');
        process.exit(1);
    });
});