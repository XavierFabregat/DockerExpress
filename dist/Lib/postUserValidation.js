"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUpdatePasswords = exports.validateUsername = exports.validatePassword = exports.postUserValidation = void 0;
function postUserValidation(username, password, repeatPassword) {
    if (!username || !password || !repeatPassword) {
        return { valid: false, message: "Username and password are required" };
    }
    else if (password !== repeatPassword) {
        return { valid: false, message: "Passwords do not match" };
    }
    else if (!/(?=.*[!@#$%^&*_-])/.test(password) || !(password.length > 5)) {
        return { valid: false, message: "Password invalid." };
    }
    else if (username.length < 6) {
        return { valid: false, message: "Username must be at least 6 characters" };
    }
    else {
        return { valid: true, message: "" };
    }
}
exports.postUserValidation = postUserValidation;
function validatePassword(password) {
    if (!/(?=.*[!@#$%^&*_-])/.test(password) || !(password.length > 5)) {
        return { valid: false, message: "Password invalid." };
    }
    else {
        return { valid: true, message: "" };
    }
}
exports.validatePassword = validatePassword;
function validateUsername(username) {
    if (username.length < 6) {
        return { valid: false, message: "Username must be at least 6 characters" };
    }
    else {
        return { valid: true, message: "" };
    }
}
exports.validateUsername = validateUsername;
function validateUpdatePasswords(password, repeatPassword) {
    if (!validatePassword(password).valid || !validatePassword(repeatPassword).valid) {
        return { valid: false, message: "Password/s invalid." };
    }
    else if (!password || !repeatPassword) {
        return { valid: false, message: "Password and repeat password are required" };
    }
    else if (password !== repeatPassword) {
        return { valid: false, message: "Passwords do not match" };
    }
    else {
        return { valid: true, message: "" };
    }
}
exports.validateUpdatePasswords = validateUpdatePasswords;
