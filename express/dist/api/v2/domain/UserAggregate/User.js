"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const UserId_1 = require("./UserId");
class User {
    constructor(id, name, email, password, role) {
        this.items = [];
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.deleted = false;
        this.role = role;
        this.items = [];
    }
    static create(name, email, password, role) {
        return new User(UserId_1.UserId.createNew(), name, email, password, role);
    }
    static toDomain(user) {
        return new User(UserId_1.UserId.toUserId(user.id), user.name, user.email, user.password, undefined);
    }
    assignRole(role) {
        this.role = role;
    }
}
exports.User = User;
