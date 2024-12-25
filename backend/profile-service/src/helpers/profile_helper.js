const Profile = require('../models/profile');

/**
 * Helper class for managing profile operations in the database
 * @class ProfileHelper
 */
class ProfileHelper {

    /**
     * Retrieves all profiles based on the provided filter
     * @param {Object} [filter={}] - MongoDB filter criteria
     * @param {string} [select=''] - Fields to select in the query
     * @returns {Promise<Array>} Array of profile documents
     * @throws {Error} If there's an error during the database operation
     */
    async get_all_profiles(filter = {}, select = '') {
        try {
            return await Profile.find(filter).select(select).lean();
        } catch(error) {
            throw new Error(`Mongoose error getting all profiles => ${error.message}`);
        }
    }

    /**
     * Creates a new profile in the database
     * @param {Object} profile - Profile data to be created
     * @returns {Promise<Object>} Newly created profile document
     * @throws {Error} If there's an error during the database operation
     */
    async create_new_profile(profile) {
        try {
            const new_profile = new Profile(profile);
            await new_profile.save();
            return new_profile.toJSON();
        } catch(error) {
            throw new Error(`Mongoose error creating new profile => ${error.message}`);
        }
    }

    /**
     * Retrieves a single profile by its ID
     * @param {Object} filter - MongoDB filter criteria (typically contains the ID)
     * @param {string} [select=''] - Fields to select in the query
     * @returns {Promise<Object|null>} Profile document if found, null otherwise
     * @throws {Error} If there's an error during the database operation
     */
    async get_profile_by_id(filter = {}, select = '') {
        try {
            return await Profile.findById(filter).select(select).lean();
        } catch(error) {
            throw new Error(`Mongoose error getting profile => ${error.message}`);
        }
    }

    /**
     * Updates a profile matching the filter criteria
     * @param {Object} [filter={}] - MongoDB filter criteria to find the profile to update
     * @param {Object} [update={}] - Update operations to perform
     * @param {string} [select=''] - Fields to select in the returned document
     * @returns {Promise<Object|null>} Updated profile document if found, null otherwise
     * @throws {Error} If there's an error during the database operation
     */
    async update_profile(filter = {}, update = {}, select = '') {
        try {
            return await Profile.findOneAndUpdate(
                filter,
                update,
                { new: true })
                .select(select)
                .lean();
        } catch(error) {
            throw new Error(`Mongoose error updating profile => ${error.message}`);
        }
    }

    /**
     * Deletes a profile matching the filter criteria
     * @param {Object} [filter={}] - MongoDB filter criteria to find the profile to delete
     * @param {string} [select=''] - Fields to select in the returned document
     * @returns {Promise<Object|null>} Deleted profile document if found, null otherwise
     * @throws {Error} If there's an error during the database operation
     */
    async delete_profile(filter = {}, select = '') {
        try {
            return await Profile.findOneAndDelete(filter).select(select).lean();
        } catch(error) {
            throw new Error(`Mongoose error deleting profile => ${error.message}`);
        }
    }
}

module.exports = new ProfileHelper();