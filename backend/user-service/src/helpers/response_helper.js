/**
 * Helper class for standardizing API responses
 * @class ResponseHelper
 */
class ResponseHelper {
    /**
     * Creates a success response object
     * @param {number} [status=200] - HTTP status code for the response
     * @param {string} [message='Successful response'] - Success message
     * @param {*} [data=null] - Optional data payload to include in response
     * @returns {Object} Formatted success response object
     * @returns {boolean} response.success - Always true for success responses
     * @returns {number} response.status - HTTP status code
     * @returns {string} response.message - Success message
     * @returns {Date} response.timestamp - Timestamp of the response
     * @returns {*} [response.data] - Optional data payload
     */
    success(status = 200,
            message = 'Successful response',
            data = null) {
        const success_response = {
            success: true,
            status: status,
            message: message,
            timestamp: new Date(),
        };
        if(data)
            success_response.data = data;
        return success_response;
    }

    /**
     * Creates an error response object
     * @param {number} [status=400] - HTTP status code for the error
     * @param {string} [message='Error response'] - Error message
     * @param {*} [errors=null] - Optional error details
     * @returns {Object} Formatted error response object
     * @returns {boolean} response.success - Always false for error responses
     * @returns {number} response.status - HTTP status code
     * @returns {string} response.message - Error message
     * @returns {Date} response.timestamp - Timestamp of the response
     * @returns {*} [response.errors] - Optional error details
     */
    error(status = 400,
          message = 'Error response',
          errors = null) {
        const error_response = {
            success: false,
            status: status,
            message: message,
            timestamp: new Date(),
        };
        if(errors)
            error_response.errors = errors;
        return error_response;
    }
}

module.exports = new ResponseHelper();