import {response, Router} from 'express';

import {LoginUserRequest} from "../../../contracts/auth/LoginUserRequest";
import {LoginUserResponse} from "../../../contracts/auth/LoginUserResponse";
import {CreateUserRequest} from "../../../contracts/auth/RegisterUserRequest";
import {RegisterUserResponse} from "../../../contracts/auth/RegisterUserResponse";
import {MessageResponse} from "../_common/interfaces";
import asyncHandler from "../_common/middlewares/asyncHandler";
import schemaValidator from "../_common/middlewares/schemaValidator";

import {authService} from "./authService";
import {authSignin, authSignup, roleSchema} from "./authValidation";
import {checkPermission} from "../_common/middlewares/rbacMiddleware";
import {User} from "@prisma/client";

const authController = Router();

authController.post<LoginUserRequest, MessageResponse<LoginUserResponse>>('/login',
    schemaValidator(authSignin),
    asyncHandler(async (req: any, res: any) => {
        const ret = await authService.login(req.body);
        const response: MessageResponse<LoginUserResponse> = {
            message: 'Login Succefful',
            data: ret
        };
        res.json(response);
    })
);


authController.post('/register',
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

authController.post('/:id/role',
    checkPermission("update:users"),
    schemaValidator(roleSchema),
    asyncHandler(async (req: any, res: any) => {
        const ret = await authService.updateRole({id: Number(req.params.id), role: req.body.role});
        const response: MessageResponse<User> = {
            message: "User Updated successfully",
            data: ret
        }

        res.json(response);
    }))

authController.delete('/:id',
    checkPermission("delete:users"),
    asyncHandler(async (req: any, res: any) => {
        const ret = await authService.deleteUser(Number(req.params.id));
        const response: MessageResponse<User> = {
            message: "User deleted successfully",
            data: ret
        }

        res.json(response);
    }));

export default authController;