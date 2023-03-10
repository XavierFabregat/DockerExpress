"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ViewsController = void 0;
const handlebars_1 = __importDefault(require("handlebars"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const Response_1 = require("../Lib/Response");
class ViewsController {
    static async renderIndex(req, res) {
        try {
            const _html = fs_1.default.readFileSync(path_1.default.join(__dirname, "../../Views/index.html"), "utf8");
            const template = handlebars_1.default.compile(_html);
            const html = template({ PORT: process.env.PORT || 8080 });
            res.status(200).send(html);
        }
        catch (error) {
            console.log("🚀 ~ file: views.controller.ts:15 ~ ViewsController ~ renderIndex ~ error:", error);
            if (error instanceof Error) {
                res.status(500).json(Response_1.CustomResponse.error(error, 500, error.message));
            }
        }
    }
}
exports.ViewsController = ViewsController;
