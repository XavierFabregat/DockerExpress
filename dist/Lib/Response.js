"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomResponse = void 0;
/**
 * Custom Response
 * Has two static methods: success and error which returns a custom response object
 */
class CustomResponse {
    /**
     *
     * @param data {any} - The data to be returned
     * @param message {string} - The message to be returned
     * @param status {number} - The status code to be returned
     * @returns An object with the following properties: error, message, data, status
     */
    static success(data, message = "Success", status = 200) {
        return { error: false, message, data, status };
    }
    /**
     *
     * @param error {Error} - The error object
     * @param message {string} - The message to be returned
     * @param status {number} - The status code to be returned
     * @returns An object with the following properties: error, message, data (null), status
     */
    static error(error, status = 500, message = error.message) {
        return { error, message, data: null, status };
    }
}
exports.CustomResponse = CustomResponse;
