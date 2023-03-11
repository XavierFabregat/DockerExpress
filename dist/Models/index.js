"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("../config"));
const sequelize = process.env.LOCAL
    ? new sequelize_1.Sequelize(config_1.default.development.connectionString, {
        dialectOptions: {
            host: 'localhost',
            port: 5432,
            dialect: 'postgres',
        }
    })
    : new sequelize_1.Sequelize(process.env.DATABASE_URL || config_1.default.development.connectionString, {
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false,
            }
        }
    });
exports.default = sequelize;
