const responseHelper = require('../../../helpers/responseHelper');
const ApiHelper = require('../../../helpers/apiHelper');
const bcryptHelper = require('../../../helpers/bcryptHelper');

const userServiceApi = new ApiHelper(process.env.MS_USER_SERVICE_URL);

module.exports = async (req, res, next) => {
    try {
        const { first_name, last_name, email, password } = req.body;
        // Hash password
        const hashedPassword = await bcryptHelper.hash(password);
        const response = await userServiceApi.postRequest('/', {
            first_name,
            last_name,
            email,
            password: hashedPassword,
        });
        const { _id, role } = response.data;
        req.payload = { _id, role };
        return next();
    } catch(error) {
        return res.status(500).json(responseHelper.error(
            500,
            "Error creating account",
            error.message,
        ));
    }
}