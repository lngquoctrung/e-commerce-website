/**
 * Helper class for standardizing API responses
 * @class ResponseHelper
 */
class ResponseHelper {
    /**
     * Creates a standardized success response object
     * @param {number} [statusCode=200] - HTTP status code
     * @param {string} [message='Successfully'] - Success message
     * @param {*} [data=null] - Data payload to be included in the response
     * @returns {Object} Standardized success response object
     * @returns {string} returns.status - Status of the response
     * @returns {number} returns.status_code - HTTP status code
     * @returns {string} returns.message - Success message
     * @returns {Date} returns.timestamp - Timestamp of the response
     * @returns {*} [returns.data] - Optional data payload
     */
    success(statusCode = 200, message = 'Successfully', data = null){
        const successResponse = {
            status: 'success',
            status_code: statusCode,
            message: message,
            timestamp: new Date(),
        };
        if(data) successResponse.data = data;
        return successResponse;
    }

    /**
     * Creates a standardized error response object
     * @param {number} [statusCode=500] - HTTP status code
     * @param {string} [message='Failed'] - Error message
     * @param {*} [errorDetails=null] - Detailed error information
     * @returns {Object} Standardized error response object
     * @returns {string} returns.status - Response status
     * @returns {number} returns.status_code - HTTP status code
     * @returns {string} returns.message - Error message
     * @returns {Date} returns.timestamp - Response timestamp
     * @returns {*} [returns.errors] - Optional error details
     */
    error(statusCode = 500, message = 'Failed', errorDetails = null){
        const errorResponse = {
            status: 'failed',
            status_code: statusCode,
            message: message,
            timestamp: new Date(),
        };
        if(errorDetails) errorResponse.errors = errorDetails; 
        return errorResponse;
    }
}

/**
 * Exports a singleton instance of ResponseHelper
 * @type {ResponseHelper}
 */
module.exports = new ResponseHelper();