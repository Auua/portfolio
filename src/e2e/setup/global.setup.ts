import { createNewAdmin, createNewUser } from '@/lib/users';

async function globalSetup() {
  const user = createNewUser('testuser', 'testuser', 'testpassword');
  const admin = createNewAdmin('adminuser', 'adminuser', 'adminpassword');
  await Promise.all([user, admin]);
}

export default globalSetup;
