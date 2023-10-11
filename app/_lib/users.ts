import bcrypt from 'bcrypt';
import logger from '@/app/_lib/logger';
import prisma from '@/app/_lib/prisma';

// For Dashboard;
// const saltRounds = 10;
// const hashPassword = (password: string) => bcrypt.hashSync(password, saltRounds);

export default async function checkUser(username: string, password: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { username },
    });
    if (!user) {
      logger.warn('not found any user with username: ', username);
      return null;
    }

    const match = await bcrypt.compare(password, user.password);

    if (match) {
      logger.info('user logged in ', username);
      return user;
    }

    logger.warn('user tried to login with a wrong password ', username);
    return null;
  } catch (error) {
    logger.error(`checkUser ${username}`, error);
    throw error;
  }
}
