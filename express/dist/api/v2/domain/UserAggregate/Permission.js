"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Permission = void 0;
class Permission {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
    static create(name) {
        return new Permission(Math.floor(Math.random() * 10000), name);
    }
    static mapToDomain(prismaPerm) {
        return new Permission(prismaPerm.id, prismaPerm.name);
    }
    equals(permission) {
        return permission.id === this.id;
    }
}
exports.Permission = Permission;
