import '../globals.css';
import styles from './page.module.css';

import { NextIntlClientProvider, useMessages } from 'next-intl';
import { SUPPORTED_LANGUAGES } from '../../../i18n';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { LocaleParamProps } from '@/app/_types/common';
import { Suspense } from 'react';
import Navbar from '@/app/_components/navigation/mainNav/Navbar';
import { Analytics } from '@/app/_components/Analytics';
import Footer from '@/app/_components/footer/Footer';
import Providers from '@/app/_components/providers/Providers';
import Tabs from '../_components/navigation/tabs/Tabs';

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
  form,
  tabs,
  home,
  params: { locale },
}: LocaleParamProps) {
  unstable_setRequestLocale(locale);
  const messages = useMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body>
        <Providers>
          <Navbar locale={locale} />
          <Suspense>
            <NextIntlClientProvider locale={locale} messages={messages}>
              <main className={styles.main}>
                {children}
                {home}
                <Tabs>{tabs}</Tabs>
              </main>
              {form}
            </NextIntlClientProvider>
          </Suspense>
          <Footer />
        </Providers>
        <Suspense fallback={null}>
          <Analytics />
        </Suspense>
      </body>
    </html>
  );
}
