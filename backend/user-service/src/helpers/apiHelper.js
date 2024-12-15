const axios = require('axios');

/**
 * Helper class for making HTTP requests using axios
 * @class ApiHelper
 */
class ApiHelper {
    /**
     * Creates an instance of ApiHelper
     * @constructor
     * @param {string} baseURL - The base URL for all HTTP requests
     * @param {number} [timeout=10000] - Request timeout in milliseconds
     * @param {Object} [headers={}] - Default headers for all requests
     */
    constructor(baseURL, timeout = 10000, headers = {}) {
        this.api = axios.create({
            baseURL: baseURL,
            timeout: timeout,
            withCredentials: true,
            headers,
        });

        this.api.interceptors.response.use(
            response => response,
            error => {
                throw error;
            }
        );
    }

    /**
     * Performs a GET request
     * @async
     * @param {string} endpoint - The API endpoint
     * @param {Object} [params={}] - URL parameters
     * @returns {Promise<any>} Response data from the API
     * @throws {Error} If the request fails
     * @example
     * const data = await apiHelper.getRequest('/users', { page: 1 });
     */
    async getRequest(endpoint, params = {}) {
        try {
            const response = await this.api.get(endpoint, {
                params,
            });
            return response.data;
        } catch(error) {
            throw error;
        }
    }

    /**
     * Performs a POST request
     * @async
     * @param {string} endpoint - The API endpoint
     * @param {Object} [data={}] - Request body
     * @param {Object} [params={}] - URL parameters
     * @returns {Promise<any>} Response data from the API
     * @throws {Error} If the request fails
     * @example
     * const response = await apiHelper.postRequest('/users', { name: 'John' });
     */
    async postRequest(endpoint, data = {}, params = {}) {
        try {
            const response = await this.api.post(endpoint, data, {
                params
            });
            return response.data;
        } catch(error) {
            throw error;
        }
    }

    /**
     * Performs a PUT request
     * @async
     * @param {string} endpoint - The API endpoint
     * @param {Object} [data={}] - Request body
     * @param {Object} [params={}] - URL parameters
     * @returns {Promise<any>} Response data from the API
     * @throws {Error} If the request fails
     * @example
     * const response = await apiHelper.putRequest('/users/1', { name: 'John Updated' });
     */
    async putRequest(endpoint, data = {}, params = {}) {
        try {
            const response = await this.api.put(endpoint, data, {
                params
            });
            return response.data;
        } catch(error) {
            throw error;
        }
    }

    /**
     * Performs a DELETE request
     * @async
     * @param {string} endpoint - The API endpoint
     * @param {Object} [params={}] - URL parameters
     * @param {Object} [data=null] - Request body
     * @returns {Promise<any>} Response data from the API
     * @throws {Error} If the request fails
     * @example
     * const response = await apiHelper.deleteRequest('/users/1');
     */
    async deleteRequest(endpoint, params = {}, data = null) {
        try {
            const response = await this.api.delete(endpoint, { 
                params,
                data 
            });
            return response.data;
        } catch(error) {
            throw error;
        }
    }
}

/**
 * @module ApiHelper
 */
module.exports = ApiHelper;
