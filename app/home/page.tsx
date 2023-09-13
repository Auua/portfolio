import React, { Suspense } from 'react';
import Sidebar from '@/app/_components/navigation/Sidebar';
import Header from '@/app/_components/common/Header';
import ContactForm from '@/app/_components/form/ContactForm';
import { Page } from '@prisma/client';
import { getHomePage, getPage, getTopSkills } from '@/lib/pages';
import { SkillCard } from '@/app/_components/cards/Card';
import styles from './page.module.css';

const About = async () => {
  const { title, desc } = await getPage('about');
  return (
    <section className={`${styles.main__section} center`} id={'about'}>
      <h2>{title}</h2>
      <p>
        {desc}
      </p>
    </section>
  );
};

const TopSkills = async () => {
  const { title, excerpt, sections } = await getTopSkills();
  return (
    <section className={`${styles.main__section} center`} id={'skills'}>
      <h2>{title}</h2>
      <p>{excerpt}</p>
      <div className={styles.main__skills}>
        {sections?.map(({ skills }) => skills?.map((item, index) => (
          <div key={index} className={styles.main__skills__card}>
            <SkillCard key={`${item.title}-card`} skill={item} size={75} />
          </div>
        )))}
      </div>
    </section>
  );
};

export default async function Home() {
  const data: Page = await getHomePage();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Sidebar pageItems={data.metadata.pageItems} />
      <main className={styles.main}>
        <Header title={data.title}>
          <p style={{ whiteSpace: 'pre-line' }}>
            {data.excerpt.replace(/\\n/g, '\n')}
          </p>
        </Header>
        <Suspense fallback={<div>Loading...</div>}>
          <About />
        </Suspense>
        <Suspense fallback={<div>Loading...</div>}>
          <TopSkills />
        </Suspense>
        <Suspense fallback={<div>Loading...</div>}>
          <section className={styles.main__section} id={'contact'}>
            <h2>Contact</h2>
            <div><ContactForm /></div>
          </section>
        </Suspense>
      </main>
    </Suspense>
  );
}
