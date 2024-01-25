'use client';

import { useEffect } from 'react';
import { ErrorProps } from '@/app/_types/common';
import Header from '@/app/_components/common/Header';
import Button from '@/app/_components/common/Button';
import Icon from '@/app/_components/common/icons/Icon';

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // TODO logging service
    // eslint-disable-next-line no-console
    console.error(error);
  }, [error]);

  return (
    <div className={'page-container--full height center bg-primary'}>
      <main className={'main__page'}>
        <Header title={'Error occurred'}>
          <Icon
            icon={['fas', 'triangle-exclamation']}
            style={{ height: '3rem' }}
            className={'highlight'}
          />
        </Header>
        <p>Something went wrong! Unable to fetch data...</p>
        <Button onClick={() => reset()}>Try again</Button>
      </main>
    </div>
  );
}
