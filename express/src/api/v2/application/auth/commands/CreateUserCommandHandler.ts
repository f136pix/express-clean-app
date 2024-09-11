import {CreateUserCommand} from "./CreateUserCommand";
import {User} from "../../../domain/UserAggregate/User";
import UserRepository from "../../../infraestructure/_common/persistance/repositories/UserRepository";
import RoleRepository from "../../../infraestructure/_common/persistance/repositories/RolesRepository";
import rolesRepository from "../../../infraestructure/_common/persistance/repositories/RolesRepository";
import {EventBus} from "../../../infraestructure/_common/interfaces/EventBus";
import {UserCreatedDomainEvent} from "../../../domain/UserAggregate/Events/UserCreated";
import getEventBus from "../../../infraestructure/_common/models/InMemoryEventBus";


class CreateUserCommandHandler {
    private readonly userRepository: typeof UserRepository;
    private readonly roleRepository: typeof RoleRepository;
    private readonly eventBus: EventBus;
    constructor(
    ) {
        this.userRepository = UserRepository;
        this.roleRepository = RoleRepository;
        this.eventBus = getEventBus();
    }

    async handle(data: CreateUserCommand): Promise<User> {
        const permission = await rolesRepository.findRoleById(1);

        const user = User.create(data.email, data.email, data.password, permission!)

        await this.userRepository.addAsync(user);

        const userCreatedEvent = new UserCreatedDomainEvent(user.id.getValue(), user.name, user.email);
        await this.eventBus.publish([userCreatedEvent]);

        return user;
    }
}

export default new CreateUserCommandHandler();
