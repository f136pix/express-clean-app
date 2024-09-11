import {DomainEvent} from "../../../infraestructure/_common/models/DomainEvent";
import {IDomainEvent} from "../../../infraestructure/_common/interfaces/IDomainEvent";

export class UserCreatedDomainEvent extends DomainEvent implements IDomainEvent {
    public static eventName = 'UserCreated';
    public readonly userId: number;
    public readonly name: string;
    public readonly email: string;

    constructor(userId: number, name: string, email: string) {
        super('UserCreated');
        this.userId = userId;
        this.name = name;
        this.email = email;
    }
}