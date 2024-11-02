import {IDomainEvent} from "../../_common/interfaces/IDomainEvent";
import {DomainEvent} from "../../DomainEvent";

export class UserCreatedDomainEvent extends DomainEvent {
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