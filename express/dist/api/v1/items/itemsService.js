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
const prismaClient_1 = __importDefault(require("../../../prismaClient"));
const BadRequestError_1 = require("../_common/exceptions/BadRequestError");
class itemsService {
    get() {
        return __awaiter(this, void 0, void 0, function* () {
            const items = yield prismaClient_1.default.item.findMany();
            return items;
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof data.userId === 'number') {
                const userClient = yield prismaClient_1.default.user.findUnique({
                    where: {
                        id: data.userId,
                    },
                });
                if (!userClient) {
                    throw new Error('User not found');
                }
                return yield prismaClient_1.default.item.create({
                    data: {
                        name: data.name,
                        userId: userClient.id
                    },
                    include: {
                        user: false
                    }
                });
            }
            return yield prismaClient_1.default.item.create({
                data: {
                    name: data.name,
                },
                include: {
                    user: false
                }
            });
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const item = yield prismaClient_1.default.item.findUnique({
                where: {
                    id: id
                },
            });
            if (!item) {
                throw new BadRequestError_1.BadRequestError("Item with provided Id was not found");
            }
            return yield prismaClient_1.default.item.delete({
                where: {
                    id: id
                }
            });
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const [item, user] = yield Promise.all([
                prismaClient_1.default.item.findUnique({ where: { id } }),
                prismaClient_1.default.user.findUnique({ where: { id: data.userId } })
            ]);
            if (!item) {
                throw new BadRequestError_1.BadRequestError("Item with provided Id was not found");
            }
            if (!user) {
                throw new BadRequestError_1.BadRequestError("User with provided Id does not exist");
            }
            return yield yield prismaClient_1.default.item.update({
                where: { id },
                data,
            });
        });
    }
}
exports.default = new itemsService();
