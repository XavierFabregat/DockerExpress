/**
 * Custom Response
 * Has two static methods: success and error which returns a custom response object
 */
export class CustomResponse {
  /**
   * 
   * @param data {any} - The data to be returned
   * @param message {string} - The message to be returned
   * @param status {number} - The status code to be returned
   * @returns An object with the following properties: error, message, data, status
   */
  public static success(data: any, message: string = "Success", status: number = 200) {
    return {error: false, message, data, status};
  }
  /**
   * 
   * @param error {Error} - The error object
   * @param message {string} - The message to be returned
   * @param status {number} - The status code to be returned
   * @returns An object with the following properties: error, message, data (null), status
   */
  public static error(error: Error,status: number = 500, message: string = error.message) {
    return {error , message, data: null, status};
  }
}