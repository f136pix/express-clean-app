"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const errorHandler_1 = require("./infraestructure/_common/middlewares/errorHandler");
const AuthController_1 = __importDefault(require("./infraestructure/auth/controllers/AuthController"));
const v2Router = (0, express_1.Router)();
v2Router.use('/auth', AuthController_1.default.authRouter);
v2Router.use(errorHandler_1.errorHandler);
exports.default = v2Router;
