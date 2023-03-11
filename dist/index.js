'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Models_1 = __importDefault(require("./Models"));
const app_1 = __importDefault(require("./app"));
const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST || '0.0.0.0';
console.log(`Hello from Node.js ${process.version}!`);
console.log('Press Ctrl+C to quit.');
(async () => {
    try {
        await Models_1.default.authenticate();
        console.log('Connection has been established successfully.');
        await Models_1.default.sync({ force: true });
        console.log("All models were synchronized successfully.");
        app_1.default.listen(Number(PORT), HOST, () => {
            console.log(`Running on http://${HOST}:${PORT}`);
        });
    }
    catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();
