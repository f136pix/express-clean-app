import {EventEmitter} from 'events';
import {DomainEvent} from "./DomainEvent";
import {IDomainEventSubscriber} from "../interfaces/IDomainEventSubscriber";
import {EventBus} from "../interfaces/EventBus";
import {SendEmailOnUserCreated} from "../../../application/auth/events/SendEmailOnUserCreated";

class InMemoryEventBus extends EventEmitter implements EventBus {
    constructor() {
        super();


    }

    async publish(events: DomainEvent[]): Promise<void> {
        events.map((event) => {
            console.log(event.eventName)
            const res = this.emit(event.eventName, event)
            // const res = this.emit("OLA", event)
            console.log("->", res)
        });
    }

    addSubscribers(subscribers: Array<IDomainEventSubscriber<DomainEvent>>): void {
        subscribers.forEach((subscriber) => {
            subscriber.subscribedTo().forEach((event) => {
                console.log(event)
                console.log("--->" , event.eventName)
                this.on(event.eventName, subscriber.on.bind(subscriber));
                // this.on("OLA", () => console.log("OLALAOALAO"));
            });
        });
    }
}

let eventBus: InMemoryEventBus | null = null;

function getEventBus() : EventBus {
    if (!eventBus) {
        eventBus = new InMemoryEventBus();
        const sendEmailOnUserCreated = new SendEmailOnUserCreated();
        eventBus.addSubscribers([sendEmailOnUserCreated]);
        console.log(sendEmailOnUserCreated.subscribedTo()[0].eventName)
    }
    return eventBus;
}

export default getEventBus;
