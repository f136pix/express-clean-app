import prismaClient from "../../../../../../prismaClient";
import {PrismaClient} from "@prisma/client";
import {Role} from "../../../../domain/UserAggregate/Role";
import {Permission} from "../../../../domain/UserAggregate/Permission";

class RoleRepository {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = prismaClient;
    }

    async createRole(role: Role): Promise<Role> {
        const createdRole = await this.prisma.role.create({
            data: {
                name: role.name,
                permissions: {
                    connect: role.permissions.map((permission) => ({id: permission.id}))
                }
            },
            include: {
                permissions: true
            }
        })

        return role;
    };

    async findRoleById(roleId: number): Promise<Role | null> {
        const prismaRole = await this.prisma.role.findUnique({
            where: { id: roleId },
            include: { permissions: true }
        });

        if(!prismaRole) return null;
        const permissionsList: Permission[] | undefined = []

        prismaRole.permissions.forEach((permission) => {
            permissionsList.push(Permission.mapToDomain(permission))
        })

        return new Role(prismaRole.id, prismaRole.name, permissionsList ? permissionsList : undefined);
    }
}

export default new RoleRepository();