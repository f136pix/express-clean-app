import {CreateUserCommand} from "../../../application/auth/commands/CreateUserCommand";
import {CreateUserRequest} from "../../../../../contracts/auth/RegisterUserRequest";
import {Router} from "express";
import asyncHandler from "../../_common/middlewares/asyncHandler";
import CreateUserCommandHandler from "../../../application/auth/commands/CreateUserCommandHandler";
import createUserCommandHandler from "../../../application/auth/commands/CreateUserCommandHandler";
import {ErrorOr} from "../../_common/exceptions/ErrorOr";
import {authSignin, authSignup} from "../../../../v1/auth/authValidation";
import schemaValidator from "../../_common/middlewares/schemaValidator";
import {LoginUserRequest} from "../../../../../contracts/auth/LoginUserRequest";
import {MessageResponse} from "../../_common/interfaces/messageResponse";
import {handleErrorOr} from "../../_common/utils/errorOrExtensions";
import {RegisterUserResponse} from "../../../../../contracts/auth/RegisterUserResponse";
import {AuthResult} from "../../../application/_common/auth/authResult";
import {LoginUserQuery} from "../../../application/auth/queries/LoginUserQuery";
import LoginUserQueryHandler from "../../../application/auth/queries/LoginUserQueryHandler";

class AuthController {
    public authRouter: Router;
    public createUserCommandHandler: typeof CreateUserCommandHandler;
    public loginUserQueryHandler: typeof LoginUserQueryHandler;

    constructor() {
        this.createUserCommandHandler = CreateUserCommandHandler;
        this.loginUserQueryHandler = LoginUserQueryHandler;

        this.authRouter = Router();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.authRouter.post('/register',
            schemaValidator(authSignup),
            asyncHandler(this.Register.bind(this)));

        this.authRouter.post('/login',
            schemaValidator(authSignin),
            asyncHandler(this.Login.bind(this)));
    }

    private async Login(req: any, res: any, next: any): Promise<void> {
        const data: LoginUserRequest = req.body;
        const query = new LoginUserQuery(data.email, data.password)
        const ret: ErrorOr<AuthResult> = await this.loginUserQueryHandler.handle(query);
        
        handleErrorOr(
            ret,
            resData => {
                const response: MessageResponse<RegisterUserResponse> = {
                    message: 'User logged in successfully',
                    data: {
                        user: {
                            email: resData.user.email,
                            name: resData.user.name
                        },
                        jwt: resData.jwt
                    }
                }
                res.status(200).json(response);
            },
            error => next(error)
        );
        
    }


    private async Register(req: any, res: any, next: any): Promise<void> {
        const data: CreateUserRequest = req.body;
        const command = new CreateUserCommand(data.name, data.email, data.password)
        const ret: ErrorOr<AuthResult> = await createUserCommandHandler.handle(command);

        handleErrorOr(
            ret,
            resData => {
                const response: MessageResponse<RegisterUserResponse> = {
                    message: 'User created successfully',
                    data: {
                        user: {
                            email: resData.user.email,
                            name: resData.user.name
                        },
                        jwt: resData.jwt
                    }
                }
                res.status(201).json(response);
            },
            error => next(error)
        );
    }
}

export default new AuthController();