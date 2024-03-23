import { getRequestConfig } from 'next-intl/server';
import { createSharedPathnamesNavigation } from 'next-intl/navigation';
import { isSupportedLanguage, SUPPORTED_LANGUAGES } from '../i18n/';
import { notFound } from 'next/navigation';

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid according to the `i18n` directory (submodule)
  if (!isSupportedLanguage(locale)) notFound();

  // Return the messages for the selected locale from the `i18n` directory (submodule)
  return {
    messages: (await import(`../i18n/${locale}/common.json`)).default,
  };
});

export const { Link, redirect, usePathname, useRouter } =
  createSharedPathnamesNavigation({ locales: SUPPORTED_LANGUAGES });
