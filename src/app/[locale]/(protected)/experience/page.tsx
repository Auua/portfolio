import { getTranslations } from 'next-intl/server';
import { Suspense } from 'react';
import Experience from '../../_components/experience/Experience';

export default async function ExperiencePage() {
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
