import prisma from '@/lib/prisma';

async function globalTearDown() {
  await prisma.user.deleteMany({});
}

export default globalTearDown;
