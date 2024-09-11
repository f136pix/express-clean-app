import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

prisma.$use(async (params, next) => {
    if (params.model === 'User' && (params.action === 'findUnique' || params.action === 'findMany')) {

        if (!params.args.where) {
            params.args.where = {};
        }

        if (params.args.where.deleted === undefined) {
            params.args.where.deleted = false;
        }
    }

    return next(params);
});

export default prisma;