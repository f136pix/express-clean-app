import {DomainEvent} from "../../../domain/DomainEvent";

import {IDomainEventSubscriber} from "./IDomainEventSubscriber";

export interface IEventBus {
    publish(events: DomainEvent[]): Promise<void>;
    addSubscribers(subscribers: Array<IDomainEventSubscriber<DomainEvent>>): void;
}