'use client';

import { ErrorProps } from '@/app/_types/common';
import { useEffect } from 'react';
import { DEFAULT_LOCALE } from '../../i18n';
import Error from '@/app/_components/error/Error';

export default function GlobalError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error, error.digest);
  }, [error]);

  return (
    <html lang={DEFAULT_LOCALE}>
      <body>
        <main>
          <Error statusCode={500} title={'Something went wrong'}>
            <button onClick={() => reset()}>Try</button>
          </Error>
        </main>
      </body>
    </html>
  );
}
