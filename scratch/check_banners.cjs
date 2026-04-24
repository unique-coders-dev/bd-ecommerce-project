const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const banners = await prisma.banner.findMany();
  const slides = await prisma.heroSlide.findMany();
  console.log('Banners:', JSON.stringify(banners, null, 2));
  console.log('Slides:', JSON.stringify(slides, null, 2));
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());
