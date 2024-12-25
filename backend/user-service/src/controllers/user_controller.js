const response_helper = require('../helpers/response_helper');
const user_helper = require('../helpers/user_helper');

// Gets all users from database
const get_all_users = async (req, res) => {
    try {
        const users = await user_helper.get_all_users();
        return res.status(200).json(
            response_helper.success(
                200,
                "Get list of users successfully",
                users,
            )
        );
    } catch(error) {
        return res.status(500).json(
            response_helper.error(
                500,
                "An error occurred while retrieving the user list",
                error.message,
            )
        );
    }
}

// Gets user by id
const get_user_by_id = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await user_helper.get_user_by_id(
            { _id: id },
        );
        if(!user) {
            return res.status(404).json(
                response_helper.error(
                    404,
                    "No user found with this id",
                )
            );
        }
        return res.status(200).json(
            response_helper.success(
                200,
                "Get user data successfully",
                user,
            )
        );
    } catch(error) {
        return res.status(500).json(
            response_helper.error(
                500,
                "An error occurred while getting for the user",
                error.message,
            )
        );
    }
}

// Searches user by email
const search_user = async (req, res) => {
    const { email } = req.query;
    try {
        const user = await user_helper.search_user(
            { email },
            '_id email password is_verified role'
        );
        if(!user) {
            return res.status(404).json(
                response_helper.error(
                    404,
                    "No user found with this email",
                )
            );
        }
        return res.status(200).json(
            response_helper.success(
                200,
                "User found",
                user,
            )
        );
    } catch(error) {
        return res.status(500).json(
            response_helper.error(
                500,
                "An error occurred while searching for the user",
                error,
            )
        );
    }
}

// Creates a new user and save in database
const create_new_user = async (req, res) => {
    const { email, password } = req.body;
    try {
        const newUser = await user_helper.create_new_user({ email, password });
        return res.status(201).json(
            response_helper.success(
                201,
                "User account created successfully",
                newUser,
            )
        );
    } catch(error) {
        return res.status(500).json(
            response_helper.error(
                500,
                "An error occurred while creating the user account",
                error.message,
            )
        );
    }
}

// Updates user
const update_user = async (req, res) => {
    const userId = req.params.id;
    try {
        const updatedUser = await user_helper.update_user(
            { _id: userId },
            req.body,
        );
        if(!updatedUser) {
            return res.status(404).json(
                response_helper.error(
                    404,
                    "No user found to update"
                )
            );
        }
        return res.status(200).json(
            response_helper.success(
                200,
                "User information updated successfully",
                updatedUser,
            )
        );
    } catch(error) {
        return res.status(500).json(
            response_helper.error(
                500,
                "An error occurred while updating user information",
                error.message,
            )
        );
    }
}

// Deletes user
const delete_user = async (req, res) => {
    const userId = req.params.id;
    try {
        const deletedUser = await user_helper.delete_user({ _id: userId });
        if(!deletedUser) {
            return res.status(404).json(
                response_helper.error(
                    404,
                    "No user found to delete"
                )
            );
        }
        return res.status(200).json(
            response_helper.success(
                200,
                "User deleted successfully",
                deletedUser,
            )
        );
    } catch(error) {
        return res.status(500).json(
            response_helper.error(
                500,
                "An error occurred while deleting the user",
                error.message,
            )
        );
    }
}

module.exports = {
    get_all_users,
    get_user_by_id,
    search_user,
    create_new_user,
    update_user,
    delete_user,
}