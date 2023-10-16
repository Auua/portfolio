import React, { Suspense } from 'react';
import Header from '@/app/_components/common/Header';
import styles from '@/app/projects/page.module.css';
import { Metadata } from 'next';
import { Page } from '@prisma/client';
import Loading from '@/app/loading';
import { getServerSession } from 'next-auth/next';
import options from '@/app/api/auth/[...nextauth]/options';
import { redirect } from 'next/navigation';
import { getFullPage } from '@/app/_lib/pages';
import { getFilteredProjects, getProjectTags } from '@/app/_lib/projects';
import { mapParagraphs } from '@/app/_utils/uiUtils';
import TagRow from '@/app/projects/_components/TagRow';
import ProjectSection from '@/app/projects/_components/ProjectSection';

const fetchData = () => getFullPage('projects');

export async function generateMetadata(): Promise<Metadata> {
  const page: Page = await fetchData();

  return {
    title: page.title,
    description: page.excerpt,
    keywords: page.metadata.keywords,
  };
}

const Projects = async ({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) => {
  const session = await getServerSession(options as never);

  if (!session) {
    return redirect('api/auth/signin?callbackUrl=/projects');
  }

  const searchTags = searchParams?.tags?.toString().split(',');

  const [{ title, desc }, tags, projects] = await Promise.all([
    fetchData(),
    getProjectTags(),
    getFilteredProjects(searchTags || undefined),
  ]);

  return (
    <Suspense fallback={<Loading />}>
      <main className={styles.main}>
        <Header title={title} type={'highlight'} />
        <div className={styles.container}>
          <section
            className={`${styles.section__desc} ${styles.upper}`}
            id={'description'}
          >
            {mapParagraphs(desc)}
          </section>
          <section className={styles.section} id={'tags filter'}>
            <Suspense fallback={<Loading />}>
              <TagRow data={tags} />
            </Suspense>
          </section>
          <Suspense fallback={<Loading />}>
            <ProjectSection projects={projects} />
          </Suspense>
        </div>
      </main>
    </Suspense>
  );
};
export default Projects;
