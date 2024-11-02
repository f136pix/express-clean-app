"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DomainEvent = void 0;
class DomainEvent {
    constructor(eventName, occurredOn = new Date()) {
        this.eventName = eventName;
        this.occurredOn = occurredOn;
    }
}
exports.DomainEvent = DomainEvent;
