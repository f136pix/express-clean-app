import { Permission } from './Permission';

export class Role {
    public id: number;
    public name: string;
    public permissions: Permission[] = [];

    constructor(id: number, name: string, permissions?: Permission[]) {
        this.id = id;
        this.name = name;
        this.permissions = permissions ?? [];
    }

    public static create(name: string): Role {
        return new Role(Math.floor(Math.random() * 10000), name);
    }

    public assignPermission(permission: Permission): void {
        if (!this.hasPermission(permission)) {
            this.permissions.push(permission);
        }
    }

    public hasPermission(permission: Permission): boolean {
        return this.permissions.some(p => p.equals(permission));
    }
}
