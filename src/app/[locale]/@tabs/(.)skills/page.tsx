import { getTranslations } from 'next-intl/server';
import { Suspense } from 'react';
import Skills from '../../_components/skills/Skills';
import LevelExplanation from '../../_components/skills/LevelExplanation';

export default async function SkillsTab() {
  const t = await getTranslations('Skills');
  return (
    <>
      <h2>{t('title')}</h2>
      <LevelExplanation {...t.raw('levels')} />
      <Suspense>
        <Skills sectionHeaderLevel={3} />
      </Suspense>
    </>
  );
}
