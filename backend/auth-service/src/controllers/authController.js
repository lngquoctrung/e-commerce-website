const responseHelper = require('../helpers/responseHelper');

const checkAuth = (req, res) => {
    try {
        return res.status(200).json(responseHelper.success(
            200,
            "Validate credentials successfully",
            req.payload,
        ));
    } catch(error) {
        return res.status(500).json(responseHelper.error(
            500,
            "Error validating credentials",
            error.message,
        ));
    }
}

const register = async (req, res) => {
    try {
        return res.status(201).json(responseHelper.success(
            201,
            "Create account successfully",
            req.payload,
        ));
    } catch(error) {
        return res.status(500).json(responseHelper.error(
            500,
            "Error sign up account",
            error.message,
        ));
    }
}

const login = async (req, res) => {
    try {
        return res.status(200).json(responseHelper.success(
            200,
            "Login successfully",
            req.payload,
        ));
    } catch(error) {
        return res.status(500).json(responseHelper.error(
            500,
            "Error login",
            error.message,
        ));
    }
}

module.exports = {
    checkAuth,
    register,
    login,
}