"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryBusConfig = void 0;
const SendEmailOnUserCreated_1 = require("../../../application/auth/events/SendEmailOnUserCreated");
class InMemoryBusConfig {
    static registerEvents(eventBus) {
        // Subscribe the events to the eventBus
        const sendEmailOnUserCreated = new SendEmailOnUserCreated_1.SendEmailOnUserCreated();
        eventBus.addSubscribers([sendEmailOnUserCreated]);
    }
}
exports.InMemoryBusConfig = InMemoryBusConfig;
