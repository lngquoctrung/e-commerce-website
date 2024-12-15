const responseHelper = require('../helpers/responseHelper');
const ApiHelper = require('../helpers/apiHelper');

module.exports = async (req, res, next) => {
    try {
        const authServiceApi = new ApiHelper(
            process.env.MS_AUTH_SERVICE_URL,
            10000,
            {
                Cookie: req.headers.cookie,
            }
        );
        const response = await authServiceApi.getRequest('/check_auth');
        req.payload = response.data;
        return next();
    } catch(error) {
        return res.status(500).json(responseHelper.error(
            500,
            "Error authenticating credentials",
            error.message,
        ));
    }
}