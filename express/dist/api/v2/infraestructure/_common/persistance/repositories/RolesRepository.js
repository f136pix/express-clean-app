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
const Permission_1 = require("../../../../domain/UserAggregate/Permission");
const Role_1 = require("../../../../domain/UserAggregate/Role");
class RoleRepository {
    constructor() {
        this.prisma = prismaClient_1.default;
    }
    createRole(role) {
        return __awaiter(this, void 0, void 0, function* () {
            const createdRole = yield this.prisma.role.create({
                data: {
                    name: role.name,
                    permissions: {
                        connect: role.permissions.map((permission) => ({ id: permission.id }))
                    }
                },
                include: {
                    permissions: true
                }
            });
            return role;
        });
    }
    findRoleById(roleId) {
        return __awaiter(this, void 0, void 0, function* () {
            const prismaRole = yield this.prisma.role.findUnique({
                where: { id: roleId },
                include: { permissions: true }
            });
            if (!prismaRole)
                return null;
            const permissionsList = [];
            prismaRole.permissions.forEach((permission) => {
                permissionsList.push(Permission_1.Permission.mapToDomain(permission));
            });
            return new Role_1.Role(prismaRole.id, prismaRole.name, permissionsList ? permissionsList : undefined);
        });
    }
}
exports.default = new RoleRepository();
