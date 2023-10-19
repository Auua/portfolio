import React, { Suspense } from 'react';
import Sidebar from '@/app/_components/navigation/Sidebar';
import Header from '@/app/_components/common/Header';
import ContactForm from '@/app/_components/form/ContactForm';
import { Page, PageMetadataPageItems } from '@prisma/client';
import { getPage } from '@/app/_lib/pages';
import { getServerSession } from 'next-auth/next';
import options from '@/app/api/auth/[...nextauth]/options';
import { fixNewLines } from '@/app/_utils/stringUtils';
import { Session } from 'next-auth';
import LoadingComponent from '@/app/_components/common/LoadingComponent';
import styles from './page.module.css';
import LatestProjects from '@/app/home/_components/LatestProjects';
import TopSkills from '@/app/home/_components/TopSkills';
import About from '@/app/home/_components/About';
import { Metadata } from 'next';

const fetchData = () => getPage('home');

export async function generateMetadata(): Promise<Metadata> {
  const page: Page = await fetchData();
  return {
    title: page.title,
    description: page.excerpt,
    keywords: page.metadata.keywords,
  };
}

export default async function Home() {
  const session: Session | null = await getServerSession(options as never);
  const data: Page = await fetchData();

  const filterUnauthorizedItems = (items: PageMetadataPageItems[]) => {
    if (!session) {
      return items.filter((item) => !item.auth);
    }
    return items;
  };

  return (
    <>
      <Suspense fallback={<LoadingComponent type={'sidebar'} />}>
        <Sidebar
          pageItems={filterUnauthorizedItems(data.metadata.pageItems)}
          narrow={false}
        />
      </Suspense>
      <main className={styles.main}>
        <Header title={data.title}>
          <p className={'preline'}>{fixNewLines(data.excerpt)}</p>
        </Header>
        <section className={`${styles.main__section} center`} id={'about'}>
          <Suspense fallback={<LoadingComponent type={'information'} />}>
            <About session={session} />
          </Suspense>
        </section>
        <section className={`${styles.main__section} center`} id={'skills'}>
          <Suspense fallback={<LoadingComponent type={'skills'} />}>
            <TopSkills session={session} />
          </Suspense>
        </section>
        {session ? (
          <section className={`${styles.main__section} center`} id={'projects'}>
            <Suspense fallback={<LoadingComponent type={'projects'} />}>
              <LatestProjects />
            </Suspense>
          </section>
        ) : null}
        <section className={`${styles.main__section} center`} id={'contact'}>
          <Suspense fallback={<LoadingComponent type={'contact form'} />}>
            <h2 id={'contact--title'}>Contact</h2>
            <div>
              <ContactForm />
            </div>
          </Suspense>
        </section>
      </main>
    </>
  );
}
