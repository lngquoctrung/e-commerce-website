const { validationResult } = require('express-validator');
const responseHelper = require('../../helpers/responseHelper');

module.exports = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(200).json(responseHelper.error(
            400,
            errors.array()[0].msg,
        ));
    }
    next();
}