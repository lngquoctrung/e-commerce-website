const User = require('../models/user');

/**
 * Helper class for handling user-related operations
 * @class UserHelper
 */
class UserHelper {
    /**
     * Creates a new user in the database
     * @async
     * @param {Object} user - The user object containing user details
     * @returns {Promise<Object>} The newly created user object
     * @throws {Error} If there's an error during user creation
     */
    async createUser(user) {
        try {
            const newUser = new User(user);
            await newUser.save();
            return newUser;
        } catch(error) {
            throw new Error(`Error creating user => ${error.message}`);
        }
    }

    /**
     * Retrieves multiple users based on filter criteria
     * @async
     * @param {Object} [filter={}] - MongoDB filter criteria
     * @param {string} [populate=''] - Path(s) to populate in the query
     * @param {string|Object} [select=undefined] - Fields to include/exclude in the result
     * @returns {Promise<Array<Object>>} Array of user objects matching the criteria
     * @throws {Error} If there's an error during user retrieval
     */
    async getUsers(filter = {}, populate = '', select = undefined) {
        try {
            const users = await User
                .find(filter)
                .populate(populate)
                .select(select)
                .lean();
            return users;
        } catch(error) {
            throw new Error(`Error getting users => ${error.message}`);
        }
    }

    /**
     * Retrieves a single user based on filter criteria
     * @async
     * @param {Object} [filter={}] - MongoDB filter criteria
     * @param {string} [populate=''] - Path(s) to populate in the query
     * @param {string|Object} [select=undefined] - Fields to include/exclude in the result
     * @returns {Promise<Object|undefined>} User object if found, undefined otherwise
     * @throws {Error} If there's an error during user retrieval
     */
    async getUser(filter = {}, populate = '', select = undefined) {
        try {
            const user = await User
                .findOne(filter)
                .populate(populate)
                .select(select)
                .lean();
            if(!user) return;
            return user;
        } catch(error) {
            throw new Error(`Error getting user => ${error.message}`);
        }
    }

    /**
     * Updates a user based on filter criteria
     * @async
     * @param {Object} [filter={}] - MongoDB filter criteria to find the user
     * @param {Object} [update={}] - Update operations to perform
     * @param {string} [populate=''] - Path(s) to populate in the query
     * @param {string|Object} [select=undefined] - Fields to include/exclude in the result
     * @returns {Promise<Object|undefined>} Updated user object if found, undefined otherwise
     * @throws {Error} If there's an error during user update
     */
    async updateUser(filter = {}, update = {}, populate = '', select = undefined) {
        try {
            const updatedUser = await User
                .findOneAndUpdate(filter, update, { new: true })
                .populate(populate)
                .select(select)
                .lean();
            if(!updatedUser) return;
            return updatedUser;
        } catch(error) {
            throw new Error(`Error updating user => ${error.message}`);
        }
    }

    /**
     * Deletes a user based on filter criteria
     * @async
     * @param {Object} [filter={}] - MongoDB filter criteria to find the user
     * @param {string} [populate=''] - Path(s) to populate in the query
     * @param {string|Object} [select=undefined] - Fields to include/exclude in the result
     * @returns {Promise<Object|undefined>} Deleted user object if found, undefined otherwise
     * @throws {Error} If there's an error during user deletion
     */
    async deleteUser(filter = {}, populate = '', select = undefined) {
        try {
            const deletedUser = await User
                .findOneAndDelete(filter)
                .populate(populate)
                .select(select)
                .lean();
            if(!deletedUser) return;
            return deletedUser;
        } catch(error) {
            throw new Error(`Error deleting user => ${error.message}`);
        }
    }
}

/**
 * Exports a singleton instance of UserHelper
 * @type {UserHelper}
 */
module.exports = new UserHelper();