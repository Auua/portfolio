import React from 'react';
import styles from '@/app/skills/page.module.css';
import { Section, Skill } from '@prisma/client';
import Levels from '@/app/_types/levels';
import { LevelSection } from './LevelSection';

type SkillSectionProps = {
  section: Section;
  skills: Map<string, Skill[]>;
};

export const levels: Levels[] = [
  Levels.Expert,
  Levels.Proficient,
  Levels.Competent,
  Levels['Adv. Beginner'],
  Levels.Novice,
];

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
          <LevelSection
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
