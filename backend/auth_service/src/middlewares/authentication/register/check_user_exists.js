const response_helper = require('../../../helpers/response_helper');
const ApiHelper = require('../../../helpers/api_helper');

const MS_USER_SERVICE_URL = process.env.MS_USER_SERVICE_URL;
if(!MS_USER_SERVICE_URL) {
    console.error('Missing configuration for communicating with user service');
    process.exit(1);
}

module.exports = async (req, res, next) => {
    const user_service_api = new ApiHelper(MS_USER_SERVICE_URL);
    const { email } = req.body;
    try {
        // Check user exist or not by searching user by email
        const response = await user_service_api.get_request('/search', {
            params: { email },
        });
        const user = response.data;
        // User already exists
        if(user) {
            return res.status(400).json(
                response_helper.error(
                    400,
                    'Email already exists'
                )
            );
        }
    } catch(error) {
        // If user not found => Valid to create a new user
        if(error.status === 404 && error.response.data.status === 404) {
            return next();
        }

        // Another error from axios
        if(error.response) {
            // Get error response from user service
            const error_response = error.response.data;
            return res.status(error.status).json(
                response_helper.error(
                    error.status,
                    error_response.message,
                    error_response.errors,
                )
            );
        }

        // Timeout error
        if(error.code === 'ECONNABORTED') {
            return res.status(504).json(
                response_helper.error(
                    504,
                    'Request timeout when connect to user service',
                    error.message,
                )
            );
        }

        // Can not connect to user service
        if(error.code === 'ECONNREFUSED') {
            return res.status(503).json(
                response_helper.error(
                    503,
                    'User service is unavailable',
                    error.message,
                )
            );
        }

        // Unknown error
        return res.status(500).json(
            response_helper.error(
                500,
                "Internal server error when communicating with user service",
                error.message,
            )
        );
    }
}