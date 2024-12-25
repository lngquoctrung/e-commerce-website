const User = require('../models/user');

/**
 * Helper class for managing user operations in MongoDB using Mongoose
 * @class UserHelper
 */
class UserHelper {
    /**
     * Retrieves all users matching the specified filter
     * @async
     * @param {Object} [filter={}] - MongoDB filter criteria
     * @param {string} [select=''] - Space-separated list of fields to select
     * @returns {Promise<Array<Object>>} Array of user documents
     * @throws {Error} If there's an error retrieving users from the database
     */
    async get_all_users(filter = {}, select = '') {
        try {
            return await User
                .find(filter)
                .select(select)
                .lean();
        } catch(error) {
            throw new Error(`Mongoose error getting all users => ${error.message}`);
        }
    }

    /**
     * Gets a single user by the id
     * @async
     * @param {Object} [filter={}] - MongoDB filter criteria
     * @param {string} [select=''] - Space-separated list of fields to select
     * @returns {Promise<Object|null>} User document if found, null otherwise
     * @throws {Error} If there's an error searching for the user
     */
    async get_user_by_id(filter = {}, select = '') {
        try {
            return await User
                .findById(filter)
                .select(select)
                .lean();
        } catch(error) {
            throw new Error(`Mongoose error getting user => ${error.message}`);
        }
    }

    /**
     * Creates a new user in the database
     * @async
     * @param {Object} user - User object containing user details
     * @param {string} user.name - Name of the user
     * @param {string} user.email - Email of the user
     * @param {string} user.password - Password of the user
     * @returns {Promise<Object>} Newly created user document
     * @throws {Error} If there's an error creating the user
     */
    async create_new_user(user) {
        try {
            const new_user = new User(user);
            await new_user.save();
            return new_user.toJSON();
        } catch(error) {
            throw new Error(`Mongoose error creating new user => ${error.message}`);
        }
    }

    /**
     * Finds a single user matching the specified filter
     * @async
     * @param {Object} [filter={}] - MongoDB filter criteria
     * @param {string} [select=''] - Space-separated list of fields to select
     * @returns {Promise<Object|null>} User document if found, null otherwise
     * @throws {Error} If there's an error searching for the user
     */
    async search_user(filter = {}, select = '') {
        try {
            return await User
                .findOne(filter)
                .select(select)
                .lean();
        } catch(error) {
            throw new Error(`Mongoose error searching user => ${error.message}`);
        }
    }

    /**
     * Updates a user matching the specified filter
     * @async
     * @param {Object} [filter={}] - MongoDB filter criteria to find the user
     * @param {Object} [update={}] - Update operations to perform
     * @param {string} [select=''] - Space-separated list of fields to select
     * @returns {Promise<Object|null>} Updated user document if found, null otherwise
     * @throws {Error} If there's an error updating the user
     */
    async update_user(filter = {}, update = {}, select = '') {
        try {
            return await User
                .findOneAndUpdate(filter, update, { new: true })
                .select(select)
                .lean();
        } catch(error) {
            throw new Error(`Mongoose error updating user => ${error.message}`);
        }
    }

    /**
     * Deletes a user matching the specified filter
     * @async
     * @param {Object} [filter={}] - MongoDB filter criteria to find the user
     * @param {string} [select=''] - Space-separated list of fields to select
     * @returns {Promise<Object|null>} Deleted user document if found, null otherwise
     * @throws {Error} If there's an error deleting the user
     */
    async delete_user(filter = {}, select = '') {
        try {
            return await User
                .findOneAndDelete(filter)
                .select(select)
                .lean();
        } catch(error) {
            throw new Error(`Mongoose error deleting user => ${error.message}`);
        }
    }
}

module.exports = new UserHelper();