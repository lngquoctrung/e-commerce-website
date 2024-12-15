const responseHelper = require('../../../helpers/responseHelper');
const ApiHelper = require('../../../helpers/apiHelper');

const userServiceApi = new ApiHelper(process.env.MS_USER_SERVICE_URL);

module.exports = async (req, res, next) => {
    try {
        // Check user existed or not by email
        const { email } = req.body;
        // Call api to user service to check
        const response = await userServiceApi.getRequest('/search', { email });
        const user = response.data;
        if(user) {
            return res.status(400).json(responseHelper.error(
                400,
                "Account existed"
            ));
        }
    } catch(error) {
        // If user not found
        if(error.status === 404) {
            return next();
        }
        return res.status(500).json(responseHelper.error(
            500,
            "Error checking account",
            error.message,
        ));
    }
}