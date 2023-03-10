"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Response_1 = require("../Lib/Response");
const Todos_model_1 = __importDefault(require("../Models/Todos.model"));
const User_model_1 = __importDefault(require("../Models/User.model"));
const uuid_1 = require("uuid");
const safeTodo_1 = require("../Lib/safeTodo");
class TodoController {
    static async getTodos(req, res) {
        try {
            const todos = await Todos_model_1.default.findAll({
                include: [{ model: User_model_1.default, as: "user" }],
            }).then((todos) => {
                return todos;
            }).catch((error) => {
                throw new Error(`Error finding the todos : ${error}`);
            });
            if (todos.length === 0) {
                throw new Error("No todos found");
            }
            res.status(200).json(Response_1.CustomResponse.success((0, safeTodo_1.safeTodos)(todos)));
        }
        catch (error) {
            console.log("🚀 ~ file: todo.controller.ts:24 ~ TodoController ~ getTodos ~ error:", error);
            if (error instanceof Error) {
                if (error.message === "No todos found") {
                    res.status(404).json(Response_1.CustomResponse.error(error, 404, error.message));
                }
                else if (error.message.includes("Error finding the todos")) {
                    res.status(404).json(Response_1.CustomResponse.error(error, 500, error.message));
                }
                else {
                    res.status(500).json(Response_1.CustomResponse.error(error));
                }
            }
        }
    }
    static async postTodo(req, res) {
        try {
            const { title, description, userId } = req.body;
            if (!title || !description || !userId) {
                throw new Error("Title, description and userId are required");
            }
            ;
            const doesUserExist = await User_model_1.default.findByPk(userId).then((user) => {
                return user;
            }).catch((error) => {
                throw new Error(`Error finding the user : ${error}`);
            });
            if (!doesUserExist) {
                throw new Error("User does not exist");
            }
            const id = (0, uuid_1.v4)();
            const todo = await Todos_model_1.default.create({
                id,
                title,
                description,
                completed: false,
                userId,
            }).then(async (todo) => {
                const todoCreated = await Todos_model_1.default.findByPk(todo.id, {
                    include: [{ model: User_model_1.default, as: "user" }],
                });
                if (!todoCreated) {
                    throw new Error("Error creating the todo");
                }
                return todoCreated;
            }).catch((error) => {
                throw new Error(`Error creating the todo : ${error}`);
            });
            res.status(200).json(Response_1.CustomResponse.success((0, safeTodo_1.safeTodo)(todo)));
        }
        catch (error) {
            console.log("🚀 ~ file: todo.controller.ts:60 ~ TodoController ~ error:", error);
            if (error instanceof Error) {
                if (error.message.includes("Error creating the todo")) {
                    res.status(409).json(Response_1.CustomResponse.error(error, 500, error.message));
                }
                else if (error.message === "User does not exist") {
                    res.status(404).json(Response_1.CustomResponse.error(error, 404, error.message));
                }
                else if (error.message === "Title, description and userId are required") {
                    res.status(400).json(Response_1.CustomResponse.error(error, 400, error.message));
                }
                else if (error.message.includes("Error finding the user")) {
                    res.status(404).json(Response_1.CustomResponse.error(error, 500, error.message));
                }
                else {
                    res.status(500).json(Response_1.CustomResponse.error(error));
                }
            }
        }
    }
    static async getTodoById(req, res) {
        try {
            const { id } = req.params;
            const todo = await Todos_model_1.default.findByPk(id, {
                include: [{ model: User_model_1.default, as: "user" }],
            }).then((todo) => {
                return todo;
            }).catch((error) => {
                throw new Error(`Error finding the todo : ${error}`);
            });
            if (!todo) {
                throw new Error("Todo does not exist");
            }
            res.status(200).json(Response_1.CustomResponse.success((0, safeTodo_1.safeTodo)(todo)));
        }
        catch (error) {
            console.log("🚀 ~ file: todo.controller.ts:106 ~ TodoController ~ getTodo ~ error:", error);
            if (error instanceof Error) {
                if (error.message.includes("Error finding the todo")) {
                    res.status(404).json(Response_1.CustomResponse.error(error, 500, error.message));
                }
                else if (error.message === "Todo does not exist") {
                    res.status(404).json(Response_1.CustomResponse.error(error, 404, error.message));
                }
                else {
                    res.status(500).json(Response_1.CustomResponse.error(error));
                }
            }
        }
    }
    static async updateTodo(req, res) {
        try {
            const { id } = req.params;
            const { title, description, completed } = req.body;
            const todo = await Todos_model_1.default.findByPk(id).then((todo) => {
                return todo;
            }).catch((error) => {
                throw new Error(`Error finding the todo : ${error}`);
            });
            if (!todo) {
                throw new Error("Todo does not exist");
            }
            const todoUpdated = await Todos_model_1.default.update({
                title,
                description,
                completed: completed || false,
            }, {
                where: {
                    id,
                },
            }).then(async (todo) => {
                const todoUpdated = await Todos_model_1.default.findByPk(id, {
                    include: [{ model: User_model_1.default, as: "user" }],
                });
                if (!todoUpdated) {
                    throw new Error("Error updating the todo");
                }
                return todoUpdated;
            }).catch((error) => {
                throw new Error(`Error updating the todo : ${error}`);
            });
            if (!todoUpdated) {
                throw new Error("Error updating the todo");
            }
            res.status(200).json(Response_1.CustomResponse.success((0, safeTodo_1.safeTodo)(todoUpdated), "Todo updated"));
        }
        catch (error) {
            console.log("🚀 ~ file: todo.controller.ts:161 ~ TodoController ~ updateTodo ~ error:", error);
            if (error instanceof Error) {
                if (error.message.includes("Error updating the todo")) {
                    res.status(409).json(Response_1.CustomResponse.error(error, 500, error.message));
                }
                else if (error.message.includes("Error finding the todo")) {
                    res.status(404).json(Response_1.CustomResponse.error(error, 500, error.message));
                }
                else if (error.message === "Todo does not exist") {
                    res.status(404).json(Response_1.CustomResponse.error(error, 404, error.message));
                }
                else {
                    res.status(500).json(Response_1.CustomResponse.error(error));
                }
            }
        }
    }
    static async deleteTodo(req, res) {
        try {
            const { id } = req.params;
            const todo = await Todos_model_1.default.findByPk(id).then((todo) => {
                return todo;
            }).catch((error) => {
                throw new Error(`Error finding the todo : ${error}`);
            });
            if (!todo) {
                throw new Error("Todo does not exist");
            }
            const todoDeleted = await Todos_model_1.default.destroy({
                where: {
                    id,
                },
            }).then((todo) => {
                return todo;
            }).catch((error) => {
                throw new Error(`Error deleting the todo : ${error}`);
            });
            if (!todoDeleted) {
                throw new Error("Error deleting the todo");
            }
            res.status(200).json(Response_1.CustomResponse.success(null, "Todo deleted", 204));
        }
        catch (error) {
            console.log("🚀 ~ file: todo.controller.ts:166 ~ TodoController ~ deleteTodo ~ error:", error);
            if (error instanceof Error) {
                if (error.message.includes("Error deleting the todo")) {
                    res.status(404).json(Response_1.CustomResponse.error(error, 500, error.message));
                }
                else if (error.message === "Todo does not exist") {
                    res.status(404).json(Response_1.CustomResponse.error(error, 404, error.message));
                }
                else if (error.message.includes("Error finding the todo")) {
                    res.status(404).json(Response_1.CustomResponse.error(error, 500, error.message));
                }
                else {
                    res.status(500).json(Response_1.CustomResponse.error(error));
                }
            }
        }
    }
    static async completeTodo(req, res) {
        try {
            const { id } = req.params;
            const todo = await Todos_model_1.default.findByPk(id).then((todo) => {
                return todo;
            }).catch((error) => {
                throw new Error(`Error finding the todo : ${error}`);
            });
            if (!todo) {
                throw new Error("Todo does not exist");
            }
            const todoCompleted = await Todos_model_1.default.update({
                completed: true,
            }, {
                where: {
                    id,
                },
            }).then((todo) => {
                return todo;
            }).catch((error) => {
                throw new Error(`Error completing the todo : ${error}`);
            });
            if (!todoCompleted) {
                throw new Error("Error completing the todo");
            }
            res.status(200).json(Response_1.CustomResponse.success((0, safeTodo_1.safeTodo)(todo), "Todo completed"));
        }
        catch (error) {
            console.log("🚀 ~ file: todo.controller.ts:165 ~ TodoController ~ completeTodo ~ error:", error);
            if (error instanceof Error) {
                if (error.message.includes("Error completing the todo")) {
                    res.status(409).json(Response_1.CustomResponse.error(error, 500, error.message));
                }
                else if (error.message === "Todo does not exist") {
                    res.status(404).json(Response_1.CustomResponse.error(error, 404, error.message));
                }
                else if (error.message.includes("Error finding the todo")) {
                    res.status(404).json(Response_1.CustomResponse.error(error, 500, error.message));
                }
                else {
                    res.status(500).json(Response_1.CustomResponse.error(error));
                }
            }
        }
    }
}
exports.default = TodoController;
