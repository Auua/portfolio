'use client';
import Error from '@/app/_components/error/Error';
import { useRouter } from '@/i18n';
import { useTranslations } from 'next-intl';

export default function NotFound() {
  const router = useRouter();
  const t = useTranslations('Common');

  return (
    <main>
      <Error statusCode={404} title={t('notFound')}>
        <div className={'button-row'}>
          <button onClick={() => router.back()}>{t('goBack')}</button>
        </div>
      </Error>
    </main>
  );
}
