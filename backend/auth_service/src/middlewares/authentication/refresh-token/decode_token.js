const response_helper = require('../../../helpers/response_helper');
const { refresh_jwt_helper } = require('../../../helpers/jwt_helper');
const { TokenExpiredError, JsonWebTokenError } = require("jsonwebtoken");

module.exports = (req, res, next) => {
    const refresh_token = req.cookies.refresh_token;
    if(!refresh_token) {
        return res.status(403).json(
            response_helper.error(
                403,
                "Refresh token is required"
            )
        );
    }
    try {
        req.payload = refresh_jwt_helper.verify(refresh_token);
        return next();
    } catch(error) {
        // ! Error from validating token
        if(error instanceof TokenExpiredError) {
            return res.status(403).json(
                response_helper.error(
                    403,
                    "Refresh token expires",
                    error.message,
                )
            );
        }
        if(error instanceof JsonWebTokenError) {
            return res.status(403).json(
                response_helper.error(
                    403,
                    "Refresh token is invalid",
                    error.message,
                )
            );
        }
        // ! Unknown error
        return res.status(500).json(
            response_helper.error(
                500,
                "An error occurred while validating the refresh token",
                error.message,
            )
        );
    }
}