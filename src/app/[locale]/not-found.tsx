'use client';
import Error from '@/app/_components/error/Error';
import { useRouter } from '@/i18n';
import { useTranslations } from 'next-intl';

export default function NotFound() {
  const router = useRouter();
  const t = useTranslations('Common');

  return (
    <div className={'page-container--full height center bg-primary'}>
      <main className={'main__page'}>
        <Error statusCode={404} title={'Page not found'}>
          <div className={'button-row'}>
            <button onClick={() => router.back()}>{t('goBack')}</button>
          </div>
        </Error>
      </main>
    </div>
  );
}
