import React, { Suspense } from 'react';
import Sidebar from '@/app/_components/navigation/Sidebar';
import Header from '@/app/_components/common/Header';
import ContactForm from '@/app/_components/form/ContactForm';
import { Page, PageMetadataPageItems, Project } from '@prisma/client';
import { ProjectCard, SkillCard } from '@/app/_components/cards/Card';
import { getLatestProjects, getPage, getTopSkills } from '@/app/_lib/pages';
import { getServerSession } from 'next-auth/next';
import options from '@/app/api/auth/[...nextauth]/options';
import Link from 'next/link';
import { fixNewLines } from '@/app/_utils/stringUtils';
import { SessionProps } from '@/app/_types/common';
import { Session } from 'next-auth';
import { mapParagraphs } from '@/app/_utils/uiUtils';
import LoadingComponent from '@/app/_components/common/LoadingComponent';
import styles from './page.module.css';

const About = async ({ session }: SessionProps) => {
  const { title, desc }: Page = await getPage('about');
  return (
    <>
      <h2 id={`${title}--title`}>{title}</h2>
      <div className={styles.description}>
        {mapParagraphs(desc)}
        {session ? (
          <Link className={'btn'} href={'/about'}>
            Find out more
          </Link>
        ) : (
          <p> Sign in to see more</p>
        )}
      </div>
    </>
  );
};

const TopSkills = async ({ session }: SessionProps) => {
  const { title, excerpt, sections } = await getTopSkills();
  return (
    <>
      <h2 id={`${title}--title`}>{title}</h2>
      <div className={styles.description}>
        <p>{excerpt}</p>
      </div>
      <div className={styles.main__skills}>
        {sections?.map(
          ({ skills }) =>
            skills?.map((item, index) => (
              <div key={index} className={styles.main__card}>
                <SkillCard key={`${item.title}-card`} skill={item} size={100} />
              </div>
            )),
        )}
      </div>
      {session ? (
        <Link className={'btn'} href={'/skills'}>
          Check out more
        </Link>
      ) : (
        <p> Sign in to see more</p>
      )}
    </>
  );
};

const LatestProjects = async () => {
  const { title, excerpt, projects } = await getLatestProjects();
  return (
    <>
      <h2 id={`${title}--title`}>{title}</h2>
      <div>
        <p>{excerpt}</p>
      </div>
      <div className={styles.main__projects}>
        {projects?.map((project: Project) => (
          <div
            key={project.id}
            className={`${styles.main__card} ${styles['main__card--full']}`}
          >
            <ProjectCard project={project} />
          </div>
        ))}
      </div>
    </>
  );
};

export default async function Home() {
  const session: Session | null = await getServerSession(options as never);
  const data: Page = await getPage('home');

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
