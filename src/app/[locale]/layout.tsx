import '../globals.css';

import { useMessages } from 'next-intl';
import { SUPPORTED_LANGUAGES } from '../../../i18n';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { LocaleParamProps } from '../_types/common';
import { Suspense } from 'react';
import Navbar from '../_components/navigation/Navbar';
import { Analytics } from '../_components/Analytics';
import Footer from '../_components/footer/Footer';
import Providers from '../_components/providers/Providers';

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
  params: { locale },
}: LocaleParamProps) {
  unstable_setRequestLocale(locale);
  const messages = useMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body>
        <Suspense>
          <Providers locale={locale} messages={messages}>
            <Navbar locale={locale} />
            <Suspense>
              {children}
              {form}
            </Suspense>
            <Footer />
          </Providers>
        </Suspense>
        <Suspense fallback={null}>
          <Analytics />
        </Suspense>
      </body>
    </html>
  );
}
