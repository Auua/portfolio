'use client';
import Error from '@/app/_components/error/Error';
import { useRouter } from '@/i18n';
import { useTranslations } from 'next-intl';

export default function Denied() {
  const router = useRouter();
  const t = useTranslations('Common');

  return (
    <Error statusCode={401} title={t('denied')}>
      <div className={'button-row'}>
        <button onClick={() => router.back()}>{t('goBack')}</button>
      </div>
    </Error>
  );
}
