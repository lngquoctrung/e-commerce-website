const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');

dotenv.config();

// Custom functions
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
    max: 100,                   // Limit 100 requests
    message: (req, res) => {
        res.status(429).json(responseHelper.error(
            429,
            "Rate limit exceeded. Please wait a few minutes before making another request."
        ));
    }
})
app.use(cors({
    origin: '*', // [] 
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
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
app.use('/api/v1/auth', require('./routes/authRoutes'));
app.use((req, res) => {
    res.status(404).json(responseHelper.error(
        404,
        "Route not found",
    ));
});

// Start the service
const server = app.listen(PORT, HOST, () => {
    console.clear();
    console.log(`The authentication service started on http://${HOST}:${PORT}`);
});

// Notify the service shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM signal received');
    server.on('close', () => {
        console.log('The authentication service closed');
        process.exit(1);
    });  
});