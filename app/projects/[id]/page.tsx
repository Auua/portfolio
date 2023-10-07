import React, { Suspense } from 'react';
import styles from '@/app/projects/page.module.css';
import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/app/_components/common/Header';
import TagRow from '@/app/_components/project/TagRow';
import { getProject } from '@/app/_lib/projects';
import Loading from '@/app/loading';
import LinkRow from '@/app/_components/project/LinkRow';
import { Achievements, TechnicalApproach, UserBenefits } from '@/app/_components/project/ProjectDetails';

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
    <Suspense fallback={<Loading />}>
      <main className={styles.main}>
        <article className={styles.article} id={'project'}>
          <Header title={data.title} type={'banner primary'} />
          <section className={styles.article__column} id={'tags'}>
            {data?.url ? <LinkRow url={data.url} /> : null}
            {data?.tags ? <TagRow data={data.tags} /> : null}
          </section>
          {data.desc ? <section className={styles.section__desc} id={'description'}>{data.desc}</section> : null}
          {data.specs ? (
            <section className={styles.section} id={'specifics'}>
              {data.specs.Technical_Approach
                ? <TechnicalApproach title={'Technical_Approach'} data={data.specs.Technical_Approach} /> : null}
              {data.specs.User_Benefits
                ? <UserBenefits title={'User Benefits'} data={data.specs.User_Benefits} /> : null}
              {data.specs.Achievements ? <Achievements title={'Achievements'} data={data.specs.Achievements} /> : null}
            </section>
          ) : null}
          <Link className={'btn'} href={'/projects'}>Back to projects</Link>
        </article>
      </main>
    </Suspense>
  );
};

export default Project;
