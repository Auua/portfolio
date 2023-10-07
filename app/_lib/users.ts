import bcrypt from 'bcrypt';
import prisma from './prisma';

// For Dashboard;
// const saltRounds = 10;
// const hashPassword = (password: string) => bcrypt.hashSync(password, saltRounds);

export default async function checkUser(username: string, password: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { username },
    });
    if (!user) {
      return null;
    }

    const match = await bcrypt.compare(password, user.password);

    if (match) {
      return user;
    }
    return null;
  } catch (error) {
    // TODO logging service
    // eslint-disable-next-line no-console
    console.error(`checkUser ${username}`, error);
    throw error;
  }
}
