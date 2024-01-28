import { NextIntlClientProvider, useMessages } from 'next-intl';
import { SUPPORTED_LANGUAGES } from '../../../i18n';
import { getTranslations } from 'next-intl/server';
import { LocaleParamProps } from '../_types/common';
import Navbar from '../_components/navigation/Navbar';

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
  const messages = useMessages();

  return (
    <html lang={locale}>
      <head>
        <title>Some title is this</title>
      </head>
      <body>
        <Navbar />
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
