import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { Suspense } from 'react';
import Experience from '../../_components/experience/Experience';
import { PageParamProps } from '@/app/_types/common';

export default async function ExperiencePage({
  params: { locale },
}: PageParamProps) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations('Experience');
  return (
    <>
      <h1>{t('title')}</h1>
      <Suspense>
        <Experience showDetails={true} />
      </Suspense>
    </>
  );
}
