import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import Skills from '../../_components/skills/Skills';
import { Suspense } from 'react';
import LevelExplanation from '../../_components/skills/LevelExplanation';
import { PageParamProps } from '@/app/_types/common';

export default async function SkillsPage({
  params: { locale },
}: PageParamProps) {
  unstable_setRequestLocale(locale);

  const t = await getTranslations('Skills');
  return (
    <>
      <h1 id={'main'}>{t('title')}</h1>
      <LevelExplanation {...t.raw('levels')} />
      <Suspense>
        <Skills sectionHeaderLevel={2} />
      </Suspense>
    </>
  );
}
