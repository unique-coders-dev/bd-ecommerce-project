import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
    const p = await prisma.product.findFirst();
    console.log(p.id);
}

main().finally(() => prisma.$disconnect());
