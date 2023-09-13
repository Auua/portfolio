import { PrismaClient } from '@prisma/client';

declare global {
  // eslint-disable-next-line no-var,vars-on-top
  var prisma: PrismaClient | undefined;
}

const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV === 'development') global.prisma = prisma;

export default prisma;

/*

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma
  || new PrismaClient({
    log: ['query'],
  });

if (process.env.NODE_ENV === 'development') globalForPrisma.prisma;
*/
