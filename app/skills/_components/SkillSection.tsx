import React from 'react';
import styles from '@/app/skills/page.module.css';
import { Section, Skill } from '@prisma/client';
import { SkillCard } from '@/app/_components/cards/Card';
import Levels from '@/app/_types/levels';

type SkillSectionProps = {
  section: Section;
  skills: Map<string, Skill[]>;
};

const levels: Levels[] = [
  Levels.Expert,
  Levels.Proficient,
  Levels.Competent,
  Levels['Adv. Beginner'],
  Levels.Novice,
];

const Level = ({
  level,
  data,
}: {
  level: Levels;
  data: Skill[] | undefined;
}) => (
  <div>
    <div
      className={` ${styles['skill-level']} ${
        styles[`skill-level--${level}`]
      } text-black`}
    >
      {Levels[level]}
    </div>
    <ul className={styles.grid__level}>
      {data?.map((section) => (
        <li key={section.id}>
          <SkillCard key={section.id} skill={section} sizes={'100%'} />
        </li>
      ))}
    </ul>
  </div>
);

const SkillSection = ({ section, skills }: SkillSectionProps) => {
  return (
    <section
      key={section.subtitle}
      className={styles.main__section}
      id={section.subtitle}
    >
      <h2>{section.subtitle}</h2>
      <div className={styles.grid__main}>
        {levels.map((level) => (
          <Level
            key={`${section.tag}:${level}`}
            level={level}
            data={skills.get(`${section.tag}:${Levels[level]}`)}
          />
        ))}
      </div>
    </section>
  );
};
export default SkillSection;
