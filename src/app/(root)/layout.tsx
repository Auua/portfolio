import '../globals.css';
import { DEFAULT_LOCALE, SUPPORTED_LANGUAGES } from '../../../i18n';
import { Suspense } from 'react';
import LoadingComponent from '../_components/loading/LoadingComponent';
import { Analytics } from '../_components/Analytics';

export function generateStaticParams() {
  return SUPPORTED_LANGUAGES.map((locale) => ({ locale }));
}

export default function LocaleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang={DEFAULT_LOCALE}>
      <body>
        <Suspense fallback={<LoadingComponent />}>
          {children}
          <Analytics />
        </Suspense>
      </body>
    </html>
  );
}
