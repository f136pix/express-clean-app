import {UnauthorizedError} from "../exceptions/UnauthorizedError";
import prisma from "../../../../prismaClient";

const checkPermission = (permission: string) => {
    return async (req: any, res: any, next: any) => {
        const userRole = req.user.role ? req.user.role : 'anonymous';

        const userPermissions = await prisma.role.findUnique({
            where: {
                name: userRole
            },
            include: {
                permissions: true
            }
        }).permissions().then((permissions) => permissions?.map((permission) => permission.name));

        if (userPermissions?.includes(permission)) {
            return next();
        } else {
            throw new UnauthorizedError('User does not have access to this resource');
        }
    };
};

export {checkPermission}