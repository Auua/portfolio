import createIntlMiddleware from 'next-intl/middleware';
import { DEFAULT_LOCALE, SUPPORTED_LANGUAGES } from '../../i18n/index';
import { NextRequest, NextFetchEvent } from 'next/server';
import { MiddlewareFactory } from './middlewareFactory';

const locales = SUPPORTED_LANGUAGES;

export const intlMiddleware = createIntlMiddleware({
  locales,
  defaultLocale: DEFAULT_LOCALE,
  localeDetection: true,
  localePrefix: 'always',
});

export const withInternatialization: MiddlewareFactory = (next) => {
  return async (request: NextRequest, event: NextFetchEvent) => {
    const newresponse = intlMiddleware(request);
    return next(request, event, newresponse);
  };
};

export default withInternatialization;
