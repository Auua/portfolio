'use client';

import { ErrorProps } from '@/app/_types/common';
import { useEffect } from 'react';
import Button from '@/app/_components/common/Button';
import Header from '@/app/_components/common/Header';

export default function GlobalError({ error, reset }: ErrorProps) {
  useEffect(() => {
    // TODO logging service
    // eslint-disable-next-line no-console
    console.error(error);
  }, [error]);

  return (
    <html lang={'en'}>
      <body>
        <main className={'page-container--full center'}>
          <Header title={'Hmm.. We are facing some issues at the moment'} />
          <Button error onClick={() => reset()}>
            Try again
          </Button>
        </main>
      </body>
    </html>
  );
}
