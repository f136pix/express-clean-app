import {CreateUserCommand} from "./CreateUserCommand";
import {User} from "../../../domain/UserAggregate/User";
import UserRepository from "../../../infraestructure/_common/persistance/repositories/UserRepository";
import RoleRepository from "../../../infraestructure/_common/persistance/repositories/RolesRepository";
import rolesRepository from "../../../infraestructure/_common/persistance/repositories/RolesRepository";
import {IEventBus} from "../../_common/interfaces/IEventBus";
import {UserCreatedDomainEvent} from "../../../domain/UserAggregate/Events/UserCreated";
import getEventBus from "../../../infraestructure/_common/models/InMemoryEventBus";
import userRepository from "../../../infraestructure/_common/persistance/repositories/UserRepository";
import {ErrorOr} from "../../../infraestructure/_common/exceptions/ErrorOr";
import {Conflict} from "../../../infraestructure/_common/exceptions/defaultModels/Conflict";
import {Success} from "../../../infraestructure/_common/exceptions/defaultModels/Success";


class CreateUserCommandHandler {
    private readonly userRepository: typeof UserRepository;
    private readonly roleRepository: typeof RoleRepository;
    private readonly eventBus: IEventBus;
    constructor(
    ) {
        this.userRepository = UserRepository;
        this.roleRepository = RoleRepository;
        this.eventBus = getEventBus();
    }

    async handle(data: CreateUserCommand): Promise<ErrorOr<User>> {
        const permission = await rolesRepository.findRoleById(1);

        const userExists = await userRepository.findByEmailAsync(data.email);

        if(userExists) {
            return new Conflict("User with this Email is already registered");
        }

        const user = User.create(data.email, data.email, data.password, permission!)

        await this.userRepository.addAsync(user);

        const userCreatedEvent = new UserCreatedDomainEvent(user.id.getValue(), user.name, user.email);
        await this.eventBus.publish([userCreatedEvent]);

        return new Success(user);
    }
}

export default new CreateUserCommandHandler();
