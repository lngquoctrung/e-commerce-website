const bcrypt = require('bcryptjs');

/**
 * Helper class for handling bcrypt password hashing and comparison
 * @class BcryptHelper
 */
class BcryptHelper {
    /**
     * Number of salt rounds for bcrypt hashing
     * @private
     * @type {number}
     */
    #saltRounds;

    /**
     * Creates an instance of BcryptService
     * @constructor
     * @throws {Error} If BCRYPT_ROUNDS environment variable is invalid or less than 1
     */
    constructor() {
        this.#saltRounds = parseInt(process.env.BCRYPT_ROUNDS || '10');
        if(!this.#saltRounds || this.#saltRounds < 1) {
            throw new Error('Invalid BCRYPT_ROUNDS value');
        }
    }

    /**
     * Hashes a string using bcrypt
     * @async
     * @param {string} string - The string to hash
     * @returns {Promise<string>} The hashed string
     * @throws {Error} If there's an error during the hashing process
     * @example
     * const hashedPassword = await bcryptService.hash('myPassword123');
     */
    async hash(string) {
        try {
            const genSalt = await bcrypt.genSalt(this.#saltRounds);
            return await bcrypt.hash(string, genSalt);
        } catch(error) {
            throw new Error(`Error hashing => ${error.message}`);
        }
    }

    /**
     * Compares a plain string with a hashed string
     * @async
     * @param {string} string - The plain string to compare
     * @param {string} hashedString - The hashed string to compare against
     * @returns {Promise<boolean>} True if strings match, false otherwise
     * @throws {Error} If there's an error during the comparison process
     * @example
     * const isMatch = await bcryptService.compare('myPassword123', hashedPassword);
     */
    async compare(string, hashedString) {
        try {
            return await bcrypt.compare(string, hashedString);
        } catch(error) {
            throw new Error(`Error comparing => ${error.message}`);
        }
    }
}

/**
 * Exports a singleton instance of BcryptHelper
 * @type {BcryptHelper}
 */
module.exports = new BcryptHelper();