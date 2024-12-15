const responseHelper = require('../../../helpers/responseHelper');
const ApiHelper = require('../../../helpers/apiHelper');

module.exports = async (req, res, next) => {
    try {
        const cookies = req.headers.cookie;
        const userServiceApi = new ApiHelper(
            process.env.MS_USER_SERVICE_URL,
            10000,
            {
                Cookie: cookies,
            }
        );
        const { _id, refreshToken } = req.payload;
        // Call api to update tokens for user
        const response = await userServiceApi.putRequest(`/${_id}`, {
            refreshToken,
        });
        return next();
    } catch(error) {
        return res.status(500).json(responseHelper.error(
            500,
            "Error updating tokens",
            error.message,
        ));
    }
}