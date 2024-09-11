import {UserId} from "./UserId";
import {Role} from "./Role";
import {Item} from "./Item";

export class User {

    constructor(id: UserId, name: string, email: string, password: string, role: Role) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password
        this.deleted = false;
        this.role = role;
        this.items = []
    }

    public id: UserId;
    public name: string;
    public email: string;
    public password: string;
    public deleted: boolean;
    public role: Role;
    public items: Item[] = []

    public static create(name: string, email: string, password: string, role: Role): User {
        return new User(
            UserId.createNew(),
            name,
            email,
            password,
            role
        );
    }

    public assignRole(role: Role): void {
        this.role = role;
    }

}