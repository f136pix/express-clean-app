import {Item} from "@prisma/client";
import {Router} from "express";

import {MessageResponse} from "../_common/interfaces";
import asyncHandler from "../_common/middlewares/asyncHandler";
import {checkPermission} from "../_common/middlewares/rbacMiddleware";
import schemaValidator from "../_common/middlewares/schemaValidator";

import ItemsService from "./itemsService";
import itemsService from "./itemsService";
import {createItemSchema} from "./itemsValidation";

const itemsController = Router();

itemsController.get('/',
    checkPermission('get:items'),
    asyncHandler(async (req: any, res: any) => {
        const ret = await ItemsService.get();
        const response: MessageResponse<Item[]> = {
            message: "Items retrieved",
            data: ret
        };
        res.json(response);
    }));


itemsController.post('/',
    checkPermission('create:items'),
    schemaValidator(createItemSchema),
    asyncHandler(async (req: any, res: any) => {
        const ret = await itemsService.create(req.body);
        const response: MessageResponse<Item> = {
            message: 'Item created successfully',
            data: ret
        };
        res.json(response);
    }));


itemsController.delete('/:id',
    checkPermission('delete:items'),
    asyncHandler(async (req: any, res: any) => {
        const ret = await itemsService.delete(Number(req.params.id));
        const response: MessageResponse<Item> = {
            message: 'Item deleted successfully',
            data: ret
        };
        res.json(response);
    }));


itemsController.put('/:id',
    checkPermission('update:items'),
    asyncHandler(async (req: any, res: any) => {
        const ret = await itemsService.update(Number(req.params.id), req.body);
        const response: MessageResponse<Item> = {
            message: 'Item updated successfully',
            data: ret
        };
        res.json(response);
    }));


export default itemsController;