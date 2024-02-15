import styles from '../page.module.css';
import { SkillCard } from '@/app/_components/skill/SkillCard';
import { SupportedLocale } from '@/app/_types/common';
import { getTopSkills } from '@/lib/skills';
import { getLocale } from 'next-intl/server';

export default async function TopSkills({ header }: { header: string }) {
  const skillData = getTopSkills();
  const localeData = getLocale();

  const [skills, locale] = await Promise.all([skillData, localeData]);

  return (
    <section className={styles.skills}>
      <h2>{header}</h2>
      <ul className={styles.skillList}>
        {skills.map((skill) => (
          <li key={skill.id} className={styles.description}>
            <SkillCard
              skill={skill}
              size={75}
              locale={locale as SupportedLocale}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
