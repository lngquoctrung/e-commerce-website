const ApiHelper = require('../../helpers/api_helper');
const response_helper = require('../../helpers/response_helper');

// Url of authentication service
const MS_AUTH_SERVICE_URL = process.env.MS_AUTH_SERVICE_URL;
// ! Missing configuration
if(!MS_AUTH_SERVICE_URL) {
    console.error('Missing configuration for axios');
    process.exit(1);
}

module.exports = async (req, res, next) => {
    const auth_api_helper = new ApiHelper(MS_AUTH_SERVICE_URL);
    try {
        // Communicates with auth service to check authentication
        const response = await auth_api_helper.get_request(
            '/check-auth',
            {
                headers: {
                    // Internal token
                    'Authorization': req.headers.authorization || '',
                    'Cookie': req.headers.cookie || '',
                }
            }
        );
        req.payload = response.data;
        return next();
    } catch(error) {
        // If it is an error from axios (returned by authentication service)
        if(error.response){
            // Gets error response from authentication service (if any)
            const error_response = error.response.data;
            return res.status(error.status).json(
                response_helper.error(
                    error.status,
                    error_response.message || 'Error from authentication service',
                    error_response.errors,
                )
            );
        }

        // If this is timeout error
        if(error.code === 'ECONNABORTED') {
            return res.status(504).json(
                response_helper.error(
                    504,
                    "Request timeout when connecting to authentication service",
                    error.message,
                )
            );
        }

        // If this can not connect to the authentication service
        if(error.code === 'ECONNREFUSED') {
            return res.status(503).json(
                response_helper.error(
                    503,
                    "Authentication service is unavailable",
                    error.message,
                )
            );
        }

        // Unknown error
        return res.status(500).json(
            response_helper.error(
                500,
                "Internal server error when communicating with authentication service",
                error.message,
            )
        );
    }
}