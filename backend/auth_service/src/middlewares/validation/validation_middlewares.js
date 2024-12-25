const { validationResult } = require('express-validator');
const response_helper = require('../../helpers/response_helper');

module.exports = (req, res, next) => {
    // Check valid form data
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        const error_message = errors.array()[0].msg;
        return res.status(400).json(
            response_helper.error(
                400,
                error_message,
            )
        );
    }
    return next();
}