import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const adminRole = await prisma.role.create({
        data: {
            name: 'admin',
        },
    });

    const userRole = await prisma.role.create({
        data: {
            name: 'user',
        },
    });

    await prisma.permission.create({
        data: {
            name: 'get:items',
            roles: {
                connect: [
                    {id: adminRole.id},
                    {id: userRole.id}
                ],
            },
        }
    });
    
    await prisma.permission.create({
        data: {
            name: 'create:items',
            roles: {
                connect: [
                    {id: adminRole.id},
                ],
            },
        }
    });

    await prisma.permission.create({
        data: {
            name: 'delete:items',
            roles: {
                connect: [
                    {id: adminRole.id},
                ],
            },
        }
    });

    await prisma.permission.create({
        data: {
            name: 'update:items',
            roles: {
                connect: [
                    {id: adminRole.id},
                ],
            },
        }
    });

    await prisma.permission.create({
        data: {
            name: 'update:users',
            roles: {
                connect: [
                    {id: adminRole.id},
                ],
            },
        }
    });
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });