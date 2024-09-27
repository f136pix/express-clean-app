import {CreateUserCommand} from "../../../application/auth/commands/CreateUserCommand";
import {CreateUserContract} from "../../../../../contracts/auth/RegisterUserRequest";
import {Router} from "express";
import asyncHandler from "../../_common/middlewares/asyncHandler";
import CreateUserCommandHandler from "../../../application/auth/commands/CreateUserCommandHandler";
import createUserCommandHandler from "../../../application/auth/commands/CreateUserCommandHandler";
import {User} from "../../../domain/UserAggregate/User";
import {ErrorOr} from "../../_common/exceptions/ErrorOr";
import {authSignup} from "../../../../v1/auth/authValidation";
import schemaValidator from "../../_common/middlewares/schemaValidator";

class AuthController {
    public authRouter: Router;
    public createUserCommandHandler : typeof CreateUserCommandHandler;

    constructor() {
        this.createUserCommandHandler = CreateUserCommandHandler;

        this.authRouter = Router();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.authRouter.post('/register',
            schemaValidator(authSignup),
            asyncHandler(this.Register.bind(this)));
    }


    private async Register(req: any, res: any): Promise<void> {
        const data: CreateUserContract = req.body;
        const command = new CreateUserCommand(data.name, data.email, data.password)
        const ret : ErrorOr<User> = await createUserCommandHandler.handle(command);

        res.json(ret);
    }
}

export default new AuthController();