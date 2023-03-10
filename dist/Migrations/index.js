"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_seed_1 = __importDefault(require("./User.seed"));
const Todos_seed_1 = __importDefault(require("./Todos.seed"));
async function seed() {
    try {
        await (0, User_seed_1.default)();
        await (0, Todos_seed_1.default)();
    }
    catch (error) {
        console.log("🚀 ~ file: index.ts:19 ~ seed ~ error", error);
    }
}
;
seed();
