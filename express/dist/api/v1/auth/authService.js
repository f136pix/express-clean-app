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
exports.authService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const prismaClient_1 = __importDefault(require("../../../prismaClient"));
const BadRequestError_1 = require("../_common/exceptions/BadRequestError");
const NotFoundError_1 = require("../_common/exceptions/NotFoundError");
const UnauthorizedError_1 = require("../_common/exceptions/UnauthorizedError");
const jwtService_1 = __importDefault(require("../_common/services/jwtService"));
class authServiceClass {
    login(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield prismaClient_1.default.user.findUnique({
                where: {
                    email: data.email
                }, include: {
                    role: true
                }
            });
            if (!user) {
                throw new NotFoundError_1.NotFoundError('User with this email does not exists');
            }
            const isValidPassword = yield bcrypt_1.default.compare(data.password, user.password);
            if (!isValidPassword) {
                throw new UnauthorizedError_1.UnauthorizedError('Invalid password');
            }
            const jwt = jwtService_1.default.sign({ id: user.id, role: user.role.name }, '1h');
            return {
                user: user,
                jwt: jwt
            };
        });
    }
    register(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield prismaClient_1.default.user.findUnique({
                where: {
                    email: data.email
                }
            });
            if (user) {
                throw new NotFoundError_1.NotFoundError('User already exists');
            }
            const roleName = "user";
            const saltRounds = 10;
            const hashedPassword = yield bcrypt_1.default.hash(data.password, saltRounds);
            const CreatedUser = yield prismaClient_1.default.user.create({
                data: {
                    email: data.email,
                    name: data.name,
                    password: hashedPassword,
                    role: {
                        connect: {
                            name: roleName
                        }
                    }
                },
            });
            const jwt = jwtService_1.default.sign({ id: CreatedUser.id, role: roleName }, '1h');
            return {
                user: CreatedUser,
                jwt: jwt
            };
        });
    }
    updateRole(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const role = yield prismaClient_1.default.role.findUnique({
                where: {
                    name: data.role
                }
            });
            if (!role) {
                throw new BadRequestError_1.BadRequestError("The provided Role does not exists");
            }
            const user = yield prismaClient_1.default.user.findUnique({
                where: {
                    id: data.id
                }
            });
            if (!user) {
                throw new BadRequestError_1.BadRequestError("User with the provided Id does not exists");
            }
            const updatedUser = yield prismaClient_1.default.user.update({
                where: {
                    id: data.id,
                },
                data: {
                    roleId: role.id
                }
            });
            return updatedUser;
        });
    }
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield prismaClient_1.default.user.findUnique({
                where: {
                    id: id
                }
            });
            if (!user) {
                throw new NotFoundError_1.NotFoundError("User with the provided Id does not exists");
            }
            // Performs soft delete
            return yield prismaClient_1.default.user.update({
                where: {
                    id: id
                },
                data: {
                    deleted: true
                }
            });
        });
    }
}
exports.authService = new authServiceClass();
