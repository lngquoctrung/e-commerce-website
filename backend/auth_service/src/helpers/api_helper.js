const axios = require('axios');

/**
 * Helper class for making HTTP requests using axios
 * @class ApiHelper
 */
class ApiHelper {
    /**
     * Creates an instance of ApiHelper with configured axios instance
     * @param {string} base_url - Base URL for all API requests
     * @constructor
     */
    constructor(base_url) {
        this.api = axios.create({
            baseURL: base_url,
            timeout: 30000,           // 30s
            withCredentials: true,
        });
    }

    /**
     * Performs a GET request to the specified endpoint
     * @async
     * @param {string} endpoint - The API endpoint to send the request to
     * @param {import('axios').AxiosRequestConfig} [config={}] - Additional axios configuration options
     * @returns {Promise<any>} Response data from the API
     * @throws {import('axios').AxiosError} When the request fails
     */
    async get_request(endpoint, config = {}) {
        try {
            const response = await this.api.get(endpoint, config);
            return response.data;
        } catch(error) {
            throw error;
        }
    }

    /**
     * Performs a POST request to the specified endpoint
     * @async
     * @param {string} endpoint - The API endpoint to send the request to
     * @param {Object} [data={}] - Data to be sent in the request body
     * @param {import('axios').AxiosRequestConfig} [config={}] - Additional axios configuration options
     * @returns {Promise<any>} Response data from the API
     * @throws {import('axios').AxiosError} When the request fails
     */
    async post_request(endpoint, data = {}, config = {}) {
        try {
            const response = await this.api.post(endpoint, data, config);
            return response.data;
        } catch(error) {
            throw error;
        }
    }

    /**
     * Performs a PUT request to the specified endpoint
     * @async
     * @param {string} endpoint - The API endpoint to send the request to
     * @param {Object} [data={}] - Data to be sent in the request body
     * @param {import('axios').AxiosRequestConfig} [config={}] - Additional axios configuration options
     * @returns {Promise<any>} Response data from the API
     * @throws {import('axios').AxiosError} When the request fails
     */
    async put_request(endpoint, data = {}, config = {}) {
        try {
            const response = await this.api.put(endpoint, data, config);
            return response.data;
        } catch(error) {
            throw error;
        }
    }

    /**
     * Performs a DELETE request to the specified endpoint
     * @async
     * @param {string} endpoint - The API endpoint to send the request to
     * @param {import('axios').AxiosRequestConfig} [config={}] - Additional axios configuration options
     * @returns {Promise<any>} Response data from the API
     * @throws {import('axios').AxiosError} When the request fails
     */
    async delete_request(endpoint, config = {}) {
        try {
            const response = await this.api.delete(endpoint, config);
            return response.data;
        } catch(error) {
            throw error;
        }
    }
}

module.exports = ApiHelper;