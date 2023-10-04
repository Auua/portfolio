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
import TagRow from '@/app/_components/project/TagRow';
import { getFilteredProjects, getProjectTags } from '@/app/_lib/projects';
import { ProjectCard } from '@/app/_components/cards/Card';
import { mapParagraphs } from '@/app/_utils/uiUtils';

const fetchData = () => getFullPage('projects');

export async function generateMetadata(): Promise<Metadata> {
  const page: Page = await fetchData();

  return {
    title: page.title,
    description: page.excerpt,
    keywords: page.metadata.keywords,
  };
}

const Projects = async ({ searchParams }: {
  searchParams: Record<string, string | string[] | undefined>;
}) => {
  const session = await getServerSession(options as any);

  if (!session) {
    redirect('api/auth/signin?callbackUrl=/projects');
  }

  const { title, desc } = await fetchData();
  const tags = await getProjectTags();
  const searchTags = searchParams?.tags?.toString().split(',');

  const projects = await getFilteredProjects(searchTags || undefined);

  return (
    <Suspense fallback={<Loading />}>
      <main className={styles.main}>
        <Header title={title} />
        <section className={styles.section__desc} id={'description'}>
          {mapParagraphs(desc)}
        </section>
        <section className={styles.section} id={'tags filter'}>
          <Suspense fallback={<Loading />}>
            <TagRow data={tags} />
          </Suspense>
        </section>
        <Suspense fallback={<Loading />}>
          <section className={styles.section__projects} id={'projects'}>
            {projects.length ? (
              <div className={styles.grid__main}>
                {projects.map((project, index) => (
                  <ProjectCard key={index} project={project} />
                ))}
              </div>
            ) : (
              <div>No projects found...</div>
            )}
          </section>
        </Suspense>
      </main>
    </Suspense>
  );
};
export default Projects;
