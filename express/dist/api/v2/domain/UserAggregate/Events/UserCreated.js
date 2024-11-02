"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserCreatedDomainEvent = void 0;
const DomainEvent_1 = require("../../DomainEvent");
class UserCreatedDomainEvent extends DomainEvent_1.DomainEvent {
    constructor(userId, name, email) {
        super('UserCreated');
        this.userId = userId;
        this.name = name;
        this.email = email;
    }
}
exports.UserCreatedDomainEvent = UserCreatedDomainEvent;
UserCreatedDomainEvent.eventName = 'UserCreated';
