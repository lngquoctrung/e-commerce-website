const responseHelper = require('../../../helpers/responseHelper');
const bcryptHelper = require('../../../helpers/bcryptHelper');

module.exports = async (req, res, next) => {
    try {
        // Get password from form
        const { password } = req.body;
        // Get hashed password from previous middlewares
        const hashedPassword = req.payload.password;
        // Check password
        const isMatched = await bcryptHelper.compare(password, hashedPassword);
        if(!isMatched) {
            return res.status(400).json(responseHelper.error(
                400,
                "Account is invalid",
            ));
        }
        return next();
    } catch(error) {
        return res.status(500).json(responseHelper.error(
            500,
            "Error creating account",
            error.message,
        ));
    }
}