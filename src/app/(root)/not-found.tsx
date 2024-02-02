import Link from 'next/link';
import { DEFAULT_LOCALE, supportedLanguagesNames } from '../../../i18n';
import Error from '@/app/_components/error/Error';

export default function NotFound() {
  return (
    <html lang={DEFAULT_LOCALE}>
      <body>
        <main>
          <Error statusCode={404} title={'Page not found'}>
            <div className={'button-row'}>
              {Object.entries(supportedLanguagesNames).map(([lang, name]) => (
                <Link
                  type={'button'}
                  key={lang}
                  href={`/${lang}`}
                  locale={lang}
                >
                  {name}
                </Link>
              ))}
            </div>
          </Error>
        </main>
      </body>
    </html>
  );
}
