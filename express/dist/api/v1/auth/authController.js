"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const asyncHandler_1 = __importDefault(require("../_common/middlewares/asyncHandler"));
const rbacMiddleware_1 = require("../_common/middlewares/rbacMiddleware");
const schemaValidator_1 = __importDefault(require("../_common/middlewares/schemaValidator"));
const authService_1 = require("./authService");
const authValidation_1 = require("./authValidation");
const authController = (0, express_1.Router)();
authController.post('/login', (0, schemaValidator_1.default)(authValidation_1.authSignin), (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const ret = yield authService_1.authService.login(req.body);
    const response = {
        message: 'Login Succefful',
        data: ret
    };
    res.json(response);
})));
authController.post('/register', (0, schemaValidator_1.default)(authValidation_1.authSignup), (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const ret = yield authService_1.authService.register(req.body);
    const response = {
        message: 'User created successfully',
        data: {
            user: {
                email: ret.user.email,
                name: ret.user.name,
            },
            jwt: ret.jwt
        }
    };
    res.json(response);
})));
authController.post('/:id/role', (0, rbacMiddleware_1.checkPermission)("update:users"), (0, schemaValidator_1.default)(authValidation_1.roleSchema), (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const ret = yield authService_1.authService.updateRole({ id: Number(req.params.id), role: req.body.role });
    const response = {
        message: "User Updated successfully",
        data: ret
    };
    res.json(response);
})));
authController.delete('/:id', (0, rbacMiddleware_1.checkPermission)("delete:users"), (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const ret = yield authService_1.authService.deleteUser(Number(req.params.id));
    const response = {
        message: "User deleted successfully",
        data: ret
    };
    res.json(response);
})));
exports.default = authController;
