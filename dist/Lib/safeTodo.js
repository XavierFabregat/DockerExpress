"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.safeTodos = exports.safeTodo = void 0;
const safeUser_1 = require("./safeUser");
const safeTodo = (todo) => {
    const { id, title, description, completed, userId, createdAt, updatedAt, user } = todo;
    const safeUser = user && (0, safeUser_1.returnSafeUser)(user);
    const safeTodo = { id, title, description, completed, userId, createdAt, updatedAt, user: safeUser };
    return safeTodo;
};
exports.safeTodo = safeTodo;
const safeTodos = (todos) => {
    return todos.map(exports.safeTodo);
};
exports.safeTodos = safeTodos;
