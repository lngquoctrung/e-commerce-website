const userHelper = require('../helpers/userHelper');
const profileHelper = require('../helpers/profileHelper');
const responseHelper = require('../helpers/responseHelper');

// Getting all users
const getAllUsers = async (req, res) => {
    try {
        const users = await userHelper.getUsers();
        return res.status(200).json(responseHelper.success(
            200,
            'Success fetching the list of users',
            users,
        ));
    } catch(error) {
        return res.status(500).json(responseHelper.error(
            500,
            'Failed fetching the list of users',
            error.message,
        ));
    }
}

const searchUser = async (req, res) => {
    try {
        const email = req.query.email;
        const user = await userHelper.getUser({ email: email }, '', '_id email password');
        if(!user)
            return res.status(404).json(responseHelper.error(
                404,
                "User not found"
            ));
        return res.status(200).json(responseHelper.success(
            200,
            "User found",
            user,
        ));
    } catch(error) {
        return res.status(500).json(responseHelper.error(
            500,
            "Failed searching user's data",
            error.message,
        ));
    }
}

// Creating a new user
const createNewUser = async (req, res) => {
    try {
        // Get user's data
        const {first_name, last_name, email, password } = req.body;
        // Create new user
        const newUser = await userHelper.createUser({ 
            email, 
            password 
        });
        // Create profile for new user
        await profileHelper.createProfile({ 
            user: newUser._id,
            email,
            first_name,
            last_name,
        });
        return res.status(201).json(responseHelper.success(
            201,
            "Created successfully",
            newUser,
        ));
    } catch(error) {
        return res.status(500).json(responseHelper.error(
            500,
            "Failed creating new user",
            error.message,
        ));
    }
}

// Getting user
const getUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await userHelper.getUser({
            _id: userId,
        });
        if(!user)
            return res.status(404).json(responseHelper.error(
                404,
                "User not found"
            ));
        return res.status(200).json(responseHelper.success(
            200,
            "Get user data successfully",
            user,
        ));
    } catch(error) {
        return res.status(500).json(responseHelper.error(
            500,
            "Failed getting user's data",
            error.message,
        ));
    }
}

// Updating a user
const updateUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const updatedUser = await userHelper.updateUser({
            _id: userId,
        }, req.body);
        if(!updatedUser)
            return res.status(404).json(responseHelper.error(
                404,
                "User not found"
            ));
        return res.status(200).json(responseHelper.success(
            200,
            "Update user data successfully",
            updatedUser,
        ));
    } catch(error) {
        return res.status(500).json(responseHelper.error(
            500,
            "Failed updating user's data",
            error.message,
        ));
    }
}

// Deleting a user
const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const deletedUser = await userHelper.deleteUser({
            _id: userId,
        });
        if(!deletedUser)
            return res.status(404).json(responseHelper.error(
                404,
                "User not found"
            ));
        return res.status(200).json(responseHelper.success(
            200,
            "Delete user data successfully",
            deletedUser,
        ));
    } catch(error) {
        return res.status(500).json(responseHelper.error(
            500,
            "Failed deleting user's data",
            error.message,
        ));
    }
}

module.exports = {
    getAllUsers,
    searchUser,
    getUser,
    createNewUser,
    updateUser,
    deleteUser,
}