import { chain } from './middlewares/middlewareFactory';
import withAuthentication from './middlewares/authMiddleware';
import { withInternatialization } from './middlewares/langMiddleware';

export default chain([withAuthentication, withInternatialization]);

export const config = {
  matcher: [
    // Skip API routes and static assets
    '/((?!api|_next|.*\\..*).*)',
  ],
};
