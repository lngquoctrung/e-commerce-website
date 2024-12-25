const response_helper = require('../../../helpers/response_helper');
const { access_jwt_helper } = require('../../../helpers/jwt_helper');
const { TokenExpiredError, JsonWebTokenError } = require("jsonwebtoken");

module.exports = (req, res, next) => {
    const access_token = req.cookies.access_token;
    if(!access_token) {
        // Internal token (use to communicate with other services without access token)
        const auth_header = req.headers.authorization;
        if(auth_header && auth_header.startsWith('Bearer')) {
            req.auth_header = auth_header;
            // Next to middleware to check internal token
            return next();
        }
        // Access token will be default case to use authentication
        return res.status(401).json(
            response_helper.error(
                401,
                "Access token is required"
            )
        );
    }
    // Validate access token
    try {
        req.payload = access_jwt_helper.verify(access_token);
        return next();
    } catch(error) {
        // ! Error from validating token
        if(error instanceof TokenExpiredError) {
            return res.status(401).json(
                response_helper.error(
                    401,
                    "Access token expires",
                    error.message,
                )
            );
        }
        if(error instanceof JsonWebTokenError) {
            return res.status(403).json(
                response_helper.error(
                    403,
                    "Access token is invalid",
                    error.message,
                )
            );
        }
        // ! Unknown error
        return res.status(500).json(
            response_helper.error(
                500,
                "An error occurred while validating the access token",
                error.message,
            )
        );
    }
};