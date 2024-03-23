import { chain } from './middlewares/middlewareFactory';
import withAuthentication from './middlewares/authMiddleware';
import { withInternatialization } from './middlewares/langMiddleware';

/**
 * Next.js Multi-middleware
 * This middleware chains together multiple middlewares, currently the authentication and internationalization middleware.
 * MiddlewareFactory takes an array of middlewares, chains them together, and returns the processed response.
 *
 * The implementation was inspired by examples from the repositories mentioned below.
 * References:
 * - GitHub Repositories:
 *   - Authentication Middleware Inspiration: https://github.com/jmarioste/next-middleware-guide
 *   - Middleware Chaining Mechanism: https://github.com/HamedBahram/next-middleware-chain
 *   - Internationalization with Next.js: https://github.com/amannn/next-intl/tree/main/examples/example-app-router-next-auth
 */
export default chain([withAuthentication, withInternatialization]);

export const config = {
  matcher: [
    // Skip API routes and static assets
    '/((?!api|_next|_vercel|.*\\..*).*)',
  ],
};
