"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserClass = void 0;
const _1 = __importDefault(require("."));
const sequelize_1 = require("sequelize");
class UserClass extends sequelize_1.Model {
}
exports.UserClass = UserClass;
const User = _1.default.define('User', {
    id: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
    },
    username: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    avatarUrl: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
});
exports.default = User;
