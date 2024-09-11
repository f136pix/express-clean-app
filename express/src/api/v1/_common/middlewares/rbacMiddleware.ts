import prisma from "../../../../prismaClient";
import {UnauthorizedError} from "../exceptions/UnauthorizedError";
import jwtService from "../services/jwtService";

const checkPermission = (permission: string) => {
        return async (req: any, res: any, next: any) => {
            try {

                const authHeader = req.headers.authorization;
                if (!authHeader || !authHeader.startsWith('Bearer')) {
                    throw new UnauthorizedError('Missing or invalid authorization header');
                }

                const token = authHeader.split(' ')[1];
                const decoded = jwtService.decode(token);

                if (!decoded) {
                    throw new UnauthorizedError('Missing or invalid authorization header');
                }

                const userRole = decoded?.role ? decoded?.role : 'anonymous';

                const userPermissions = await prisma.role.findUnique({
                    where: {
                        name: userRole,
                    },
                })?.permissions().then((permissions) =>
                    permissions?.map((permission) => permission.name)
                );

                console.log("Permission.ts " + permission);
                console.log("User pemissions " + userPermissions );


                if (userPermissions?.includes(permission)) {
                    return next();
                } else {
                    throw new UnauthorizedError('User does not have access to this resource');
                }
            } catch (error) {
                next(error);
            }
        };
    }
;

export {checkPermission};