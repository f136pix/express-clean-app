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
const authValidation_1 = require("../../../../v1/auth/authValidation");
const CreateUserCommand_1 = require("../../../application/auth/commands/CreateUserCommand");
const CreateUserCommandHandler_1 = __importDefault(require("../../../application/auth/commands/CreateUserCommandHandler"));
const CreateUserCommandHandler_2 = __importDefault(require("../../../application/auth/commands/CreateUserCommandHandler"));
const LoginUserQuery_1 = require("../../../application/auth/queries/LoginUserQuery");
const LoginUserQueryHandler_1 = __importDefault(require("../../../application/auth/queries/LoginUserQueryHandler"));
const asyncHandler_1 = __importDefault(require("../../_common/middlewares/asyncHandler"));
const schemaValidator_1 = __importDefault(require("../../_common/middlewares/schemaValidator"));
const errorOrExtensions_1 = require("../../_common/utils/errorOrExtensions");
class AuthController {
    constructor() {
        this.createUserCommandHandler = CreateUserCommandHandler_1.default;
        this.loginUserQueryHandler = LoginUserQueryHandler_1.default;
        this.authRouter = (0, express_1.Router)();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.authRouter.post('/register', (0, schemaValidator_1.default)(authValidation_1.authSignup), (0, asyncHandler_1.default)(this.Register.bind(this)));
        this.authRouter.post('/login', (0, schemaValidator_1.default)(authValidation_1.authSignin), (0, asyncHandler_1.default)(this.Login.bind(this)));
    }
    Login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = req.body;
            const query = new LoginUserQuery_1.LoginUserQuery(data.email, data.password);
            const ret = yield this.loginUserQueryHandler.handle(query);
            (0, errorOrExtensions_1.handleErrorOr)(ret, resData => {
                const response = {
                    message: 'User logged in successfully',
                    data: {
                        user: {
                            email: resData.user.email,
                            name: resData.user.name
                        },
                        jwt: resData.jwt
                    }
                };
                res.status(200).json(response);
            }, error => next(error));
        });
    }
    Register(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = req.body;
            const command = new CreateUserCommand_1.CreateUserCommand(data.name, data.email, data.password);
            const ret = yield CreateUserCommandHandler_2.default.handle(command);
            (0, errorOrExtensions_1.handleErrorOr)(ret, resData => {
                const response = {
                    message: 'User created successfully',
                    data: {
                        user: {
                            email: resData.user.email,
                            name: resData.user.name
                        },
                        jwt: resData.jwt
                    }
                };
                res.status(201).json(response);
            }, error => next(error));
        });
    }
}
exports.default = new AuthController();
