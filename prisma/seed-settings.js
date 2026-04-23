import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const setting = await prisma.setting.upsert({
    where: { id: 'site-settings' },
    update: {},
    create: {
      id: 'site-settings',
      marqueeText: "Welcome to KC Bazar! Free shipping on orders over ৳1000.",
      hotline: "09644888889",
      openingHours: "Sat - Thu: 10:00 AM - 08:00 PM",
      location: "Model Town, Puran Para, Bandarban",
      facebook: "https://facebook.com",
      instagram: "https://instagram.com",
      whatsapp: "https://wa.me/880123456789",
      themeColor: "#FF4D6D",
      logoUrl: "https://kcbazar.com/wp-content/uploads/2025/08/KCB-LOGO-G.png",
      shortDescription: "Your one-stop premium destination for beauty and wellness."
    },
  });
  console.log('Seed Settings:', setting);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
