import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { NextAuthOptions } from 'next-auth';
import { Adapter } from 'next-auth/adapters';
import { User } from '@prisma/client';
import prisma from '@/lib/prisma';
import checkUser from '@/lib/users';

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
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.roles = user.roles;
        token.username = user.username;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        ...session.user,
        roles: token.roles,
        username: token.username,
      };
      return session;
    },
  },
};

export default options;
