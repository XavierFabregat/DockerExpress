"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("../config"));
const { NODE_ENV, LOCAL, DATABASE_URL } = process.env;
const sequelize = LOCAL
    ? new sequelize_1.Sequelize(NODE_ENV === 'TEST' ? config_1.default.test.connectionString : config_1.default.development.connectionString, {
        dialectOptions: {
            host: 'localhost',
            port: 5432,
            dialect: 'postgres',
        },
        logging: false
    })
    : new sequelize_1.Sequelize(DATABASE_URL || config_1.default.development.connectionString, {
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false,
            }
        }
    });
exports.default = sequelize;
