import {User as UserPrisma} from "@prisma/client"; // Import Prisma's Permission type

import {Item} from "./Item";
import {Role} from "./Role";
import {UserId} from "./UserId";

export class User {

    constructor(id: UserId, name: string, email: string, password: string, role?: Role) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.deleted = false;
        this.role = role;
        this.items = [];
    }

    public id: UserId;
    public name: string;
    public email: string;
    public password: string;
    public deleted: boolean;
    public role?: Role;
    public items?: Item[] = [];

    public static create(name: string, email: string, password: string, role: Role): User {
        return new User(
            UserId.createNew(),
            name,
            email,
            password,
            role
        );
    }

    public static toDomain(user : UserPrisma) {
        return new User(UserId.toUserId(user.id),user.name, user.email, user.password, undefined);
    }

    public assignRole(role: Role): void {
        this.role = role;
    }

}