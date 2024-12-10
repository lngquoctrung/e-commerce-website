const axios = require('axios');
const responseService = require('../services/responseService');

module.exports = async (req, res, next) => {
    const authServiceApi = process.env.AUTH_SERVICE_API;
    try {
        const response = await axios.get(`${authServiceApi}/check-auth`, {
            headers: {
                'Cookie': req.headers.cookie || ''
            },
            withCredentials: true,
        });
        req.user = response.data.data;
        return next();
    } catch(error) {
        return res.status(401).json(responseService.error(
            "Authentication failed",
            401,
            error.message
        ));
    }
}