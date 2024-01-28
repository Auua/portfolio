import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';
import { MiddlewareFactory } from './middlewareFactory';
import { SUPPORTED_LANGUAGES } from '../../i18n';
import { getToken } from 'next-auth/jwt';

const publicPages = ['/', '/login', '/signup'];

const locales = SUPPORTED_LANGUAGES;

export const withAuthentication: MiddlewareFactory = (next) => {
  return async (
    request: NextRequest,
    event: NextFetchEvent,
    response: NextResponse,
  ) => {
    const publicPathnameRegex = RegExp(
      `^(/(${locales.join('|')}))?(${publicPages
        .flatMap((p) => (p === '/' ? ['', '/'] : p))
        .join('|')})/?$`,
      'i',
    );

    const pathname = request.nextUrl.pathname;

    const isPublicPage = publicPathnameRegex.test(pathname);

    if (!isPublicPage) {
      const token = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET,
      });
      if (!token) {
        const url = new URL(`/api/auth/signin`, request.url);
        url.searchParams.set('callbackUrl ', encodeURI(request.url));
        return NextResponse.redirect(url);
      }
      if (pathname.includes('/admin') && !token.roles?.includes('ADMIN')) {
        return NextResponse.redirect(request.nextUrl.origin);
      }
    }
    return next(request, event, response);
  };
};

export default withAuthentication;
