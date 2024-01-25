import React from 'react';
import styles from '@/app/skills/page.module.css';
import Header from '@/app/_components/common/Header';
import SkillSection from '@/app/skills/_components/SkillSection';
import { InfoNotification } from '@/app/_components/common/Notification';
import { fixNewLines } from '@/app/_utils/stringUtils';
import { FullPageProps } from '@/app/_types/common';

const SkillsPage = ({
  title,
  desc,
  sections,
}: Pick<FullPageProps, 'title' | 'desc' | 'sections'>) => {
  const skills = sections
    ?.sort((a, b) => a.order - b.order)
    .reduce((map, section) => {
      section?.skills?.forEach((skill) => {
        const key = `${section.tag}:${skill.level}`;
        if (!map.has(key)) {
          map.set(key, []);
        }
        map.get(key).push(skill);
      });
      return map;
    }, new Map());

  return (
    <main className={styles.main}>
      <Header title={title} type={'light'} />
      {sections?.map((item) => (
        <SkillSection key={item.tag} section={item} skills={skills} />
      ))}
      <InfoNotification
        title={'About levels'}
        message={fixNewLines(desc)}
        classValue={'margin-bottom'}
      />
    </main>
  );
};
export default SkillsPage;
