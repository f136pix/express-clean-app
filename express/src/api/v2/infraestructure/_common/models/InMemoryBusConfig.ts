import {IEventBus} from "../../../application/_common/interfaces/IEventBus";
import {SendEmailOnUserCreated} from "../../../application/auth/events/SendEmailOnUserCreated";

export class InMemoryBusConfig {
    
    static registerEvents(eventBus: IEventBus) {
        // Subscribe the events to the eventBus
        const sendEmailOnUserCreated = new SendEmailOnUserCreated();
        eventBus.addSubscribers([sendEmailOnUserCreated]);
        
    }
    
}