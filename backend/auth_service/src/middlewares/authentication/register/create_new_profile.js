const response_helper = require('../../../helpers/response_helper');
const ApiHelper = require('../../../helpers/api_helper');

const MS_PROFILE_SERVICE_URL = process.env.MS_PROFILE_SERVICE_URL;
if(!MS_PROFILE_SERVICE_URL) {
    console.error('Missing configuration for communicating with profile service');
    process.exit(1);
}

module.exports = async (req, res, next) => {
    const profile_service_api = new ApiHelper(MS_PROFILE_SERVICE_URL);
    const { first_name, last_name, date_of_birth } = req.body;
    const { user_id, email } = req.payload;
    try {
        // Connect to profile service and create new profile for user
        const response = await profile_service_api.post_request(
            '/',
            { user_id, email, first_name, last_name, date_of_birth }
        );
        const { _id } = response.data;
        // Store necessary data to generate authentication tokens
        req.payload = {
            ...req.payload,
            profile_id: _id,
        };
        return next();
    } catch(error) {
        // If it is an error from axios (returned by profile service)
        if(error.response){
            // Gets error response from profile service (if any)
            const error_response = error.response.data;
            return res.status(error.status).json(
                response_helper.error(
                    error.status,
                    error_response.message || 'Error from profile service',
                    error_response.errors,
                )
            );
        }

        // If this is timeout error
        if(error.code === 'ECONNABORTED') {
            return res.status(504).json(
                response_helper.error(
                    504,
                    "Request timeout when connecting to profile service",
                    error.message,
                )
            );
        }

        // If this can not connect to the profile service
        if(error.code === 'ECONNREFUSED') {
            return res.status(503).json(
                response_helper.error(
                    503,
                    "Profile service is unavailable",
                    error.message,
                )
            );
        }

        // Unknown error
        return res.status(500).json(
            response_helper.error(
                500,
                "Internal server error when communicating with profile service",
                error.message,
            )
        );
    }
}