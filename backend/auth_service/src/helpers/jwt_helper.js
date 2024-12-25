const jwt = require('jsonwebtoken');

/**
 * Helper class for JWT token operations
 * @class JwtHelper
 */
class JwtHelper {
    /**
     * Private field for storing the secret key used for token signing
     * @private
     * @type {string}
     */
    #secret_key;

    /**
     * Creates a new JwtHelper instance
     * @constructor
     * @param {string} secret_key - Secret key used for signing tokens
     * @param {string|number} expires_in - Token expiration time (e.g., '24h', '60m', or seconds)
     */
    constructor(secret_key, expires_in) {
        this.#secret_key = secret_key;
        this.expires_in = expires_in;
    }

    /**
     * Signs a payload and creates a JWT token
     * @param {Object} payload - Data to be encoded in the token
     * @returns {string} Signed JWT token
     * @throws {Error} If signing fails
     */
    sign(payload) {
        return jwt.sign(payload, this.#secret_key, { expiresIn: this.expires_in, });
    }

    /**
     * Verifies a JWT token
     * @param {string} token - JWT token to verify
     * @returns {Object} Decoded token payload
     * @throws {JsonWebTokenError} If token is invalid
     * @throws {TokenExpiredError} If token has expired
     */
    verify(token) {
        return jwt.verify(token, this.#secret_key);
    }
}

/**
 * Environmental variables for JWT configuration
 * @type {string}
 */
const ACCESS_TOKEN_SECRET_KEY = process.env.ACCESS_TOKEN_SECRET_KEY;
const ACCESS_TOKEN_EXPIRES_IN = process.env.ACCESS_TOKEN_EXPIRES_IN;
const REFRESH_TOKEN_SECRET_KEY = process.env.REFRESH_TOKEN_SECRET_KEY;
const REFRESH_TOKEN_EXPIRES_IN = process.env.REFRESH_TOKEN_EXPIRES_IN;
const INTERNAL_TOKEN_SECRET_KEY = process.env.INTERNAL_TOKEN_SECRET_KEY;
const INTERNAL_TOKEN_EXPIRES_IN = process.env.INTERNAL_TOKEN_EXPIRES_IN;

// ! Validate required environment variables
if(!ACCESS_TOKEN_SECRET_KEY ||
    !ACCESS_TOKEN_EXPIRES_IN ||
    !REFRESH_TOKEN_SECRET_KEY ||
    !REFRESH_TOKEN_EXPIRES_IN ||
    !INTERNAL_TOKEN_SECRET_KEY ||
    !INTERNAL_TOKEN_EXPIRES_IN) {
    console.error('Missing configurations');
    process.exit(1);
}

/**
 * JWT helper instance for handling access tokens
 * @type {JwtHelper}
 */
const access_jwt_helper = new JwtHelper(
    ACCESS_TOKEN_SECRET_KEY,
    ACCESS_TOKEN_EXPIRES_IN,
);

/**
 * JWT helper instance for handling refresh tokens
 * @type {JwtHelper}
 */
const refresh_jwt_helper = new JwtHelper(
    REFRESH_TOKEN_SECRET_KEY,
    REFRESH_TOKEN_EXPIRES_IN,
);

/**
 * JWT helper instance for handling internal tokens
 * @type {JwtHelper}
 */
const internal_jwt_helper = new JwtHelper(
    INTERNAL_TOKEN_SECRET_KEY,
    INTERNAL_TOKEN_EXPIRES_IN,
);

/**
 * @typedef {Object} JwtHelpers
 * @property {JwtHelper} access_jwt_helper - Helper for access token operations
 * @property {JwtHelper} refresh_jwt_helper - Helper for refresh token operations
 * @property {JwtHelper} internal_jwt_helper - Helper for internal token operations
 */

/**
 * Exported JWT helper instances
 * @type {JwtHelpers}
 */
module.exports = {
    access_jwt_helper,
    refresh_jwt_helper,
    internal_jwt_helper,
};