import React, { Suspense } from 'react';
import Header from '@/app/_components/common/Header';
import styles from '@/app/about/page.module.css';
import { Metadata } from 'next';
import { Page } from '@prisma/client';
import Loading from '@/app/loading';
import { getServerSession } from 'next-auth/next';
import options from '@/app/api/auth/[...nextauth]/options';
import { redirect } from 'next/navigation';
import { getFullPage } from '@/app/_lib/pages';
import TimelineEvent from '@/app/_components/cards/TimelineEvent';
import { mapParagraphs } from '@/app/_utils/uiUtils';

export async function generateMetadata(): Promise<Metadata> {
  const page: Page = await getFullPage('about');

  return {
    title: page.title,
    description: page.excerpt,
    keywords: page.metadata.keywords,
  };
}

const fetchData = () => getFullPage('about');

const About = async () => {
  const session = await getServerSession(options as any);

  if (!session) {
    redirect('api/auth/signin?callbackUrl=/about');
  }

  const { title, sections } = (await fetchData());

  return (
    <Suspense fallback={<Loading />}>
      <main className={styles.main}>
        <Header title={title} />
        {sections?.sort((a, b) => a.order - b.order).map((item) => (
          <section key={item.subtitle} className={styles.main__section} id={item.subtitle}>
            <h2>{item.subtitle}</h2>
            <div>
              {mapParagraphs(item.content)}
            </div>
            <div className={styles.timeline__section}>
              <ul className={styles.timeline}>
                {item.timeline?.map((event) => <li key={event.id}>
                  <TimelineEvent
                    id={event.id} end={event.end} location={event.location}
                    main={event.main} sub={event.sub}
                    extra={event.extra}
                  />
                </li>)}
              </ul>
            </div>
          </section>
        ))}
      </main>
    </Suspense>
  );
};
export default About;
