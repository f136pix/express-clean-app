import {DomainEvent} from "../../../domain/DomainEvent";
import {IDomainEvent} from "../../../domain/_common/interfaces/IDomainEvent";

export interface IDomainEventSubscriber<T extends DomainEvent> {
  subscribedTo(): Array<IDomainEvent>;
  on(event: T): void;
}