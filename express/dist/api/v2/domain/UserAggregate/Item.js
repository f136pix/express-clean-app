"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Item = void 0;
class Item {
    constructor(id, name, user, createdAt) {
        this._id = id;
        this._name = name;
        this._user = user;
        this._createdAt = createdAt;
    }
    static create(name, user) {
        return new Item(Math.floor(Math.random() * 10000), name, user, new Date());
    }
    assignUser(user) {
        this._user = user;
    }
}
exports.Item = Item;
