import {Permission as PrismaPermission} from "@prisma/client"; // Import Prisma's Permission type


export class Permission {
    public id: number;
    public name: string;

    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }

    public static create(name: string): Permission {
        return new Permission(Math.floor(Math.random() * 10000), name);
    }

    public static mapToDomain(prismaPerm: PrismaPermission) {
        return new Permission(prismaPerm.id, prismaPerm.name);
    }

    public equals(permission: Permission): boolean {
        return permission.id === this.id;
    }
}
