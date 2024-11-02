import bcrypt from "bcrypt";

import jwtService from "../../../../v1/_common/services/jwtService";
import {UserCreatedDomainEvent} from "../../../domain/UserAggregate/Events/UserCreated";
import {User} from "../../../domain/UserAggregate/User";
import {Conflict} from "../../../infraestructure/_common/exceptions/defaultModels/Conflict";
import {NotFound} from "../../../infraestructure/_common/exceptions/defaultModels/NotFound";
import {Success} from "../../../infraestructure/_common/exceptions/defaultModels/Success";
import {ErrorOr} from "../../../infraestructure/_common/exceptions/ErrorOr";
import getEventBus from "../../../infraestructure/_common/models/InMemoryEventBus";
import RoleRepository from "../../../infraestructure/_common/persistance/repositories/RolesRepository";
import rolesRepository from "../../../infraestructure/_common/persistance/repositories/RolesRepository";
import UserRepository from "../../../infraestructure/_common/persistance/repositories/UserRepository";
import userRepository from "../../../infraestructure/_common/persistance/repositories/UserRepository";
import {AuthResult} from "../../_common/auth/authResult";
import {IEventBus} from "../../_common/interfaces/IEventBus";

import {CreateUserCommand} from "./CreateUserCommand";


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

    async handle(data: CreateUserCommand): Promise<ErrorOr<AuthResult>> {
        
        const role = await rolesRepository.findRoleById(1);   
        
        const userExists = await userRepository.findByEmailAsync(data.email);

        if(userExists) {
            return new Conflict("User with this Email is already registered");
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(data.password, saltRounds);

        const user = User.create(data.email, data.email, hashedPassword, role!);

        await this.userRepository.addAsync(user);

        const userCreatedEvent = new UserCreatedDomainEvent(user.id.getValue(), user.name, user.email);

        const jwt = jwtService.sign({id: user.id, role: role?.name}, '1h');
        
        const returnData: AuthResult = {
                user: user,
                jwt: jwt
        };

        await this.eventBus.publish([userCreatedEvent]);
        return new Success(returnData);
    }
}

export default new CreateUserCommandHandler();
