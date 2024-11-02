import bcrypt from "bcrypt";

import {UnauthorizedError} from "../../../../v1/_common/exceptions/UnauthorizedError";
import jwtService from "../../../../v1/_common/services/jwtService";
import {UserCreatedDomainEvent} from "../../../domain/UserAggregate/Events/UserCreated";
import {User} from "../../../domain/UserAggregate/User";
import {NotFound} from "../../../infraestructure/_common/exceptions/defaultModels/NotFound";
import {Success} from "../../../infraestructure/_common/exceptions/defaultModels/Success";
import {Unauthorized} from "../../../infraestructure/_common/exceptions/defaultModels/Unauthorized";
import {ErrorOr} from "../../../infraestructure/_common/exceptions/ErrorOr";
import RoleRepository from "../../../infraestructure/_common/persistance/repositories/RolesRepository";
import UserRepository from "../../../infraestructure/_common/persistance/repositories/UserRepository";
import {AuthResult} from "../../_common/auth/authResult";

import {LoginUserQuery} from "./LoginUserQuery";

class LoginUserQueryHandler {
    private readonly userRepository: typeof UserRepository;
    private readonly roleRepository: typeof RoleRepository;

    constructor() {
        this.userRepository = UserRepository;
        this.roleRepository = RoleRepository;
    }

    async handle(data: LoginUserQuery): Promise<ErrorOr<AuthResult>> {

        const user = await this.userRepository.findByEmailAsync(data.email);

        if (!user) {
            return new NotFound("There is no user with this email");
        }

        const isValidPassword = await bcrypt.compare(data.password, user.password);
        if (!isValidPassword) {
            return new Unauthorized('Invalid password');
        }

        const jwt = jwtService.sign({id: user.id, role: user.role?.name}, '1h');

        const returnData: AuthResult = {
            user: user,
            jwt: jwt
        };

        return new Success(returnData);
    }
}

export default new LoginUserQueryHandler();
