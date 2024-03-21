import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { Suspense } from 'react';
import Skills from '../../_components/skills/Skills';
import LevelExplanation from '../../_components/skills/LevelExplanation';
import { PageParamProps } from '@/app/_types/common';
import LoadingComponent from '@/app/_components/loading/LoadingComponent';

export default async function SkillsTab({
  params: { locale },
}: PageParamProps) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations('Skills');
  return (
    <>
      <h2>{t('title')}</h2>
      <LevelExplanation {...t.raw('levels')} />
      <Suspense fallback={<LoadingComponent translation={t('loading')} />}>
        <Skills sectionHeaderLevel={3} />
      </Suspense>
    </>
  );
}
