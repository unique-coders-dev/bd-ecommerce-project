const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function run() {
  try {
    await prisma.product.findUnique({ where: { id: "undefined" } });
    console.log("Success with string 'undefined'");
  } catch (e) {
    console.log("Error with string 'undefined':");
    console.log(e.message);
  }
}
run();
