import {IDomainEvent} from "../interfaces/IDomainEvent";

export abstract class DomainEvent{
    constructor(
        public readonly eventName: string,
        public readonly occurredOn: Date = new Date()) {
    }
}