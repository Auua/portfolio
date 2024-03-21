'use client';
import styles from '@/app/_styles/project.module.css';
import { useCallback, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

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
    <div className={styles.row}>
      {data ? (
        <>
          {data.map((tag, index) => (
            <div key={index}>
              <button
                key={index}
                className={`${params.includes(tag) ? `${styles.selected}` : ''}`}
                onClick={() =>
                  router.replace(`/projects${createQueryString(tag)}`, {
                    scroll: false,
                  })
                }
              >
                {tag}
              </button>
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
