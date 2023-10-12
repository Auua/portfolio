import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { NextAuthOptions } from 'next-auth';
import { Adapter } from 'next-auth/adapters';
import checkUser from '@/app/_lib/users';
import prisma from '@/app/_lib/prisma';
import { User } from '@prisma/client';

const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'username' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials) throw new Error('Credentials are needed for login');
        const user: User | null = await checkUser(
          credentials?.username,
          credentials?.password,
        );
        if (user) {
          return user;
        }
        return null;
      },
    }),
  ],
  adapter: PrismaAdapter(prisma) as Adapter,
  session: { strategy: 'jwt' },
};

export default options;
