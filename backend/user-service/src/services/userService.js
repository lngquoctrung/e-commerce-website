const User = require('../models/user');

/**
 * Service class for handling user-related operations.
 * @class UserService
 */
class UserService {

    /**
     * Get all users from the database.
     * 
     * @returns {Promise<Array>} A promise that resolves to an array of user objects.
     * @throws {Error} If there is an error while retrieving the users.
     */
    async getAllUsers(filter = {}) {
        try {
            return await User
                    .find(filter, undefined, undefined)
                    .populate('profile')
                    .lean();
        }
        catch(error) {
            throw new Error(`Error fetching user => ${error.message}`);
        }
    }

    /**
     * Get a single user from the database based on a filter.
     * 
     * @param {Object} filter - The filter to search for the user (e.g., { email: 'user@example.com' }).
     * @returns {Promise<Object|undefined>} A promise that resolves to a user object if found, otherwise undefined.
     * @throws {Error} If there is an error while retrieving the user.
     */
    async getUser(filter) {
        try {
            const user = await User
                    .findOne(filter, undefined, undefined)
                    .populate('profile')
                    .lean();
            if(!user) return;
            return user;
        }
        catch(error) {
            throw new Error(`Error getting user => ${error.message}`);
        }
    }

    /**
     * Create a new user and save it to the database.
     * 
     * @param {Object} user - The user object to be created (should contain user properties like name, email, etc.).
     * @returns {Promise<Object>} A promise that resolves to the created user object.
     * @throws {Error} If there is an error while creating or saving the user.
     */
    async createUser(user) {
        try {
            const newUser = new User(user);
            await newUser.save();
            return newUser;
        }
        catch(error) {
            throw new Error(`Error creating user => ${error.message}`);
        }
    }

    /**
     * Update an existing user based on the filter and update data.
     * 
     * @param {Object} filter - The filter to find the user to update (e.g., { email: 'user@example.com' }).
     * @param {Object} updates - The data to update in the user document (e.g., { name: 'New Name' }).
     * @returns {Promise<Object|undefined>} A promise that resolves to the updated user object if successful, otherwise undefined.
     * @throws {Error} If there is an error while updating the user.
     */
    async updateUser(filter, updates) {
        try {
            const updatedUser = await User.findOneAndUpdate(
                                        filter, 
                                        updates,
                                { new: true }
                                    ).lean();
            if(!updatedUser) return;
            return updatedUser;
        }
        catch(error) {
            throw new Error(`Error updating user => ${error.message}`);
        }
    }

    /**
     * Delete a user from the database based on the provided filter.
     * 
     * @param {Object} filter - The filter to find the user to delete (e.g., { email: 'user@example.com' }).
     * @returns {Promise<Object|undefined>} A promise that resolves to the deleted user object if successful, otherwise undefined.
     * @throws {Error} If there is an error while deleting the user.
     */
    async deleteUser(filter) {
        try {
            const deletedUser = await User.findOneAndDelete(filter, null).lean();
            if(!deletedUser) return;
            return deletedUser;
        }
        catch(error) {
            throw new Error(`Error deleting user => ${error.message}`);
        }
    }
}

module.exports = new UserService();