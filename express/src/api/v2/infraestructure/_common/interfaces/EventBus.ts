import {DomainEvent} from "../models/DomainEvent";
import {IDomainEventSubscriber} from "./IDomainEventSubscriber";

export interface EventBus {
    publish(events: DomainEvent[]): Promise<void>;
    addSubscribers(subscribers: Array<IDomainEventSubscriber<DomainEvent>>): void;
}