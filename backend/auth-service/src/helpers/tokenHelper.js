const jwt = require('jsonwebtoken');

/**
 * Helper class for JWT token operations
 * @class TokenHelper
 */
class TokenHelper {
    /** @private */
    #secretKey;

    /**
     * Creates an instance of TokenHelper
     * @param {string} secretKey - The secret key used for token signing and verification
     * @param {string|number} expiresIn - Token expiration time (e.g., '24h', '60m', or number of seconds)
     * @throws {Error} If secretKey or expiresIn is not provided
     */
    constructor(secretKey, expiresIn) {
        if (!secretKey) throw new Error('Secret key is required');
        if (!expiresIn) throw new Error('ExpiresIn is required');

        this.#secretKey = secretKey;
        this.expiresIn = expiresIn;
    }

    /**
     * Signs a payload and creates a JWT token
     * @param {Object} payload - Data to be encoded in the token
     * @returns {string} Signed JWT token
     * @throws {Error} If there's an error during token signing
     */
    sign(payload) {
        try {
            return jwt.sign(payload, this.#secretKey, { expiresIn: this.expiresIn });
        } catch(error) {
            throw new Error(`Error signing token => ${error.message}`);
        }
    }

    /**
     * Verifies a JWT token
     * @param {string} payload - JWT token to verify
     * @returns {Object} Decoded token payload
     * @throws {Error} If token is invalid or verification fails
     */
    verify(payload) {
        try {
            return jwt.verify(payload, this.#secretKey);
        } catch(error) {
            throw new Error(`Error verifying token => ${error.message}`);
        }
    }
}

/**
 * Helper instance for handling access tokens
 * @type {TokenHelper}
 */
const accessTokenHelper = new TokenHelper(
    process.env.JWT_ACCESS_TOKEN_KEY,
    process.env.JWT_ACCESS_TOKEN_EXPIRES_IN
);

/**
 * Helper instance for handling refresh tokens
 * @type {TokenHelper}
 */
const refreshTokenHelper = new TokenHelper(
    process.env.JWT_REFRESH_TOKEN_KEY,
    process.env.JWT_REFRESH_TOKEN_EXPIRES_IN
);

module.exports = {
    accessTokenHelper,
    refreshTokenHelper,
}