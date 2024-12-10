const responseService = require('../services/responseService');

module.exports = (req, res, next) => {
    const user = req.user;
    if(user.role !== 'admin')
        return res.status(403).json(responseService.error(
            "You do not have access",
            403
        ));
    return next();
}