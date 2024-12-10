const Busboy = require('busboy');
const axios = require('axios');
const responseService = require('../services/responseService');

// Request processing middleware
const handleRequest = async (req, res, next) => {
    // Check if content-type is multipart/form-data
    if (req.headers['content-type']?.includes('multipart/form-data')) {
        // If it is multipart/form-data then process the uploaded file
        return handleFileUpload(req, res, next);
    }
    // If not multipart/form-data then next() always
    return next();
};

const handleFileUpload = async (req, res, next) => {
    const mediaServiceApi = process.env.MEDIA_SERVICE_API;
    try {
        const busboy = Busboy({ headers: req.headers });

        // Store form data
        const formData = {};
        let hasFile = false;
        let avatarBuffer = null;
        let avatarMimeType = null;

        // Process common information fields
        busboy.on('field', (fieldName, value) => {
            formData[fieldName] = value;
        });

        // Process avatar file
        busboy.on('file', (fieldName, file, { filename, mimeType }) => {
            if (fieldName === 'avatar') {
                hasFile = true;
                avatarMimeType = mimeType;
                const chunks = [];

                file.on('data', (chunk) => {
                    chunks.push(chunk);
                });

                file.on('end', () => {
                    avatarBuffer = Buffer.concat(chunks);
                });
            } else {
                file.resume();
            }
        });

        // Process when enough data has been received
        busboy.on('finish', async () => {
            try {
                // If there is an avatar, send it to the media service for processing.
                if (avatarBuffer) {
                    const imageFormData = new FormData();
                    const arrayBuffer = avatarBuffer.buffer;
                    const blob = new Blob([new Uint8Array(arrayBuffer)], { type: avatarMimeType });

                    imageFormData.append('avatar', blob, 'avatar.jpg');
                    // Send request to media service
                    const imageResponse = await axios.post(`${mediaServiceApi}/users`, imageFormData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            'Cookie': req.headers.cookie,
                        },
                        withCredentials: true,
                    });

                    // Get the URL of the processed image
                    formData.profile_picture = imageResponse.data.data.url;
                }

                // Save formData to req.body so that the next middleware can use it
                req.body = formData;

                // Or you can save it to res.locals if you want.
                res.locals.formData = formData;

                next();
            } catch (error) {
                next(error);
            }
        });

        // Busboy error handling
        busboy.on('error', (error) => {
            next(error);
        });

        // Pipe request into busboy
        req.pipe(busboy);
    } catch(error) {
        return res.status(500).json(responseService.error(
            "Error handling avatar file",
            500,
            error.message,
        ));
    }
}

// Middleware to process file uploads
module.exports = handleRequest;