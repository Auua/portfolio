import { getTranslations } from 'next-intl/server';
import Skills from '../../_components/skills/Skills';
import { Suspense } from 'react';
import LevelExplanation from '../../_components/skills/LevelExplanation';

export default async function SkillsPage() {
  const t = await getTranslations('Skills');
  return (
    <>
      <h1>{t('title')}</h1>
      <LevelExplanation {...t.raw('levels')} />
      <Suspense>
        <Skills sectionHeaderLevel={2} />
      </Suspense>
    </>
  );
}
