import {Router} from "express";
import {CreateUserContract} from "../../../contracts/auth/RegisterUserRequest";
import {MessageResponse} from "../_common/interfaces";
import {RegisterUserResponse} from "../../../contracts/auth/RegisterUserResponse";
import schemaValidator from "../_common/middlewares/schemaValidator";
import {authSignup} from "../auth/authValidation";
import asyncHandler from "../_common/middlewares/asyncHandler";
import {authService} from "../auth/authService";
import {checkPermission} from "../_common/middlewares/rbacMiddleware";

const itemsController = Router();
itemsController.use("/items")


itemsController.post<any, any>('',
    schemaValidator(authSignup),
    checkPermission('create:item'),
    asyncHandler(async (req: any, res: any) => {
        const response: MessageResponse<string> = {
            message: 'User created successfully',
            data: "teste"
        };
        res.json(response);
    }));

export default itemsController;