import React, { Suspense } from 'react';
import Header from '@/app/_components/common/Header';
import { SkillCard } from '@/app/_components/cards/Card';
import styles from '@/app/skills/page.module.css';
import { Metadata } from 'next';
import { Page, Skill } from '@prisma/client';
import Loading from '@/app/loading';
import { getServerSession } from 'next-auth/next';
import options from '@/app/api/auth/[...nextauth]/options';
import { redirect } from 'next/navigation';
import { getFullPage } from '@/app/_lib/pages';
import { Levels } from '@/app/_types/levels';
import { InfoNotification } from '@/app/_components/common/Notification';
import { fixNewLines } from '@/app/_utils/stringUtils';

export async function generateMetadata(): Promise<Metadata> {
  const page: Page = await getFullPage('skills');

  return {
    title: page.title,
    description: page.excerpt,
    keywords: page.metadata.keywords,
  };
}

const fetchData = () => getFullPage('skills');

const Level = ({ level, data }: { level: Levels; data: Skill[] }) => (
  <div>
    <div
      className={` ${styles['skill-level']} ${
        styles[`skill-level--${level}`]
      } text-black`}
    >
      {Levels[level]}
    </div>
    <ul className={styles.grid__level}>
      {data?.map((item, index) => (
        <li key={index}>
          <SkillCard key={index} skill={item} sizes={'100%'} />
        </li>
      ))}
    </ul>
  </div>
);

const Skills = async () => {
  const session = await getServerSession(options as never);

  if (!session) {
    redirect('api/auth/signin?callbackUrl=/skills');
  }

  const { title, desc, sections } = await fetchData();

  const skills = new Map();
  sections
    ?.sort((a, b) => a.order - b.order)
    .forEach((item) => {
      item?.skills?.forEach((skill) => {
        const key = `${item.tag}:${skill.level}`;
        if (skills.has(key)) {
          skills.set(key, [...skills.get(key), skill]);
        } else {
          skills.set(key, [skill]);
        }
      });
    });

  const levels: Levels[] = [
    Levels.Expert,
    Levels.Proficient,
    Levels.Competent,
    Levels['Adv. Beginner'],
    Levels.Novice,
  ];

  return (
    <Suspense fallback={<Loading />}>
      <main className={styles.main}>
        <Header title={title} type={'light'} />
        {sections?.map((item) => (
          <section
            key={item.subtitle}
            className={styles.main__section}
            id={item.subtitle}
          >
            <h2>{item.subtitle}</h2>
            <div className={styles.grid__main}>
              {levels.map((level) => (
                <Level
                  key={`${item.tag}:${level}`}
                  level={level}
                  data={skills.get(`${item.tag}:${Levels[level]}`)}
                />
              ))}
            </div>
          </section>
        ))}
        <InfoNotification
          title={'About levels'}
          message={fixNewLines(desc)}
          classValue={'margin-bottom'}
        />
      </main>
    </Suspense>
  );
};
export default Skills;
