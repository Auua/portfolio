import { PrismaClient } from '@prisma/client';

declare global {
  // eslint-disable-next-line no-var,vars-on-top
  var prisma: PrismaClient | undefined;
}

const prisma = global.prisma || new PrismaClient({ log: ['info', 'warn', 'error'] });

if (process.env.NODE_ENV === 'development') global.prisma = prisma;

export default prisma;
