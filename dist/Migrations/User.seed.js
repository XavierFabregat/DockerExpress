"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.users = void 0;
const User_model_1 = __importDefault(require("../Models/User.model"));
const uuid_1 = require("uuid");
const bcrypt_1 = __importDefault(require("bcrypt"));
exports.users = [
    {
        id: (0, uuid_1.v4)(),
        username: "admin",
        password: bcrypt_1.default.hashSync("admin", 10),
        avatarUrl: "https://i.imgur.com/4YK1Y0x.png",
    },
    {
        id: (0, uuid_1.v4)(),
        username: "user",
        password: bcrypt_1.default.hashSync("user", 10),
        avatarUrl: "https://i.imgur.com/4YK1Y0x.png",
    },
    {
        id: (0, uuid_1.v4)(),
        username: "guest",
        password: bcrypt_1.default.hashSync("guest", 10),
        avatarUrl: "https://i.imgur.com/4YK1Y0x.png",
    },
    {
        id: (0, uuid_1.v4)(),
        username: "test",
        password: bcrypt_1.default.hashSync("test", 10),
        avatarUrl: "https://i.imgur.com/4YK1Y0x.png",
    },
];
async function seedUsers() {
    try {
        const createdUsers = await User_model_1.default.bulkCreate(exports.users);
        console.log(createdUsers);
    }
    catch (error) {
        console.log("🚀 ~ file: User.seed.ts:37 ~ seedUsers ~ error:", error);
    }
}
exports.default = seedUsers;
;
