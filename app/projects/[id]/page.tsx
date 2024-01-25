import styles from '@/app/projects/page.module.css';
import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/app/_components/common/Header';
import { getProject } from '@/app/_lib/projects';
import Links from '@/app/projects/_components/Links';
import ProjectSpecsSection from '@/app/projects/_components/ProjectSpecsSection';

const fetchData = (id: string) => getProject(id);

export const generateMetadata = async ({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> => {
  const project = await fetchData(params.id);
  return {
    title: project.title,
    description: project.excerpt,
    keywords: project?.tags?.toString() ?? 'portfolio project',
  };
};

const Project = async ({ params: { id } }: { params: { id: string } }) => {
  const data = await fetchData(id);

  return (
    <main className={styles.main}>
      <article className={styles.article} id={'project'}>
        <Header title={data.title} type={'banner primary'} />
        <Links url={data.url} tags={data.tags} />
        {data.desc ? (
          <section className={styles.section__desc} id={'description'}>
            {data.desc}
          </section>
        ) : null}
        {data.specs ? <ProjectSpecsSection {...data.specs} /> : null}
        <Link className={'btn'} href={'/projects'}>
          Back to projects
        </Link>
      </article>
    </main>
  );
};

export default Project;
