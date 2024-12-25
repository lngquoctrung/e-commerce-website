const Address = require('../models/address');

/**
 * Helper class for managing address-related database operations
 * @class Address_Helper
 */
class Address_Helper {
    /**
     * Retrieves multiple addresses based on the provided filter
     * @async
     * @param {Object} [filter={}] - MongoDB filter criteria
     * @param {string} [select=''] - Fields to select in the query
     * @returns {Promise<Array<Object>>} Array of address documents
     * @throws {Error} If there's an error retrieving addresses
     */
    async get_addresses(filter = {}, select = '') {
        try {
            return await Address
                .find(filter)
                .select(select)
                .lean();
        } catch(error) {
            throw new Error(`Mongoose error getting all addresses => ${error.message}`);
        }
    }

    /**
     * Creates a new address document
     * @async
     * @param {Object} address - Address data to be created
     * @returns {Promise<Object>} Created address document
     * @throws {Error} If there's an error creating the address
     */
    async create_new_address(address) {
        try {
            const new_address = new Address(address);
            await new_address.save();
            return new_address.toJSON();
        } catch(error) {
            throw new Error(`Mongoose error creating new address => ${error.message}`);
        }
    }

    /**
     * Retrieves a single address based on the provided filter
     * @async
     * @param {Object} [filter={}] - MongoDB filter criteria
     * @param {string} [select=''] - Fields to select in the query
     * @returns {Promise<Object|undefined>} Address document if found, undefined otherwise
     * @throws {Error} If there's an error retrieving the address
     */
    async get_address(filter = {}, select = '') {
        try {
            const address = await Address
                .findOne(filter)
                .select(select)
                .lean();
            if(!address) return;
            return address;
        } catch(error) {
            throw new Error(`Mongoose error updating address => ${error.message}`);
        }
    }

    /**
     * Updates an existing address document
     * @async
     * @param {Object} [filter={}] - MongoDB filter criteria to find the address
     * @param {Object} [update={}] - Update operations to apply
     * @param {string} [select=''] - Fields to select in the query
     * @returns {Promise<Object|undefined>} Updated address document if found, undefined otherwise
     * @throws {Error} If there's an error updating the address
     */
    async update_address(filter = {}, update = {}, select = '') {
        try {
            const updated_address = await Address
                .findOneAndUpdate(filter, update, { new: true })
                .select(select)
                .lean();
            if(!updated_address) return;
            return updated_address;
        } catch(error) {
            throw new Error(`Mongoose error updating address => ${error.message}`);
        }
    }

    /**
     * Deletes an address document
     * @async
     * @param {Object} [filter={}] - MongoDB filter criteria to find the address to delete
     * @param {string} [select=''] - Fields to select in the query
     * @returns {Promise<Object|undefined>} Deleted address document if found, undefined otherwise
     * @throws {Error} If there's an error deleting the address
     */
    async delete_address(filter = {}, select = '') {
        try {
            const deleted_address = await Address
                .findOneAndDelete(filter)
                .select(select)
                .lean();
            if(!deleted_address) return;
            return deleted_address;
        } catch(error) {
            throw new Error(`Mongoose error deleting address => ${error.message}`);
        }
    }
}

module.exports = new Address_Helper();