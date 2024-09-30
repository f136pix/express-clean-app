import {User} from "@prisma/client";
import bcrypt from 'bcrypt';

import {LoginUserRequest} from "../../../contracts/auth/LoginUserRequest";
import {CreateUserContract} from "../../../contracts/auth/RegisterUserRequest";
import prisma from "../../../prismaClient";
import {NotFoundError} from "../_common/exceptions/NotFoundError";
import {UnauthorizedError} from "../_common/exceptions/UnauthorizedError";
import jwtService from "../_common/services/jwtService";
import {UpdateUserRoleRequest} from "../../../contracts/auth/UpdateUserRoleRequest";
import {BadRequestError} from "../_common/exceptions/BadRequestError";

class authServiceClass {
    async login(data: LoginUserRequest): Promise<{ user: User, jwt: string }> {
        const user = await prisma.user.findUnique({
            where: {
                email: data.email
            }, include : {
                role: true
            }
        });

        if (!user) {
            throw new NotFoundError('User with this email does not exists');
        }

        const isValidPassword = await bcrypt.compare(data.password, user.password);
        if (!isValidPassword) {
            throw new UnauthorizedError('Invalid password');
        }

        const jwt = jwtService.sign({id: user.id, role: user.role.name}, '1h');

        return {
            user: user,
            jwt: jwt
        };
    }

    async register(data: CreateUserContract): Promise<{ user: User, jwt: string }> {
        const user = await prisma.user.findUnique({
            where: {
                email: data.email
            }
        });

        if (user) {
            throw new NotFoundError('User already exists');
        }

        const roleName = "user";

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(data.password, saltRounds);
        
        const CreatedUser = await prisma.user.create({
            data: {
                email: data.email,
                name: data.name,
                password: hashedPassword,
                role: {
                    connect: {
                        name: roleName
                    }
                }
            },
        });
        
        const jwt = jwtService.sign({id: CreatedUser.id, role: roleName}, '1h');

        return {
            user: CreatedUser,
            jwt: jwt
        };
    }

    async updateRole (data : UpdateUserRoleRequest) : Promise<User> {
        const role = await prisma.role.findUnique({
            where: {
                name: data.role
            }
        })

        if(!role) {
            throw new BadRequestError("The provided Role does not exists")
        }

        const user = await prisma.user.findUnique({
            where: {
                id: data.id
            }
        })

        if(!user) {
            throw new BadRequestError("User with the provided Id does not exists")
        }

        const updatedUser = await prisma.user.update({
            where: {
                id: data.id,
            },
            data: {
                roleId: role.id
            }
        });

        return updatedUser
    }

    async deleteUser (id: number) : Promise<User> {
        const user = await prisma.user.findUnique({
            where: {
                id: id
            }
        })

        if(!user) {
            throw new NotFoundError("User with the provided Id does not exists")
        }

        // Performs soft delete
        return await prisma.user.update({
            where: {
                id: id
            },
            data: {
                deleted: true
            }
        })
    }
}

export const authService = new authServiceClass();