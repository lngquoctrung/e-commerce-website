const response_helper = require('../../../helpers/response_helper');
const { internal_jwt_helper } = require('../../../helpers/jwt_helper');
const { TokenExpiredError, JsonWebTokenError } = require("jsonwebtoken");

const INTERNAL_TOKEN_PURPOSE = process.env.INTERNAL_TOKEN_PURPOSE;
// ! Missing configuration
if(!INTERNAL_TOKEN_PURPOSE) {
    console.error('Missing configuration for internal JSON web token');
    process.exit(1);
}

module.exports = (req, res, next) => {
    const internal_token = req.auth_header.split(' ')[1];
    try {
        // Decode internal token
        const decoded = internal_jwt_helper.verify(internal_token);
        if(decoded.purpose !== INTERNAL_TOKEN_PURPOSE) {
            return res.status(403).json(response_helper.error(
                403,
                "Invalid internal token purpose"
            ));
        }
        return next();
    } catch(error) {
        if (error instanceof TokenExpiredError) {
            return res.status(401).json(response_helper.error(
                401,
                "Internal token has expired",
                error.message,
            ));
        }

        if (error instanceof JsonWebTokenError) {
            return res.status(401).json(response_helper.error(
                401,
                "Invalid internal token",
                error.message,
            ));
        }

        // Unknown error
        return res.status(500).json(response_helper.error(
            500,
            "An error occurred while validating the internal token",
            error.message,
        ));
    }
}