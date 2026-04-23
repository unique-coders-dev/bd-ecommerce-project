const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    const res = await prisma.setting.upsert({
      where: { id: "site-settings" },
      update: { aboutUsTitle: "Test Title" },
      create: { 
        id: "site-settings",
        aboutUsTitle: "Test Title" 
      }
    });
    console.log("SUCCESS:", res);
  } catch (e) {
    console.error("FAILURE:", e);
  } finally {
    await prisma.$disconnect();
  }
}

main();
