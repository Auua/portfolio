'use client';

import { ThemeProvider } from 'next-themes';
import { ReactNode } from 'react';
import { AbstractIntlMessages, NextIntlClientProvider } from 'next-intl';

export default function Providers({
  locale,
  messages,
  children,
}: {
  locale: string;
  messages: AbstractIntlMessages;
  children: ReactNode;
}) {
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <ThemeProvider
        enableSystem={true}
        defaultTheme={'system'}
        themes={['light', 'dark']}
      >
        {children}
      </ThemeProvider>
    </NextIntlClientProvider>
  );
}
