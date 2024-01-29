import { NextIntlClientProvider, useMessages } from 'next-intl';
import { SUPPORTED_LANGUAGES } from '../../../i18n';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { LocaleParamProps } from '../_types/common';
import Navbar from '../_components/navigation/Navbar';
import { Suspense } from 'react';

export async function generateMetadata({
  params: { locale },
}: LocaleParamProps) {
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    title: t('title'),
  };
}

export function generateStaticParams() {
  return SUPPORTED_LANGUAGES.map((locale) => ({ locale }));
}

export default function LocaleLayout({
  children,
  params: { locale },
}: LocaleParamProps) {
  unstable_setRequestLocale(locale);
  const messages = useMessages();

  return (
    <html lang={locale}>
      <head>
        <title>Some title is this</title>
      </head>
      <body>
        <Suspense fallback={'Loading...'}>
          <Navbar locale={locale} />
          <NextIntlClientProvider locale={locale} messages={messages}>
            {children}
          </NextIntlClientProvider>
        </Suspense>
      </body>
    </html>
  );
}
