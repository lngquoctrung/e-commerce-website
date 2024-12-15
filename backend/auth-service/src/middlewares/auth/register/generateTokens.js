const responseHelper = require('../../../helpers/responseHelper');
const { accessTokenHelper, refreshTokenHelper } = require('../../../helpers/tokenHelper');
const cookieConfig = require("../../../config/cookieConfig");

module.exports = (req, res, next) => {
    try {
        // Generate tokens from user's data
        const accessToken = accessTokenHelper.sign({
            userId: req.payload._id,
            role: req.payload.role,
        });
        const refreshToken = refreshTokenHelper.sign({
            userId: req.payload._id,
            role: req.payload.role,
        });
        // Send tokens to client
        res.cookie('accessToken', accessToken, cookieConfig.accessToken);
        res.cookie('refreshToken', refreshToken, cookieConfig.refreshToken);

        req.headers.cookie = `accessToken=${accessToken}; refreshToken=${refreshToken}`;
        req.payload.refreshToken = refreshToken;
        return next();
    } catch(error) {
        return res.status(500).json(responseHelper.error(
            500,
            "Error generating tokens",
            error.message,
        ));
    }
}