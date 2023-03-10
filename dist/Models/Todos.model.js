"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoClass = void 0;
const _1 = __importDefault(require("."));
const sequelize_1 = require("sequelize");
const User_model_1 = __importDefault(require("./User.model"));
class TodoClass extends sequelize_1.Model {
}
exports.TodoClass = TodoClass;
const Todo = _1.default.define('Todo', {
    id: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
    },
    title: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    completed: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    userId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'Users',
            key: 'id',
        }
    }
});
Todo.belongsTo(User_model_1.default, {
    foreignKey: 'userId',
    as: 'user',
    onDelete: 'CASCADE',
});
User_model_1.default.hasMany(Todo, {
    foreignKey: 'userId',
    onDelete: 'CASCADE',
    as: 'todos',
});
exports.default = Todo;
