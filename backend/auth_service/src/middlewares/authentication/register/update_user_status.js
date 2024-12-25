const response_helper = require('../../../helpers/response_helper');
const { internal_jwt_helper } = require('../../../helpers/jwt_helper');
const ApiHelper = require('../../../helpers/api_helper');

const MS_USER_SERVICE_URL = process.env.MS_USER_SERVICE_URL;
if(!MS_USER_SERVICE_URL) {
    console.error('Missing configuration for communicating with user service');
    process.exit(1);
}

module.exports = async (req, res, next) => {
    const user_service_api = new ApiHelper(MS_USER_SERVICE_URL);
    const { user_id, refresh_token } = req.payload;
    // Internal token help to communicate with service without authentication
    const internal_token = internal_jwt_helper.sign({
            purpose: 'internal-communication',
        });
    try {
        // Connect to user service and update user data
        await user_service_api.put_request(
            `/${user_id}`,
            { refresh_token },
            {
                headers: {
                    'Authorization': `Bearer ${internal_token}`,
                }
            }
        );

        // TODO Verify email by generate token and send email
        // ...
        return next();
    } catch(error) {
        // If it is an error from axios (returned by user service)
        if(error.response){
            // Gets error response from user service (if any)
            const error_response = error.response.data;
            return res.status(error.status).json(
                response_helper.error(
                    error.status,
                    error_response.message || 'Error from user service',
                    error_response.errors,
                )
            );
        }

        // If this is timeout error
        if(error.code === 'ECONNABORTED') {
            return res.status(504).json(
                response_helper.error(
                    504,
                    "Request timeout when connecting to user service",
                    error.message,
                )
            );
        }

        // If this can not connect to the user service
        if(error.code === 'ECONNREFUSED') {
            return res.status(503).json(
                response_helper.error(
                    503,
                    "User service is unavailable",
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