import React, { Suspense } from 'react';
import Header from '@/app/_components/common/Header';
import styles from '@/app/about/page.module.css';
import { Metadata } from 'next';
import Loading from '@/app/loading';
import { getServerSession } from 'next-auth/next';
import options from '@/app/api/auth/[...nextauth]/options';
import { redirect } from 'next/navigation';
import { getFullPage } from '@/app/_lib/pages';
import Timeline from '@/app/_components/timeline/TimelineEvents';
import { mapMultiSections } from '@/app/_utils/uiUtils';
import LoadingComponent from '@/app/_components/common/LoadingComponent';
import Sidebar from '@/app/_components/navigation/Sidebar';
import Others from '@/app/_components/timeline/Others';

const fetchData = () => getFullPage('about');

export async function generateMetadata(): Promise<Metadata> {
  const page = await fetchData();

  return {
    title: page.title,
    description: page.excerpt,
    keywords: page.metadata.keywords,
  };
}

const About = async () => {
  const session = await getServerSession(options as never);

  if (!session) {
    redirect('api/auth/signin?callbackUrl=/about');
  }

  const { title, sections, metadata } = await fetchData();

  const [about, work, education, others] = sections.sort(
    (a, b) => a.order - b.order,
  );

  return (
    <Suspense fallback={<Loading />}>
      <Suspense fallback={<LoadingComponent type={'sidebar'} />}>
        <Sidebar pageItems={metadata.pageItems} narrow={true} />
      </Suspense>
      <main className={styles.main}>
        <Header title={title} type={'banner'} />
        <section className={styles.section__about}>
          <div className={styles.grid__container}>
            {mapMultiSections(about.content)}
          </div>
        </section>
        <section className={styles.section__timeline}>
          <Timeline workData={work} educationData={education} />
        </section>
        <section
          className={`${styles.section__timeline} page-item`}
          id={'other'}
        >
          <Others otherData={others} />
        </section>
      </main>
    </Suspense>
  );
};
export default About;
