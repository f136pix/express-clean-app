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
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
prisma.$use((params, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (params.model === 'User' && (params.action === 'findUnique' || params.action === 'findMany')) {
        if (!params.args.where) {
            params.args.where = {};
        }
        if (params.args.where.deleted === undefined) {
            params.args.where.deleted = false;
        }
    }
    return next(params);
}));
exports.default = prisma;
