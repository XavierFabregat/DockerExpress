"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.returnSafeUsers = exports.returnSafeUser = void 0;
function returnSafeUser(user) {
    const { username, todos, avatarUrl, createdAt, updatedAt, id } = user;
    const userWithoutPassword = { id, username, avatarUrl, createdAt, updatedAt, todos };
    return userWithoutPassword;
}
exports.returnSafeUser = returnSafeUser;
function returnSafeUsers(users) {
    const usersWithoutPassword = users.map(returnSafeUser);
    console.log(usersWithoutPassword);
    return usersWithoutPassword;
}
exports.returnSafeUsers = returnSafeUsers;
