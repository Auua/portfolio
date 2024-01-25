import styles from '../page.module.css';
import React, { Suspense } from 'react';
import Sidebar from '@/app/_components/navigation/Sidebar';
import Header from '@/app/_components/common/Header';
import { Page, PageMetadataPageItems } from '@prisma/client';
import { fixNewLines } from '@/app/_utils/stringUtils';
import LoadingComponent from '@/app/_components/common/LoadingComponent';
import { Session } from 'next-auth';
import dynamic from 'next/dynamic';

const LatestProjects = dynamic(
  () => import('@/app/home/_components/LatestProjects'),
  {
    loading: () => <LoadingComponent type={'projects'} />,
  },
);
const TopSkills = dynamic(() => import('@/app/home/_components/TopSkills'), {
  loading: () => <LoadingComponent type={'skills'} />,
});
const About = dynamic(() => import('@/app/home/_components/About'), {
  loading: () => <LoadingComponent type={'information'} />,
});
const ContactForm = dynamic(
  () => import('@/app/_components/form/ContactForm'),
  {
    loading: () => <LoadingComponent type={'contact'} />,
  },
);

interface HomeProps {
  session: Session | null;
  data: Page;
}

const filterUnauthorizedItems = (
  items: PageMetadataPageItems[],
  session: Session | null,
) => {
  if (!session) {
    return items.filter((item) => !item.auth);
  }
  return items;
};

export const Main = ({ session, data }: HomeProps) => {
  return (
    <>
      <Suspense fallback={<LoadingComponent type={'sidebar'} />}>
        <Sidebar
          pageItems={filterUnauthorizedItems(data.metadata.pageItems, session)}
          narrow={false}
        />
      </Suspense>
      <main className={styles.main}>
        <Header title={data.title}>
          <p className={'preline'}>{fixNewLines(data.excerpt)}</p>
        </Header>
        <section className={`${styles.main__section} center`} id={'about'}>
          <About session={session} />
        </section>
        <section className={`${styles.main__section} center`} id={'skills'}>
          <TopSkills session={session} />
        </section>
        {session ? (
          <section className={`${styles.main__section} center`} id={'projects'}>
            <LatestProjects />
          </section>
        ) : null}
        <section className={`${styles.main__section} center`} id={'contact'}>
          <h2 id={'contact--title'}>Contact</h2>
          <ContactForm />
        </section>
      </main>
    </>
  );
};
