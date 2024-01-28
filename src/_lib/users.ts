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
      console.warn('not found any user with username: ', username);
      return null;
    }

    const match = await bcrypt.compare(password, user.password);

    if (match) {
      console.info('user logged in ', username);
      return user;
    }

    console.warn('user tried to login with a wrong password ', username);
    return null;
  } catch (error) {
    console.error(`checkUser ${username}`, error);
    throw error;
  }
}
