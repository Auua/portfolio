import '../globals.css';

import { NextIntlClientProvider, useMessages } from 'next-intl';
import { SUPPORTED_LANGUAGES } from '../../../i18n';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { LocaleParamProps } from '../_types/common';
import { Suspense } from 'react';
import LoadingComponent from '../_components/loading/LoadingComponent';
import Navbar from '../_components/navigation/Navbar';
import { Analytics } from '../_components/Analytics';

export async function generateMetadata({
  params: { locale },
}: LocaleParamProps) {
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  const site = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const languages = SUPPORTED_LANGUAGES.reduce((acc, lang) => {
    return { ...acc, [lang]: `/${lang}` };
  }, {});

  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
    author: t('author'),
    openGraph: {
      title: t('title'),
      description: t('description'),
      type: 'website',
      locale,
      site_name: t('title'),
      images: [t('image')],
    },
    metadataBase: new URL(site),
    alternates: {
      languages: languages,
    },
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
      <body>
        <Navbar locale={locale} />
        <Suspense fallback={<LoadingComponent />}>
          <NextIntlClientProvider locale={locale} messages={messages}>
            {children}
          </NextIntlClientProvider>
          <Analytics />
        </Suspense>
      </body>
    </html>
  );
}
