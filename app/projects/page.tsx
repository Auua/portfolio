import Header from '@/app/_components/common/Header';
import styles from '@/app/projects/page.module.css';
import { Metadata } from 'next';
import { Page } from '@prisma/client';
import { getFullPage } from '@/app/_lib/pages';
import { getFilteredProjects, getProjectTags } from '@/app/_lib/projects';
import { mapParagraphs } from '@/app/_utils/uiUtils';
import TagRow from '@/app/projects/_components/TagRow';
import ProjectSection from '@/app/projects/_components/ProjectSection';
import { withSession } from '../_components/hoc/withSession';
import { ParamProps } from '@/app/_types/common';

const fetchData = () => getFullPage('projects');

export async function generateMetadata(): Promise<Metadata> {
  const page: Page = await fetchData();

  return {
    title: page.title,
    description: page.excerpt,
    keywords: page.metadata.keywords,
  };
}

const Projects = async ({ searchParams }: ParamProps) => {
  const searchTags = searchParams?.tags?.toString().split(',');

  const [{ title, desc }, tags, projects] = await Promise.all([
    fetchData(),
    getProjectTags(),
    getFilteredProjects(searchTags || undefined),
  ]);

  return (
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
          <TagRow data={tags} />
        </section>
        <ProjectSection projects={projects} />
      </div>
    </main>
  );
};

export default withSession('projects', Projects);
