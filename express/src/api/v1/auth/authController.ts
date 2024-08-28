import {Router} from 'express';
import {authService} from "./authService";
import {MessageResponse} from "../_common/interfaces";
import schemaValidator from "../_common/middlewares/schemaValidator";
import {authSignup} from "./authValidation";
import {CreateUserContract} from "../../../contracts/auth/RegisterUserRequest";
import asyncHandler from "../_common/middlewares/asyncHandler";
import {RegisterUserResponse} from "../../../contracts/auth/RegisterUserResponse";
import {checkPermission} from "../_common/middlewares/rbacMiddleware";

const authController = Router();

authController.post('/login', (req, res) => {
    res.send('Login route');
});


authController.post<CreateUserContract, MessageResponse<RegisterUserResponse>>('/register',
    schemaValidator(authSignup),
    asyncHandler(async (req: any, res: any) => {
    const ret = await authService.register(req.body);
    const response: MessageResponse<RegisterUserResponse> = {
        message: 'User created successfully',
        data: {
            user: {
                email: ret.user.email,
                name: ret.user.name,
            },
            jwt: ret.jwt
        }
    };
    res.json(response);
}));

export default authController;