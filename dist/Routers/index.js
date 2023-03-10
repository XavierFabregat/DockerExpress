"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const apiRouter_1 = __importDefault(require("./apiRouter"));
const views_controller_1 = require("../Controllers/views.controller");
const router = (0, express_1.Router)();
router.get('/', views_controller_1.ViewsController.renderIndex);
router.use('/api', apiRouter_1.default);
router.use('*', (req, res) => {
    res.status(404).json({ message: "Not found" });
});
exports.default = router;
