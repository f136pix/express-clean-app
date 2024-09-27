import {EventEmitter} from 'events';
import {DomainEvent} from "../../../domain/DomainEvent";
import {IDomainEventSubscriber} from "../../../application/_common/interfaces/IDomainEventSubscriber";
import {IEventBus} from "../../../application/_common/interfaces/IEventBus";
import {SendEmailOnUserCreated} from "../../../application/auth/events/SendEmailOnUserCreated";

class InMemoryEventBus extends EventEmitter implements IEventBus {
    constructor() {
        super();


    }

    async publish(events: DomainEvent[]): Promise<void> {
        events.map((event) => {
            console.log(event.eventName)
            const res = this.emit(event.eventName, event)
            // const res = this.emit("OLA", event)
        });
    }

    addSubscribers(subscribers: Array<IDomainEventSubscriber<DomainEvent>>): void {
        subscribers.forEach((subscriber) => {
            subscriber.subscribedTo().forEach((event) => {
                console.log(event)
                this.on(event.eventName, subscriber.on.bind(subscriber));
            });
        });
    }
}

let eventBus: InMemoryEventBus | null = null;

function getEventBus() : IEventBus {
    if (!eventBus) {
        eventBus = new InMemoryEventBus();
        const sendEmailOnUserCreated = new SendEmailOnUserCreated();
        eventBus.addSubscribers([sendEmailOnUserCreated]);
        console.log(sendEmailOnUserCreated.subscribedTo()[0].eventName)
    }
    return eventBus;
}

export default getEventBus;
