import { getTranslations } from 'next-intl/server';
import { Suspense } from 'react';
import Experience from '../../_components/experience/Experience';

export default async function ExperienceTab() {
  const t = await getTranslations('Experience');
  return (
    <>
      <h2>{t('title')}</h2>
      <Suspense>
        <Experience />
      </Suspense>
    </>
  );
}
