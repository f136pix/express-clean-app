import {EventBus} from "../../../infraestructure/_common/interfaces/EventBus";
import {Item} from "../../../domain/UserAggregate/Item";
import {IDomainEventSubscriber} from "../../../infraestructure/_common/interfaces/IDomainEventSubscriber";
import {UserCreatedDomainEvent} from "../../../domain/UserAggregate/Events/UserCreated";
import {DomainEvent} from "../../../infraestructure/_common/models/DomainEvent";
import {IDomainEvent} from "../../../infraestructure/_common/interfaces/IDomainEvent";

export class SendEmailOnUserCreated
    implements IDomainEventSubscriber<UserCreatedDomainEvent>
{
    constructor( ) {
    }

    subscribedTo(): Array<IDomainEvent> {
        return [UserCreatedDomainEvent] as unknown as Array<IDomainEvent>;
    }

    async on(domainEventPayload: UserCreatedDomainEvent) {
        const { userId, name, email } = domainEventPayload;

        console.log("-------------> ON EVENT <--------------");
        console.log(email);

        // ... (any asynchronous operations with await)

        return Promise.resolve(); // Resolve the promise
        // Get user email from the userId received
        // const userEmail = await this.userRepository.getUserEmailById(userId);
        // Send the user an email with a reminder of the item left in the cart
        // await this.marketingEmailSender.sendMissingPurchaseEmail(userEmail, item);
    }
}