const response_helper = require('../../helpers/response_helper');

module.exports = (req, res, next) => {
    if(req.payload.role !== 'admin') {
        return res.status(403).json(
            response_helper.error(
                403,
                "Access denied"
            )
        );
    }
    return next();
}