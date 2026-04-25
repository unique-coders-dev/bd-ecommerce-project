const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const emails = ["ajnasim72@gmail.com", "amiruzzamannasim@gmail.com"];

  for (const email of emails) {
    const user = await prisma.user.upsert({
      where: { email },
      update: {
        role: "super-admin",
        status: "active",
      },
      create: {
        email,
        name: "Super Admin",
        role: "super-admin",
        status: "active",
      },
    });
    console.log(`Successfully configured super-admin: ${user.email}`);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
