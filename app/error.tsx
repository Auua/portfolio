'use client';

import { useEffect } from 'react';
import { ErrorProps } from '@/app/_types/common';
import Header from '@/app/_components/common/Header';
import Button from '@/app/_components/common/Button';

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // TODO logging service
    // eslint-disable-next-line no-console
    console.error(error);
  }, [error]);

  return (
    <div className={'page-container--full center'}>
      <Header title={'Error occurred'}>
        <p>Something went wrong! Unable to fetch data...</p>
      </Header>
      <Button error onClick={() => reset()}>
        Try again
      </Button>
    </div>
  );
}
