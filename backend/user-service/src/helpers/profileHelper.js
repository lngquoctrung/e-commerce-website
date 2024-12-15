const Profile = require('../models/profile');

/**
 * Helper class for handling profile-related operations
 * @class ProfileHelper
 */
class ProfileHelper {
    /**
     * Creates a new profile in the database
     * @async
     * @param {Object} profile - The profile object containing profile details
     * @returns {Promise<Object>} The newly created profile object
     * @throws {Error} If there's an error during profile creation
     */
    async createProfile(profile) {
        try {
            const newProfile = new Profile(profile);
            await newProfile.save();
            return newProfile;
        } catch(error) {
            throw new Error(`Error creating profile => ${error.message}`);
        }
    }

    /**
     * Retrieves a single profile based on filter criteria
     * @async
     * @param {Object} [filter={}] - MongoDB filter criteria
     * @param {string} [populate=''] - Path(s) to populate in the query
     * @param {string|Object} [select=undefined] - Fields to include/exclude in the result
     * @returns {Promise<Object|undefined>} Profile object if found, undefined otherwise
     * @throws {Error} If there's an error during profile retrieval
     */
    async getProfile(filter = {}, populate = '', select = undefined) {
        try {
            const profile = await Profile
                .findOne(filter)
                .populate(populate)
                .select(select);
            if(!profile) return;
            return profile;
        } catch(error) {
            throw new Error(`Error getting profile => ${error.message}`);
        }
    }

    /**
     * Updates a profile based on filter criteria
     * @async
     * @param {Object} [filter={}] - MongoDB filter criteria to find the profile
     * @param {Object} [update={}] - Update operations to perform
     * @param {string} [populate=''] - Path(s) to populate in the query
     * @param {string|Object} [select=undefined] - Fields to include/exclude in the result
     * @returns {Promise<Object|undefined>} Updated profile object if found, undefined otherwise
     * @throws {Error} If there's an error during profile update
     */
    async updateProfile(filter = {}, update = {}, populate = '', select = undefined) {
        try {
            const updatedProfile = await Profile
                .findOneAndUpdate(filter, update, { new: true })
                .populate(populate)
                .select(select);
            if(!updatedProfile) return;
            return updatedProfile;
        } catch(error) {
            throw new Error(`Error updating profile => ${error.message}`);
        }
    }
}

/**
 * Exports a singleton instance of ProfileHelper
 * @type {ProfileHelper}
 */
module.exports = new ProfileHelper();