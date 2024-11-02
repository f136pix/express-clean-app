import {IDomainEvent} from "../../../domain/_common/interfaces/IDomainEvent";
import {DomainEvent} from "../../../domain/DomainEvent";

export interface IDomainEventSubscriber<T extends DomainEvent> {
  subscribedTo(): Array<IDomainEvent>;
  on(event: T): void;
}