import {NotFoundError} from "../_common/exceptions/NotFoundError";
import prisma from "../../../prismaClient";
import {CreateUserContract} from "../../../contracts/auth/RegisterUserRequest";
import {User} from "@prisma/client";
import jwtService from "../_common/services/jwtService";

class authServiceClass {
    login() {
        return 'Login successful';
    }

    async register(data: CreateUserContract): Promise<{ user: User, jwt: string }> {
        const user = await prisma.user.findUnique({
            where: {
                email: data.email
            }
        })

        if (user) {
            throw new NotFoundError('User already exists');
        }

        const roleName = "user"
        
        const CreatedUser = await prisma.user.create({
            data: {
                email: data.email,
                name: data.name,
                password: data.password,
                role: {
                    connect: {
                        name: roleName
                    }
                }
            },
        });
        
        const jwt = jwtService.sign({id: CreatedUser.id, role: roleName}, '1h')

        return {
            user: CreatedUser,
            jwt: jwt
        }
    }

    test(user?: any) {

        throw new NotFoundError("NotFound")

        // throw new Error("teste")
        const ola: any[] = []
        console.log(ola[100].name)


        return "ola"
        // throw new Error('There was an error in the test route.');
    }
}

export const authService = new authServiceClass();