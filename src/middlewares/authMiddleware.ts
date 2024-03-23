import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';
import { MiddlewareFactory } from './middlewareFactory';
import { SUPPORTED_LANGUAGES } from '../../i18n/';
import { auth } from '@/app/_utils/auth/config';

//const secret = process.env.NEXTAUTH_SECRET || '';

const publicPages = ['/', '/login', '/logout', '/contact', '/denied'];

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

    const session = await auth();

    if (pathname.includes('login') && session?.user) {
      return NextResponse.redirect(request.nextUrl.origin);
    }

    if (pathname.includes('logout') && !session) {
      const url = new URL(`login`, request.url);
      return NextResponse.redirect(url);
    }

    const isPublicPage = publicPathnameRegex.test(pathname);

    if (!isPublicPage) {
      if (!session?.user) {
        const url = new URL(`login`, request.url);
        const params = new URLSearchParams(url.search);
        params.set('callbackUrl', pathname);
        url.search = decodeURIComponent(params.toString());
        return NextResponse.redirect(url);
      }
      if (
        pathname.includes('/admin') &&
        !session.user.roles?.includes('ADMIN')
      ) {
        const url = new URL(`denied`, request.nextUrl.origin);
        return NextResponse.redirect(url);
      }
    }
    return next(request, event, response);
  };
};

export default withAuthentication;
