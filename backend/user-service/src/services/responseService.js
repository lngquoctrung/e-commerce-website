/**
 * ResponseService - A service for handling standardized API responses.
 */
class ResponseService {
    
    /**
     * Standardized success response.
     * 
     * @param {Object} data - The data to be returned in the response body.
     * @param {string} message - Optional success message.
     * @param {number} statusCode - HTTP status code (default is 200).
     * @returns {Object} The response object.
     */
    success(data = {}, message = 'Request was successful', statusCode = 200) {
        return {
            status: 'success',
            message,
            data,
            statusCode
        };
    }

    /**
     * Standardized error response.
     * 
     * @param {string} message - The error message to be returned.
     * @param {number} statusCode - HTTP status code (default is 500).
     * @param {Object} errorDetails - Optional detailed error object.
     * @returns {Object} The response object.
     */
    error(message = 'Something went wrong', statusCode = 500, errorDetails = null) {
        return {
            status: 'error',
            message,
            error: errorDetails,
            statusCode
        };
    }

    /**
     * Standardized validation error response.
     * 
     * @param {string} message - The validation error message.
     * @param {Object} errors - Validation error details.
     * @param {number} statusCode - HTTP status code (default is 400).
     * @returns {Object} The response object.
     */
    validationError(message = 'Validation failed', errors = {}, statusCode = 400) {
        return {
            status: 'error',
            message,
            errors,
            statusCode
        };
    }
}

module.exports = new ResponseService();
