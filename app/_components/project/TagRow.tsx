'use client';

import '@/app/_styles/project.css';

import React, { useCallback, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Button from '@/app/_components/common/Button';

const TagRow = ({ data }: { data: string[] }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const params = useMemo(
    () => searchParams.get('tags')?.toString().split(',') ?? [],
    [searchParams],
  );

  const createQueryString = useCallback(
    (tag: string) => {
      if (params.includes(tag)) {
        params.splice(params.indexOf(tag), 1);
      } else {
        params.push(tag);
      }
      return params.length ? `?tags=${params.join().toString()}` : '';
    },
    [params],
  );

  return (
    <div className={'row'}>
      {data ? (
        <>
          {data.map((tag, index) => (
            <div key={index}>
              <Button
                key={index}
                classNames={`${params.includes(tag) ? 'selected ' : ''
                }`}
                onClick={() => router.replace(`/projects${createQueryString(tag)}`)
                }
              >
                {tag}
              </Button>
            </div>
          ))}
        </>
      ) : (
        <>Loading...</>
      )}
    </div>
  );
};
export default TagRow;
