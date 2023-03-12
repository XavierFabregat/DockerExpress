"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const bcrypt_1 = __importDefault(require("bcrypt"));
const User_model_1 = __importDefault(require("../Models/User.model"));
const Response_1 = require("../Lib/Response");
const Todos_model_1 = __importDefault(require("../Models/Todos.model"));
const postUserValidation_1 = require("../Lib/postUserValidation");
const safeUser_1 = require("../Lib/safeUser");
class UserController {
    static async getUsers(req, res) {
        try {
            const users = await User_model_1.default.findAll({
                include: [{ model: Todos_model_1.default, as: "todos" }],
            });
            res.status(200).json(Response_1.CustomResponse.success((0, safeUser_1.returnSafeUsers)(users)));
        }
        catch (error) {
            if (error instanceof Error) {
                res
                    .status(500)
                    .json(Response_1.CustomResponse.error(error));
            }
        }
    }
    static async postUser(req, res) {
        try {
            const { username, password, repeatPassword } = req.body;
            if (!username || !password || !repeatPassword) {
                throw new Error("Username and password are required");
            }
            ;
            if (password !== repeatPassword) {
                throw new Error("Passwords do not match");
            }
            const inputValidation = (0, postUserValidation_1.postUserValidation)(username, password, repeatPassword);
            if (!inputValidation.valid) {
                throw new Error(`Error in input validation : ${inputValidation.message}`);
            }
            ;
            const id = (0, uuid_1.v4)();
            const hashedPassword = await bcrypt_1.default.hash(password, 10);
            const doesUserExist = await User_model_1.default.findOne({
                where: {
                    username,
                },
            }).then((user) => {
                return user;
            }).catch((error) => {
                throw new Error(`Error finding the user : ${error}`);
            });
            if (doesUserExist) {
                throw new Error("Username taken.");
            }
            const user = await User_model_1.default.create({
                id,
                username,
                password: hashedPassword,
            }).then(async () => {
                const newUser = await User_model_1.default.findByPk(id, {
                    include: [{ model: Todos_model_1.default, as: "todos" }]
                });
                if (!newUser) {
                    throw new Error("User not found");
                }
                return newUser;
            }).catch((error) => {
                throw new Error(`Error creating the user : ${error}`);
            });
            res.status(201).json(Response_1.CustomResponse.success((0, safeUser_1.returnSafeUser)(user), "User created successfully", 201));
        }
        catch (error) {
            if (error instanceof Error) {
                if (error.message === "Username taken.") {
                    res
                        .status(409)
                        .json(Response_1.CustomResponse.error(error, 409, "Username already taken"));
                }
                else if (error.message === "Username and password are required") {
                    res
                        .status(400)
                        .json(Response_1.CustomResponse.error(error, 400, "Username and password are required"));
                }
                else if (error.message.includes("Error in input validation")) {
                    res
                        .status(403)
                        .json(Response_1.CustomResponse.error(error, 403, error.message));
                }
                else if (error.message === 'Passwords do not match') {
                    res
                        .status(403)
                        .json(Response_1.CustomResponse.error(error, 403, error.message));
                }
                else {
                    res
                        .status(500)
                        .json(Response_1.CustomResponse.error(error, 500, error.message));
                }
            }
        }
    }
    static async getUserById(req, res) {
        try {
            const { id } = req.params;
            const user = await User_model_1.default.findOne({
                where: {
                    id,
                },
                include: [{ model: Todos_model_1.default, as: "todos" }],
            }).then((user) => {
                return user;
            }).catch((error) => {
                throw new Error(`Error finding the user : ${error}`);
            });
            if (!user) {
                throw new Error("User not found");
            }
            res.status(200).json(Response_1.CustomResponse.success((0, safeUser_1.returnSafeUser)(user)));
        }
        catch (error) {
            if (error instanceof Error) {
                if (error.message === "User not found") {
                    res
                        .status(404)
                        .json(Response_1.CustomResponse.error(error, 404));
                }
                else {
                    res
                        .status(500)
                        .json(Response_1.CustomResponse.error(error));
                }
            }
        }
    }
    static async updateUser(req, res) {
        try {
            const { updatedValue, id } = req.params;
            const userToUpdate = await User_model_1.default.findByPk(id);
            if (!userToUpdate) {
                throw new Error("User not found");
            }
            if (updatedValue === 'password') {
                const { oldPassword, password, repeatPassword } = req.body;
                if (!oldPassword) {
                    // This is for the forgot password functionality!! (needs some fixing, since now with just the username you can change the password)
                    if (!password || !repeatPassword) {
                        throw new Error("Password and repeat password are required");
                    }
                    const inputValidation = (0, postUserValidation_1.validateUpdatePasswords)(password, repeatPassword);
                    if (!inputValidation.valid) {
                        throw new Error(`Error in input validation : ${inputValidation.message}`);
                    }
                    const hashedPassword = await bcrypt_1.default.hash(password, 10);
                    const updatedUser = await User_model_1.default.update({ password: hashedPassword }, { where: { id } }).then(async () => {
                        const updatedUser = await User_model_1.default.findByPk(id, { include: [{ model: Todos_model_1.default, as: "todos" }] });
                        if (!updatedUser) {
                            throw new Error("User not found after update");
                        }
                        return updatedUser;
                    }).catch((error) => {
                        throw new Error(`Error updating the user : ${error}`);
                    });
                    res.status(200).json(Response_1.CustomResponse.success((0, safeUser_1.returnSafeUser)(updatedUser), "User updated successfully", 200));
                }
                else {
                    // implement update with old password
                }
            }
            if (updatedValue === 'username') {
                const { newUsername } = req.body;
                if (!newUsername) {
                    throw new Error("New username required");
                }
                const inputValidation = (0, postUserValidation_1.validateUsername)(newUsername);
                if (!inputValidation.valid) {
                    throw new Error(`Error in input validation : ${inputValidation.message}`);
                }
                const isUsernameTaken = await User_model_1.default.findOne({ where: { username: newUsername } });
                if (isUsernameTaken) {
                    throw new Error("Username taken.");
                }
                const updatedUser = await User_model_1.default.update({ username: newUsername }, { where: { id } }).then(async () => {
                    const updatedUser = await User_model_1.default.findOne({ where: { username: newUsername }, include: [{ model: Todos_model_1.default, as: "todos" }] });
                    if (!updatedUser) {
                        throw new Error("User not found after update");
                    }
                    return updatedUser;
                }).catch((error) => {
                    throw new Error(`Error updating the user : ${error}`);
                });
                res
                    .status(200)
                    .json(Response_1.CustomResponse.success((0, safeUser_1.returnSafeUser)(updatedUser), "User updated successfully", 200));
            }
        }
        catch (error) {
            if (error instanceof Error) {
                if (error.message === "User not found") {
                    res
                        .status(404)
                        .json(Response_1.CustomResponse.error(error, 404));
                }
                else if (error.message === 'Password and repeat password are required') {
                    res
                        .status(400)
                        .json(Response_1.CustomResponse.error(error, 400, "Password and repeat password are required"));
                }
                else if (error.message === "User not found after update") {
                    res
                        .status(404)
                        .json(Response_1.CustomResponse.error(error, 404));
                }
                else if (error.message.includes("Error in input validation")) {
                    res
                        .status(403)
                        .json(Response_1.CustomResponse.error(error, 403, error.message));
                }
                else if (error.message === "Username taken.") {
                    res
                        .status(409)
                        .json(Response_1.CustomResponse.error(error, 409, "Username already taken"));
                }
                else if (error.message === 'New username required') {
                    res
                        .status(403)
                        .json(Response_1.CustomResponse.error(error, 403, "New username required"));
                }
                else {
                    console.log("🚀 ~ file: user.controller.ts:211 ~ UserController ~ updateUser ~ error:", error);
                    res
                        .status(500)
                        .json(Response_1.CustomResponse.error(error));
                }
            }
        }
    }
    static async deleteUser(req, res) {
        try {
            const { id } = req.params;
            const user = await User_model_1.default.findOne({
                where: {
                    id,
                },
            }).then((user) => {
                return user;
            }).catch((error) => {
                throw new Error(`Error finding the user : ${error}`);
            });
            if (!user) {
                throw new Error("User not found");
            }
            await User_model_1.default.destroy({
                where: {
                    id,
                },
            }).then(() => {
                res.status(200).json(Response_1.CustomResponse.success(null, "User deleted successfully", 204));
            }).catch((error) => {
                throw new Error(`Error deleting the user : ${error}`);
            });
        }
        catch (error) {
            if (error instanceof Error) {
                if (error.message === "User not found") {
                    res
                        .status(404)
                        .json(Response_1.CustomResponse.error(error, 404));
                }
                else {
                    res
                        .status(500)
                        .json(Response_1.CustomResponse.error(error));
                }
            }
        }
    }
}
;
exports.default = UserController;
