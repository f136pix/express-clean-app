import {DomainEvent} from "../models/DomainEvent";
import {IDomainEvent} from "./IDomainEvent";

export interface IDomainEventSubscriber<T extends DomainEvent> {
  subscribedTo(): Array<IDomainEvent>;
  on(event: T): void;
}