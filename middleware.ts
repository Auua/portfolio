import { withAuth } from 'next-auth/middleware';

// More on how NextAuth.js middleware works: https://next-auth.js.org/configuration/nextjs#middleware
export default withAuth(
  (req) => {
    // TODO: logging service
    // eslint-disable-next-line no-console
    console.log(req.nextauth.token);
  },
  {
    callbacks: {
      authorized({ req, token }) {
        if (req.nextUrl.pathname === '/admin') {
          return token?.userRole === 'admin';
        }
        return !!token;
      },
    },
  },
);

export const config = { matcher: ['/admin', '/skills', '/projects', '/about'] };
