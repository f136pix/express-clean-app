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
const prismaClient_1 = __importDefault(require("../../../../../../prismaClient"));
const User_1 = require("../../../../domain/UserAggregate/User");
class UserRepository {
    constructor() {
        this.prisma = prismaClient_1.default;
    }
    addAsync(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const createdUser = yield this.prisma.user.create({
                data: {
                    name: user.name,
                    email: user.email,
                    password: user.password,
                    roleId: user.role.id,
                    deleted: false,
                }
            });
            return User_1.User.toDomain(createdUser);
        });
    }
    // Find a user by email
    findByEmailAsync(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const prismaUser = yield this.prisma.user.findUnique({
                where: { email }
            });
            if (!prismaUser)
                return null;
            return User_1.User.toDomain(prismaUser);
        });
    }
}
exports.default = new UserRepository();
