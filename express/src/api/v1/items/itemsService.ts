import {Item} from "@prisma/client";

import {CreateItemRequest} from "../../../contracts/items/CreateItemRequest";
import prisma from "../../../prismaClient";
import {BadRequestError} from "../_common/exceptions/BadRequestError";
import {UpdateItemRequest} from "../../../contracts/items/UpdateItemRequest";

class itemsService {
    async get(): Promise<Item[]> {
        const items = await prisma.item.findMany();
        return items;
    }

    async create(data: CreateItemRequest): Promise<Item> {
        if (typeof data.userId === 'number') {
            const userClient = await prisma.user.findUnique({
                where: {
                    id: data.userId,
                },
            });

            if (!userClient) {
                throw new Error('User not found');
            }

            return await prisma.item.create({
                data: {
                    name: data.name,
                    userId: userClient.id
                },
                include: {
                    user: false
                }
            });
        }

        return await prisma.item.create({
            data: {
                name: data.name,
            },
            include: {
                user: false
            }
        });
    }

    async delete(id: number): Promise<Item> {
        const item = await prisma.item.findUnique({
            where: {
                id: id
            },
        });

        if (!item) {
            throw new BadRequestError("Item with provided Id was not found")
        }

        return await prisma.item.delete({
            where: {
                id: id
            }
        });
    }

    async update(id: number, data: UpdateItemRequest): Promise<Item> {

        const [item, user] = await Promise.all([
            prisma.item.findUnique({ where: { id } }),
            prisma.user.findUnique({ where: { id: data.userId } })
        ]);

        if (!item) {
            throw new BadRequestError("Item with provided Id was not found")
        }

        if(!user) {
            throw new BadRequestError("User with provided Id does not exist")
        }

        return await await prisma.item.update({
            where: {id},
            data,
        });
    }
}


export default new itemsService();