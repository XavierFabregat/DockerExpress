"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = __importDefault(require("../Controllers/user.controller"));
const todo_controller_1 = __importDefault(require("../Controllers/todo.controller"));
const apiRouter = (0, express_1.Router)();
// User routes 
apiRouter.get("/users", user_controller_1.default.getUsers);
apiRouter.post("/users", user_controller_1.default.postUser);
apiRouter.get("/users/:id", user_controller_1.default.getUserById);
apiRouter.patch("/users/:id/:updatedValue", user_controller_1.default.updateUser);
apiRouter.delete("/users/:id", user_controller_1.default.deleteUser);
// Todo routes
apiRouter.get("/todos", todo_controller_1.default.getTodos);
apiRouter.post("/todos", todo_controller_1.default.postTodo);
apiRouter.get("/todos/:id", todo_controller_1.default.getTodoById);
apiRouter.patch("/todos/:id", todo_controller_1.default.updateTodo);
apiRouter.delete("/todos/:id", todo_controller_1.default.deleteTodo);
apiRouter.patch("/todos/:id/complete", todo_controller_1.default.completeTodo);
exports.default = apiRouter;
