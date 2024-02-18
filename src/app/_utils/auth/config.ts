import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@auth/prisma-adapter';
import NextAuth from 'next-auth';
import { User } from '@prisma/client';
import prisma from '@/lib/prisma';
import checkUser from '@/lib/users';
import type { NextAuthConfig } from 'next-auth';

const options = {
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
          credentials?.username as string,
          credentials?.password as string,
        );
        if (user) {
          return user;
        }
        return null;
      },
    }),
  ],
  adapter: PrismaAdapter(prisma),
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
    async redirect({ url, baseUrl }) {
      if (url.includes('callbackUrl')) {
        const callback = url.split('=')[1];
        return `${baseUrl}${callback}`;
      }
      if (!url.includes(baseUrl)) {
        return `${baseUrl}${url}`;
      }
      return `${url}`;
    },
  },
  pages: {
    signIn: '/login',
    signOut: '/logout',
  },
} satisfies NextAuthConfig;

export const { auth, signIn, signOut } = NextAuth(options);
