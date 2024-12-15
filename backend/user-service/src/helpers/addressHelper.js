const Address = require('../models/address');

/**
 * Helper class for handling address-related operations
 * @class AddressHelper
 */
class AddressHelper {
    /**
     * Creates a new address in the database
     * @async
     * @param {Object} address - The address object containing address details
     * @returns {Promise<Object>} The newly created address object
     * @throws {Error} If there's an error during address creation
     */
    async createAddress(address) {
        try {
            const newAddress = new Address(address);
            await newAddress.save();
            return newAddress;
        } catch(error) {
            throw new Error(`Error creating address => ${error.message}`);
        }
    }

    /**
     * Retrieves multiple addresses based on filter criteria
     * @async
     * @param {Object} [filter={}] - MongoDB filter criteria
     * @param {string} [populate=''] - Path(s) to populate in the query
     * @param {string|Object} [select=undefined] - Fields to include/exclude in the result
     * @returns {Promise<Array<Object>>} Array of address objects matching the criteria
     * @throws {Error} If there's an error during addresses retrieval
     */
    async getAddresses(filter = {}, populate = '', select = undefined) {
        try {
            const addresses = await Address
                .find(filter)
                .populate(populate)
                .select(select);
            return addresses;
        } catch(error) {
            throw new Error(`Error getting addresses => ${error.message}`);
        }
    }

    /**
     * Retrieves a single address based on filter criteria
     * @async
     * @param {Object} [filter={}] - MongoDB filter criteria
     * @param {string} [populate=''] - Path(s) to populate in the query
     * @param {string|Object} [select=undefined] - Fields to include/exclude in the result
     * @returns {Promise<Object|undefined>} Address object if found, undefined otherwise
     * @throws {Error} If there's an error during address retrieval
     */
    async getAddress(filter = {}, populate = '', select = undefined) {
        try {
            const address = await Address
                .findOne(filter)
                .populate(populate)
                .select(select);
            if(!address) return;
            return address;
        } catch(error) {
            throw new Error(`Error getting address => ${error.message}`);
        }
    }

    /**
     * Updates an address based on filter criteria
     * @async
     * @param {Object} [filter={}] - MongoDB filter criteria to find the address
     * @param {Object} [update={}] - Update operations to perform
     * @param {string} [populate=''] - Path(s) to populate in the query
     * @param {string|Object} [select=undefined] - Fields to include/exclude in the result
     * @returns {Promise<Object|undefined>} Updated address object if found, undefined otherwise
     * @throws {Error} If there's an error during address update
     */
    async updateAddress(filter = {}, update = {}, populate = '', select = undefined) {
        try {
            const updatedAddress = await Address
                .findOneAndUpdate(filter, update, { new: true })
                .populate(populate)
                .select(select);
            if(!updatedAddress) return;
            return updatedAddress;
        } catch(error) {
            throw new Error(`Error updating address => ${error.message}`);
        }
    }

    /**
     * Deletes an address based on filter criteria
     * @async
     * @param {Object} [filter={}] - MongoDB filter criteria to find the address
     * @param {string} [populate=''] - Path(s) to populate in the query
     * @param {string|Object} [select=undefined] - Fields to include/exclude in the result
     * @returns {Promise<Object|undefined>} Deleted address object if found, undefined otherwise
     * @throws {Error} If there's an error during address deletion
     */
    async deleteAddress(filter = {}, populate = '', select = undefined) {
        try {
            const deletedAddress = await Address
                .findOneAndDelete(filter)
                .populate(populate)
                .select(select);
            if(!deletedAddress) return;
            return deletedAddress;
        } catch(error) {
            throw new Error(`Error deleting address => ${error.message}`);
        }
    }
}

/**
 * Exports a singleton instance of AddressHelper
 * @type {AddressHelper}
 */
module.exports = new AddressHelper();