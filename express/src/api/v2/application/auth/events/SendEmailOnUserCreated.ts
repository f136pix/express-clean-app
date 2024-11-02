import {IDomainEvent} from "../../../domain/_common/interfaces/IDomainEvent";
import {UserCreatedDomainEvent} from "../../../domain/UserAggregate/Events/UserCreated";
import RabbitMqEventPublisher from "../../../infraestructure/_common/models/RabbitMqEventPublisher";
import {IDomainEventSubscriber} from "../../_common/interfaces/IDomainEventSubscriber";
import IMessageBrokerPublisher from "../../_common/interfaces/IMessageBrokerPublisher";
import IPublisheableEvent from "../../_common/interfaces/IPublisheableEvent";


export class SendEmailOnUserCreated
    implements IDomainEventSubscriber<UserCreatedDomainEvent>
{
    private readonly publisher : IMessageBrokerPublisher;
    constructor( ) {
        this.publisher = RabbitMqEventPublisher;
    }

    subscribedTo(): Array<IDomainEvent> {
        return [UserCreatedDomainEvent] as unknown as Array<IDomainEvent>;
    }

    async on(domainEventPayload: UserCreatedDomainEvent) {
        const { userId, name, email } = domainEventPayload;

        // Pass the information to the broker so emailSenderService uses it
        const sendEmailEvent : IPublisheableEvent = {
            name: name,
            email: email
        };

        await this.publisher.publishAsync(sendEmailEvent, "send.email");

        return Promise.resolve();

    }
}