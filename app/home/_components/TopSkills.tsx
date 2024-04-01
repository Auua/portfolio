import { SessionProps } from '@/app/_types/common';
import { getTopSkills } from '@/app/_lib/pages';
import styles from '@/app/home/page.module.css';
import { SkillCard } from '@/app/_components/cards/Card';
import Link from 'next/link';
import React from 'react';

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

export default TopSkills;