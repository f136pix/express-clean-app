"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Role = void 0;
class Role {
    constructor(id, name, permissions) {
        this.permissions = [];
        this.id = id;
        this.name = name;
        this.permissions = permissions !== null && permissions !== void 0 ? permissions : [];
    }
    static create(name) {
        return new Role(Math.floor(Math.random() * 10000), name);
    }
    assignPermission(permission) {
        if (!this.hasPermission(permission)) {
            this.permissions.push(permission);
        }
    }
    hasPermission(permission) {
        return this.permissions.some(p => p.equals(permission));
    }
}
exports.Role = Role;
