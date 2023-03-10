"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postUserValidation = void 0;
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
