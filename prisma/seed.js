import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  const email = 'superadmin@example.com'
  const password = 'password123'
  
  const exist = await prisma.user.findUnique({
    where: { email },
  })

  if (exist) {
    console.log('Super admin already exists.')
    return
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  const superAdmin = await prisma.user.create({
    data: {
      name: 'Super Admin',
      email: email,
      password: hashedPassword,
      role: 'super-admin', // Super powerful role!
    },
  })

  console.log('Created Super Admin:', superAdmin.email)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
