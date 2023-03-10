'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Models_1 = __importDefault(require("./Models"));
const Routers_1 = __importDefault(require("./Routers"));
const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST || 'localhost';
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(Routers_1.default);
console.log(`Hello from Node.js ${process.version}!`);
console.log('Press Ctrl+C to quit.');
(async () => {
    try {
        await Models_1.default.authenticate();
        console.log('Connection has been established successfully.');
        await Models_1.default.sync({ force: true });
        console.log("All models were synchronized successfully.");
        app.listen(Number(PORT), HOST, () => {
            console.log(`Running on http://${HOST}:${PORT}`);
        });
    }
    catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();
