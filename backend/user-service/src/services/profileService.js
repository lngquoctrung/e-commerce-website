const Profile = require('../models/profile');

/**
 * Service class for handling profile-related operations.
 */
class ProfileService {

    /**
     * Get a profile from the database based on the provided filter.
     *
     * @param {Object} filter - The filter used to search for a profile (e.g., { userId: '123' }).
     * @returns {Promise<Object|undefined>} A promise that resolves to the profile object if found, otherwise undefined.
     * @throws {Error} If there is an error while retrieving the profile.
     */
    async getProfile(filter) {
        try {
            const profile = await Profile.findOne(
                filter,
                undefined,
                undefined
            ).lean();
            if(!profile) return;
            return profile;
        } catch(error) {
            throw new Error(`Error getting profile => ${error.message}`);
        }
    }

    /**
     * Create a new profile and save it to the database.
     *
     * @param {Object} profile - The profile data to be created (e.g., { userId: '123', bio: 'Hello world!' }).
     * @returns {Promise<Object>} A promise that resolves to the newly created profile object.
     * @throws {Error} If there is an error while creating the profile.
     */
    async createProfile(profile) {
        try {
            const newProfile = new Profile();
            await newProfile.save();
            return newProfile;
        } catch(error) {
            throw new Error(`Error creating profile => ${error.message}`);
        }
    }

    /**
     * Update an existing profile based on the provided filter and update data.
     *
     * @param {Object} filter - The filter used to find the profile to update (e.g., { userId: '123' }).
     * @param {Object} updates - The update data (e.g., { bio: 'Updated bio' }).
     * @returns {Promise<Object|undefined>} A promise that resolves to the updated profile object if successful, otherwise undefined.
     * @throws {Error} If there is an error while updating the profile.
     */
    async updateProfile(filter, updates) {
        try {
            const updatedProfile = await Profile.findOneAndUpdate(
                filter,
                updates,
                { new: true }
            ).lean();
            if(!updatedProfile) return;
            return updatedProfile;
        } catch(error) {
            throw new Error(`Error updating profile => ${error.message}`);
        }
    }
}

module.exports = new ProfileService();