const profileHelper = require('../helpers/profileHelper');
const responseHelper = require('../helpers/responseHelper');

const getProfile = async (req, res) => {
    try {
        const userId = req.payload.userId;
        const profile = await profileHelper.getProfile({ user: userId });
        if(!profile)
            return res.status(404).json(responseHelper.error(
                404,
                "User not found"
            ));
        return res.status(200).json(responseHelper.success(
            200,
            "Success fetching user's profile",
            profile,
        ));
    } catch(error) {
        return res.status(500).json(responseHelper.error(
            500,
            "Error fetching user's profile",
            error.message,
        ))
    }
}


const updateProfile = (req, res) => {
    
}

module.exports = {
    getProfile,
    updateProfile,
}