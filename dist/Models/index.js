"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("../config"));
let sequelize;
if (process.env.NODE_ENV !== 'production') {
    sequelize = new sequelize_1.Sequelize(config_1.default.docker.db_name, config_1.default.docker.db_username, config_1.default.docker.db_password, {
        host: 'localhost',
        dialect: 'postgres'
    });
}
else {
    sequelize = new sequelize_1.Sequelize(config_1.default.docker.connectionString);
}
exports.default = sequelize;
