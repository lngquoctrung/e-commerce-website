const { access_jwt_helper, refresh_jwt_helper } = require('../../../helpers/jwt_helper');
const response_helper = require('../../../helpers/response_helper');
const cookie_config = require('../../../config/cookie_config');

module.exports = (req, res, next) => {
    try {
        // Generates authentication tokens
        const access_token = access_jwt_helper.sign(req.payload);
        const refresh_token = refresh_jwt_helper.sign(req.payload);

        // Set authentication tokens to cookie
        res.cookie('access_token', access_token, cookie_config.access_token);
        res.cookie('refresh_token', refresh_token, cookie_config.refresh_token);

        req.payload = {
            ...req.payload,
            access_token: access_token,
            refresh_token: refresh_token
        };

        return next();
    } catch(error) {
        return res.status(500).json(
            response_helper.error(
                500,
                "Error register while generating authentication tokens",
                error.message,
            )
        );
    }
}