"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const errorHandler_1 = require("./_common/middlewares/errorHandler");
const authController_1 = __importDefault(require("./auth/authController"));
const itemsController_1 = __importDefault(require("./items/itemsController"));
const v1Router = (0, express_1.Router)();
v1Router.use('/auth', authController_1.default);
v1Router.use('/items', itemsController_1.default);
v1Router.use(errorHandler_1.errorHandler);
exports.default = v1Router;
