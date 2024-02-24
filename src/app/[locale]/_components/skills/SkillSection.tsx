import styles from '@/app/_styles/skill.module.css';
import { Level, levels } from '@/app/_types/data';
import { Section, Skill } from '@prisma/client';
import React from 'react';
import { SkillCard } from './SkillCard';
import { SupportedLocale } from '@/app/_types/common';

const LevelSection = ({
  level,
  skills,
  locale,
}: {
  level: Level;
  skills?: Skill[];
  locale: SupportedLocale;
}) => (
  <div>
    <div>{Level[level]}</div>
    <ul>
      {skills?.map((skill) => (
        <li key={skill.id}>
          <SkillCard
            key={skill.id}
            skill={skill}
            sizes={'100%'}
            locale={locale}
          />
        </li>
      ))}
    </ul>
  </div>
);

const SkillSection = ({
  section,
  mappedSkills,
  locale,
  sectionHeaderLevel,
}: {
  section: Section;
  mappedSkills: Map<Level, Skill[]>;
  locale: SupportedLocale;
  sectionHeaderLevel: number;
}) => {
  const SectionHeaderTag =
    `h${sectionHeaderLevel}` as keyof JSX.IntrinsicElements;
  const LevelHeaderTag =
    `h${sectionHeaderLevel + 1}` as keyof JSX.IntrinsicElements;
  return (
    <section key={section.subtitle} id={section.subtitle}>
      <SectionHeaderTag>{section.subtitle}</SectionHeaderTag>
      <div className={styles.skills}>
        {levels.map((level) => (
          <div key={`${section.subtitle}-${level}`} className={styles.level}>
            <LevelHeaderTag>{level}</LevelHeaderTag>
            <ul className={styles.grid}>
              {mappedSkills.get(level as Level)?.map((skill) => (
                <li key={skill.id}>
                  <SkillCard
                    key={skill.id}
                    skill={skill}
                    sizes={'100%'}
                    locale={locale}
                  />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SkillSection;
