import {EventEmitter} from 'events';

import {IDomainEventSubscriber} from "../../../application/_common/interfaces/IDomainEventSubscriber";
import {IEventBus} from "../../../application/_common/interfaces/IEventBus";
import {DomainEvent} from "../../../domain/DomainEvent";

import {InMemoryBusConfig} from "./InMemoryBusConfig";

class InMemoryEventBus extends EventEmitter implements IEventBus {
    constructor() {
        super();
    }

    async publish(events: DomainEvent[]): Promise<void> {
        events.map((event) => {
            const res = this.emit(event.eventName, event);
        });
    }

    addSubscribers(subscribers: Array<IDomainEventSubscriber<DomainEvent>>): void {
        subscribers.forEach((subscriber) => {
            subscriber.subscribedTo().forEach((event) => {
                this.on(event.eventName, subscriber.on.bind(subscriber));
            });
        });
    }
}

let eventBus: InMemoryEventBus | null = null;

function getEventBus(): IEventBus {
    if (!eventBus) {
        eventBus = new InMemoryEventBus();
        InMemoryBusConfig.registerEvents(eventBus);
    }
    return eventBus;
}

export default getEventBus;
