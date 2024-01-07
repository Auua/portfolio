import { SessionProps } from '@/app/_types/common';
import { Page } from '@prisma/client';
import { getPage } from '@/app/_lib/pages';
import styles from '@/app/home/page.module.css';
import { mapParagraphs } from '@/app/_utils/uiUtils';
import Link from 'next/link';
import React from 'react';

const About = async ({ session }: SessionProps) => {
  const { title, desc }: Page = await getPage('about');
  return (
    <>
      <h2 id={`${title}--title`}>{title}</h2>
      <div className={styles.description}>
        {mapParagraphs(desc)}
        {session ? (
          <Link className={'btn btn--margin'} href={'/about'}>
            Find out more
          </Link>
        ) : (
          <p> Sign in to see more</p>
        )}
      </div>
    </>
  );
};

export default About;
