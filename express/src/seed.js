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
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const adminRole = yield prisma.role.create({
            data: {
                name: 'admin',
            },
        });
        const userRole = yield prisma.role.create({
            data: {
                name: 'user',
            },
        });
        yield prisma.permission.create({
            data: {
                name: 'get:items',
                roles: {
                    connect: [
                        { id: adminRole.id },
                        { id: userRole.id }
                    ],
                },
            }
        });
        yield prisma.permission.create({
            data: {
                name: 'create:items',
                roles: {
                    connect: [
                        { id: adminRole.id },
                    ],
                },
            }
        });
        yield prisma.permission.create({
            data: {
                name: 'delete:items',
                roles: {
                    connect: [
                        { id: adminRole.id },
                    ],
                },
            }
        });
        yield prisma.permission.create({
            data: {
                name: 'update:items',
                roles: {
                    connect: [
                        { id: adminRole.id },
                    ],
                },
            }
        });
        yield prisma.permission.create({
            data: {
                name: 'update:users',
                roles: {
                    connect: [
                        { id: adminRole.id },
                    ],
                },
            }
        });
    });
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$disconnect();
}));
