const userService = require('../services/userService');
const responseService = require('../services/responseService');
const profileService = require('../services/profileService');
const axios = require("axios");

// Fetch all users
const getAllUser = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        return res.status(200).json(responseService.success(
            users,
            "Data fetched successfully",
        ));
    }
    catch(error) {
        return res.status(500).json(responseService.error(
            "Error fetching all users",
            500,
            error.message,
        ));
    }
}

// Get user by email
const getUser = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await userService.getUser({ _id: id });
        if(!user)
            return res.status(404).json(responseService.error(
                "User not found",
                404
            ));
        return res.status(200).json(responseService.success(
            user,
            "Data fetched successfully",
        ));
    }
    catch(error) {
        return res.status(500).json(responseService.error(
            "Error fetching user",
            500,
            error.message,
        ));
    }
}

// Search user by filter
const search = async (req, res) => {
    const filter = req.query;
    try {
        const user = await userService.getUser(filter);
        if(!user)
            return res.status(404).json(responseService.error(
                "User not found",
                404
            ));
        return res.status(200).json(responseService.success(
            {
                _id: user._id,
                email: user.email,
                password: user.password,
                resetPasswordToken: user.resetPasswordToken,
                resetPasswordExpires: user.resetPasswordExpires,
            },
            "User found",
        ));
    }
    catch(error) {
        return res.status(500).json(responseService.error(
            "Error searching user",
            500,
            error.message,
        ));
    }
}

// Get profile of a user
const getProfileUser = async (req, res) => {
    const addressServiceApi = process.env.ADDRESS_SERVICE_API;
    const user = req.user;
    try {
        const userData = await userService.getUser({ _id: user.userId });
        const profile = await profileService.getProfile({ _id: userData?.profile });
        const response = await axios.get(addressServiceApi, {
            headers: {
                'Cookie': req.headers.cookie || '',
            }
        });
        return res.status(200).json(responseService.success(
            {
                ...profile,
                addresses: response.data.data,
            },
            "User profile got successfully",
            200
        ));
    }
    catch(error) {
        return res.status(500).json(responseService.error(
            "Error getting profile of user",
            500,
            error.message,
        ));
    }
}

// Update profile of a user
const updateProfileUser = async (req, res) => {
    const fromData = req.body;
    const user = req.user;
    try {
        const userData = await userService.getUser({ _id: user.userId });
        const updatedProfile = await profileService.updateProfile(
            { _id: userData?.profile },
            fromData,
        );
        if (!updatedProfile)
            return res.status(404).json(responseService.error(
                "User not found",
                404
            ));
        return res.status(200).json(responseService.success(
            updatedProfile,
            "User updated successfully",
            200
        ));
    }
    catch(error) {
        return res.status(500).json(responseService.error(
            "Error getting profile of user",
            500,
            error.message,
        ));
    }
}

// Create a new user
const createUser = async (req, res) => {
    const user = req.body;
    try {
        const newUser = await userService.createUser(user);
        return res.status(201).json(responseService.success(
            newUser,
            "User created successfully",
            201
        ));
    }
    catch(error) {
        return res.status(500).json(responseService.error(
            "Error creating user",
            500,
            error.message,
        ));
    }
}

// Update a new user
const updateUser = async (req, res) => {
    const id = req.params.id;
    const updates = req.body;
    try {
        const updatedUser = await userService.updateUser({ _id: id }, updates);
        if(!updatedUser)
            return res.status(404).json(responseService.error(
                "User not found",
                404
            ));
        return res.status(200).json(responseService.success(
            updatedUser,
            "Data updated successfully",
        ));
    }
    catch(error) {
        return res.status(500).json(responseService.error(
            "Error updating user",
            500,
            error.message,
        ));
    }
}

// Delete a user
const deleteUser = async (req, res) => {
    const id = req.params.id;
    try {
        const deletedUser = await userService.deleteUser({ _id: id });
        if(!deletedUser)
            return res.status(404).json(responseService.error(
                "User not found",
                404
            ));
        return res.status(200).json(responseService.success(
            deletedUser,
            "Data deleted successfully",
        ));
    }
    catch(error) {
        return res.status(500).json(responseService.error(
            "Error deleting user",
            500,
            error.message,
        ));
    }
}

module.exports = {
    getAllUser,
    getUser,
    search,
    getProfileUser,
    updateProfileUser,
    createUser,
    updateUser,
    deleteUser
}