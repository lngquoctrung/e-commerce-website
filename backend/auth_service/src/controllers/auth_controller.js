const response_helper = require('../helpers/response_helper');

// Check authenticated or not
const check_auth = (req, res) => {
    return res.status(200).json(
        response_helper.success(
            200,
            "Authenticated successfully",
            req.payload,
        )
    );
}

// Login


// Register
const register = (req, res) => {
    return res.status(201).json(
        response_helper.success(
            201,
            "Register successfully",
            req.payload,
        )
    );
}

// Logout


// Refresh token
const refresh_token = (req, res) => {
    return res.status(200).json(
            response_helper.success(
            200,
            "Refresh access token successfully",
            req.payload,
        )
    );
}

module.exports = {
    check_auth,
    register,
    refresh_token,
};