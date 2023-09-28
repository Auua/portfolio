import React, { Suspense } from 'react';
import Sidebar from '@/app/_components/navigation/Sidebar';
import Header from '@/app/_components/common/Header';
import ContactForm from '@/app/_components/form/ContactForm';
import { Page, PageMetadataPageItems } from '@prisma/client';
import { SkillCard } from '@/app/_components/cards/Card';
import Loading from '@/app/loading';
import { getPage, getTopSkills } from '@/app/_lib/pages';
import { getServerSession } from 'next-auth/next';
import options from '@/app/api/auth/[...nextauth]/options';
import Link from 'next/link';
import Button from '@/app/_components/common/Button';
import { fixNewLines } from '@/app/_utils/stringUtils';
import { SessionProps } from '@/app/_types/common';
import { Session } from 'next-auth';
import styles from './page.module.css';

const About = async ({ session }: SessionProps) => {
  const { title, desc }: Page = await getPage('about');
  return (
    <section className={`${styles.main__section} center`} id={'about'}>
      <h2>{title}</h2>
      <div>
        {desc.split('\n').map((text, index) => (
          <p key={`about-${index}`} className={index > 0 ? 'text-indent' : ''}>{text}</p>))}
        {session ? <Link href={'/skills'}><Button>Check out more</Button></Link>
          : <p> Sign in to see more</p>}
      </div>
    </section>
  );
};

const TopSkills = async ({ session }: SessionProps) => {
  const { title, excerpt, sections } = await getTopSkills();
  return (
    <section className={`${styles.main__section} center`} id={'skills'}>
      <h2>{title}</h2>
      <div>
        <p>{excerpt}</p>
        {session ? <Link href={'/skills'}><Button>Check out more</Button></Link>
          : <p> Sign in to see more</p>}
      </div>
      <div className={styles.main__skills}>
        {sections?.map(({ skills }) => skills?.map((item, index) => (
          <div key={index} className={styles.main__skills__card}>
            <SkillCard key={`${item.title}-card`} skill={item} size={100} />
          </div>
        )))}
      </div>
    </section>
  );
};

export default async function Home() {
  const session: Session | null = await getServerSession(options as any);
  const data: Page = await getPage('home');

  const filterUnauthorizedItems = (items: PageMetadataPageItems[]) => {
    if (!session) {
      return items.filter((item) => !item.auth);
    }
    return items;
  };

  return (
    <>
      <Sidebar pageItems={filterUnauthorizedItems(data.metadata.pageItems)} />
      <main className={styles.main}>
        <Header title={data.title}>
          <p className={'preline'}>
            {fixNewLines(data.excerpt)}
          </p>
        </Header>
        <Suspense fallback={<Loading />}>
          <About session={session} />
        </Suspense>
        <Suspense fallback={<Loading />}>
          <TopSkills session={session} />
        </Suspense>
        <Suspense fallback={<Loading />}>
          <section className={styles.main__section} id={'contact'}>
            <h2>Contact</h2>
            <div><ContactForm /></div>
          </section>
        </Suspense>
      </main>
    </>
  );
}