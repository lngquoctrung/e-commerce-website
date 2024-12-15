const responseHelper = require('../../../helpers/responseHelper');
const { accessTokenHelper } = require('../../../helpers/tokenHelper');
const {TokenExpiredError, JsonWebTokenError} = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try {
        const accessToken = req.cookies.accessToken;
        if(!accessToken) {
            return res.status(401).json(responseHelper.error(
                401,
                "Missing access token",
            ));
        }
        req.payload = accessTokenHelper.verify(accessToken);
        return next();
    } catch(error) {
        if(error instanceof TokenExpiredError)
            return res.status(401).json(responseHelper.error(
                401,
                "Token has expired",
                error.message,
            ));
        if(error instanceof JsonWebTokenError)
            return res.status(401).json(responseHelper.error(
                401,
                "Error validating token",
                error.message,
            ));
        return res.status(500).json(responseHelper.error(
            500,
            "Error validating credentials",
            error.message,
        ));
    }
}