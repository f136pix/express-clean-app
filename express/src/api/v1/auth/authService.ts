import {NotFoundError} from "../_common/exceptions/NotFoundError";
import prisma from "../../../prismaClient";
import {CreateUserContract} from "../../../contracts/auth/CreateUser";

class authServiceClass {
    login() {
        return 'Login successful';
    }

    async register(data : CreateUserContract)  {
        const user = await prisma.user.findUnique({
            where: {
                email: data.email
            }
        })
        
        if (user) {
            throw new NotFoundError('User already exists');
        }
        
        return 'Registration successful';
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