import { getRequestConfig } from 'next-intl/server';
import { createSharedPathnamesNavigation } from 'next-intl/navigation';
import {
  DEFAULT_LOCALE,
  isSupportedLanguage,
  SUPPORTED_LANGUAGES,
} from '../i18n';

export default getRequestConfig(async ({ locale: providedLocale }) => {
  let locale = providedLocale;
  // Validate that the incoming `locale` parameter is valid according to the `i18n` directory (submodule)
  if (!isSupportedLanguage(locale)) {
    locale = DEFAULT_LOCALE;
  }

  // Return the messages for the selected locale from the `i18n` directory (submodule)
  return {
    messages: (await import(`../i18n/${locale}.json`)).default,
  };
});

export const { Link, redirect, usePathname, useRouter } =
  createSharedPathnamesNavigation({ locales: SUPPORTED_LANGUAGES });
