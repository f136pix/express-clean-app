import { PrismaClient } from "@prisma/client";
import prismaClient from "../../../../../../prismaClient";
import {User} from "../../../../domain/UserAggregate/User";

class UserRepository {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = prismaClient
    }

    async addAsync(user: User): Promise<User> {

         const createdUser = await this.prisma.user.create({
            data: {
                name: user.name,
                email: user.email,
                password: user.password,
                roleId: user.role!.id,
                deleted: false,
            }
        });

         return User.toDomain(createdUser);
    }

    // Find a user by email
    async findByEmailAsync(email: string): Promise<User | null> {
        const prismaUser = await this.prisma.user.findUnique({
            where: { email }
        })

        if(!prismaUser) return null;

        return User.toDomain(prismaUser);
    }
    //
    // // Find a user by ID
    // async findById(id: number): Promise<User | null> {
    //     return this.prisma.user.findUnique({
    //         where: { id }
    //     });
    // }
    //
    // // Update a user's role
    // async updateRole(userId: number, roleId: number): Promise<User> {
    //     return this.prisma.user.update({
    //         where: { id: userId },
    //         data: { roleId }
    //     });
    // }
    //
    // // Soft delete a user
    // async softDelete(userId: number): Promise<User> {
    //     return this.prisma.user.update({
    //         where: { id: userId },
    //         data: { deleted: true }
    //     });
    // }
    //
    // // Find all users, excluding deleted ones
    // async findAll(): Promise<User[]> {
    //     return this.prisma.user.findMany({
    //         where: { deleted: false },
    //         include: { role: true, items: true } // Including relations if needed
    //     });
    // }
}

export default new UserRepository();
