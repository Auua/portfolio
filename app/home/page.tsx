import React from 'react';
import Sidebar from '@/app/_components/navigation/Sidebar';
import Header from '@/app/_components/common/Header';
import { lorem } from '@/app/_utils/dummyData';
import styles from './page.module.css';

const mainPageItems = [
  {
    title: 'Home', slug: '', order: 0, icon: ['fas', 'house'],
  },
  {
    title: 'About', slug: 'about', order: 1, icon: ['fas', 'user'],
  }, {
    title: 'Skills',
    slug: 'skills',
    order: 2,
    icon: ['fas', 'book'],
  }, {
    title: 'Projects',
    slug: 'projects',
    order: 3,
    icon: ['far', 'folder-open'],
  }, {
    title: 'Contact',
    slug: 'contact',
    order: 4,
    icon: ['far', 'envelope'],
  }];

export default function Home() {
  return (
    <>
      <Sidebar pageItems={mainPageItems}/>
      <main className={styles.main}>
        <Header title={'My Portfolio'}>
          <p>
            Web App Developer | DIY builder <br/> Unleashing creativity with
            code, fueled by coffee, building wonders, and smashing bugs!
          </p>
        </Header>
        <section className={'main__section full-background other'} id={'skills'}>
          <h2>slugger</h2>
          <p>{lorem}</p>
        </section>
      </main>
    </>
  );
}
