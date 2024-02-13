'use client';

import { useEffect } from 'react';
import { ErrorProps } from '@/app/_types/common';
import { useTranslations } from 'next-intl';
import Error from '@/app/_components/error/Error';

export default function ErrorPage({ error, reset }: ErrorProps) {
  const t = useTranslations('Error');
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main>
      <Error statusCode={500} title={t('title')}>
        <div className={'button-row'}>
          <button onClick={() => reset()}>{t('retry')}</button>
        </div>
      </Error>
    </main>
  );
}
