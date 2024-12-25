const response_helper = require('../../../helpers/response_helper');
const cookie_config = require('../../../config/cookie_config');
const { access_jwt_helper } = require('../../../helpers/jwt_helper');

module.exports = (req, res, next) => {
    const { userId, role } = req.payload;
    try {
        // Generate new access token based on payload refresh token
        const access_token = access_jwt_helper.sign({
            userId,
            role,
        });
        // Set new access token
        res.cookie('access_token', access_token, cookie_config.access_token);
        return next();
    } catch(error) {
        return res.status(500).json(
            response_helper.error(
                500,
                "An error occurred while generating access token",
                error.message,
            )
        );
    }
}