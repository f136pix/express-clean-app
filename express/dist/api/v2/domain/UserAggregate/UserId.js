"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserId = void 0;
const IdValueObject_1 = require("../_common/models/IdValueObject");
class UserId extends IdValueObject_1.IVO {
    constructor(id) {
        super(id);
    }
    static createNew() {
        return new UserId(Math.floor(Math.random() * 10000));
    }
    static toUserId(id) {
        return new UserId(id);
    }
}
exports.UserId = UserId;
