import { PageParamProps } from '@/app/_types/common';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { Suspense } from 'react';
import LoadingComponent from '@/app/_components/loading/LoadingComponent';
import Projects from '../../_components/projects/Projects';

export default async function ProjectPage({
  params: { locale },
  searchParams,
}: PageParamProps) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations('Projects');
  const searchTags = searchParams?.tags?.toString().split(',');
  return (
    <>
      <h2>{t('title')}</h2>
      <Suspense fallback={<LoadingComponent translation={t('loading')} />}>
        <Projects searchTags={searchTags} />
      </Suspense>
    </>
  );
}
