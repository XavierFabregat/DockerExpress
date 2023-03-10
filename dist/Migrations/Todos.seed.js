"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.todos = void 0;
const uuid_1 = require("uuid");
const Todos_model_1 = __importDefault(require("../Models/Todos.model"));
const User_seed_1 = require("./User.seed");
const userId = User_seed_1.users.map((user) => user.id);
exports.todos = [
    {
        id: (0, uuid_1.v4)(),
        title: 'Learn Docker',
        description: 'Learn Docker and Docker Compose',
        userId: userId[0],
        completed: false,
    },
    {
        id: (0, uuid_1.v4)(),
        title: 'Learn Express',
        description: 'Learn Express and Sequelize',
        userId: userId[0],
        completed: false,
    },
    {
        id: (0, uuid_1.v4)(),
        title: 'Learn React',
        description: 'Learn React and Redux',
        userId: userId[0],
        completed: false,
    },
    {
        id: (0, uuid_1.v4)(),
        title: 'Learn Typescript',
        description: 'Learn Typescript and Node',
        userId: userId[0],
        completed: false,
    },
    {
        id: (0, uuid_1.v4)(),
        title: 'Learn GraphQL',
        description: 'Learn GraphQL and Apollo',
        userId: userId[1],
        completed: false,
    },
    {
        id: (0, uuid_1.v4)(),
        title: 'Learn Docker',
        description: 'Learn Docker and Docker Compose',
        userId: userId[1],
        completed: false,
    },
    {
        id: (0, uuid_1.v4)(),
        title: 'Learn Algorithms',
        description: 'Learn Algorithms and Data Structures',
        userId: userId[1],
        completed: false,
    },
    {
        id: (0, uuid_1.v4)(),
        title: 'Learn Buisness Analysis',
        description: 'Learn Buisness Analysis and Buisness Intelligence',
        userId: userId[2],
        completed: false,
    },
    {
        id: (0, uuid_1.v4)(),
        title: 'Study for the exam',
        description: 'Study for the exam and pass it',
        userId: userId[2],
        completed: false,
    },
    {
        id: (0, uuid_1.v4)(),
        title: 'Learn Docker',
        description: 'Learn Docker and Docker Compose',
        userId: userId[3],
        completed: false,
    },
    {
        id: (0, uuid_1.v4)(),
        title: 'Learn Koa',
        description: 'Learn Koa and Koa Router',
        userId: userId[3],
        completed: false,
    },
    {
        id: (0, uuid_1.v4)(),
        title: 'Learn Next',
        description: 'Learn Next and Next Router',
        userId: userId[3],
        completed: false,
    }
];
async function seedTodos() {
    try {
        const createdTodos = await Todos_model_1.default.bulkCreate(exports.todos);
        console.log(createdTodos);
    }
    catch (error) {
        console.log("🚀 ~ file: Todos.seed.ts:86 ~ seedTodos ~ error:", error);
    }
}
exports.default = seedTodos;
