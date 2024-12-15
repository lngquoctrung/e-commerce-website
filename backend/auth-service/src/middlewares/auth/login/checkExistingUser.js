const responseHelper = require('../../../helpers/responseHelper');
const ApiHelper = require('../../../helpers/apiHelper');

const userServiceApi = new ApiHelper(process.env.MS_USER_SERVICE_URL);

module.exports = async (req, res, next) => {
    try {
        // Check user existed or not by email
        const { email } = req.body;
        // Call api to user service to check
        const response = await userServiceApi.getRequest('/search', { email });
        const { _id, role, password } = response.data;
        req.payload = { _id, role, password };
        return next();
    } catch(error) {
        // If user not found
        if(error.status === 404) {
            return res.status(404).json(responseHelper.error(
                404,
                "Account does not exist"
            ));
        }
        return res.status(500).json(responseHelper.error(
            500,
            "Error checking account",
            error.message,
        ));
    }
}