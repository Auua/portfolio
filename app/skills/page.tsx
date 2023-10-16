import React, { Suspense } from 'react';
import { Metadata } from 'next';
import { Page } from '@prisma/client';
import { getServerSession } from 'next-auth/next';
import options from '@/app/api/auth/[...nextauth]/options';
import { redirect } from 'next/navigation';
import { getFullPage } from '@/app/_lib/pages';
import SkillsPage from '@/app/skills/_components/SkillsPage';
import Loading from '@/app/loading';

const fetchData = () => getFullPage('skills');

export async function generateMetadata(): Promise<Metadata> {
  const page: Page = await fetchData();

  return {
    title: page.title,
    description: page.excerpt,
    keywords: page.metadata.keywords,
  };
}

const Skills = async () => {
  const session = await getServerSession(options as never);

  if (!session) {
    return redirect('api/auth/signin?callbackUrl=/skills');
  }
  const { title, desc, sections } = await fetchData();
  return (
    <Suspense fallback={<Loading />}>
      <SkillsPage title={title} desc={desc} sections={sections} />
    </Suspense>
  );
};
export default Skills;
