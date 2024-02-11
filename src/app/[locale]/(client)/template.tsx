import { useMessages, NextIntlClientProvider, useLocale } from 'next-intl';

export default function Template({ children }: { children: React.ReactNode }) {
  const locale = useLocale();
  const messages = useMessages();
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
