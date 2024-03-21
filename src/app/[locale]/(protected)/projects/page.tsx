import LoadingComponent from '@/app/_components/loading/LoadingComponent';
import { PageParamProps } from '@/app/_types/common';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { Suspense } from 'react';
import Projects from '../../_components/projects/Projects';

export default async function ProjectsPage({
  params: { locale },
  searchParams,
}: PageParamProps) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations('Projects');
  const searchTags = searchParams?.tags?.toString().split(',');
  return (
    <>
      <h1>{t('title')}</h1>
      <Suspense fallback={<LoadingComponent translation={t('loading')} />}>
        <Projects searchTags={searchTags} />
      </Suspense>
    </>
  );
}
