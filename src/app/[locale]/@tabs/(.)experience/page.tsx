import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { Suspense } from 'react';
import Experience from '../../_components/experience/Experience';
import { PageParamProps } from '@/app/_types/common';
import LoadingComponent from '@/app/_components/loading/LoadingComponent';

export default async function ExperienceTab({
  params: { locale },
}: PageParamProps) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations('Experience');
  return (
    <>
      <h2>{t('title')}</h2>
      <Suspense fallback={<LoadingComponent translation={t('loading')} />}>
        <Experience />
      </Suspense>
    </>
  );
}
