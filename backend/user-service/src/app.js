const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');

dotenv.config();

// Custom functions
const connectDB = require('./config/database');
const responseHelper = require('./helpers/responseHelper');

// Load environmental variables
const HOST = process.env.HOST;
const PORT = process.env.PORT;
// Missing configurations
if(!HOST || !PORT){
    console.error('Missing configurations');
    process.exit(1);
}

// Initialize the service
const app = express();

// Middlewares
const limiter = rateLimit({
    windowMs: 1000 * 60 * 15,   // 15m
    max: 100,                   // Limit maximum 100 requests in 15 minutes
    message: (req, res) => {
        res.status(429).json(responseHelper.error(
            429,
            "Rate limit exceeded. Please wait a few minutes before making another request."
        ));
    }
})
app.use(cors({
    // Allowed domains
    origin: '*', // []
    // Allowed methods
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    // Allowed headers
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
    credentials: true,
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(helmet());
app.use(limiter);

// Routes
app.get('/health_check', (req, res) => {
    res.status(200).json(responseHelper.success(
        200,
        "Server is UP",
    ));
});

app.use('/api/v1/users/profile/addresses', require('./routes/addressRoutes'));
app.use('/api/v1/users/profile', require('./routes/profileRoutes'));
app.use('/api/v1/users', require('./routes/userRoutes'));

// 404 error
app.use((req, res) => {
    res.status(404).json(responseHelper.error(
        404,
        "Route not found",
    ));
});

// Start server
const server = app.listen(PORT, HOST, async () => {
    console.clear();
    await connectDB();
    console.log(`The user service started on http://${HOST}:${PORT}`);
});

// Notify the server shutdown
process.on('SIGTERM', () => {
    console.info('SIGTERM signal received.');
    server.close(() => {
        console.log('Server closed');
        process.exit(1);
    });
})