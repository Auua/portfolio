import styles from '../page.module.css';
import { SessionProps } from '@/app/_types/common';
import { useTranslations } from 'next-intl';
import { Skill } from '@prisma/client';
import { SkillCard } from '@/app/_components/skill/SkillCard';

export default function TopSkills({
  skills,
}: SessionProps & { skills: Skill[] }) {
  const t = useTranslations('Home');

  return (
    <section className={styles.skills}>
      <h2>{t('titleSkills')}</h2>
      <div className={styles.skillList}>
        {skills.map((skill) => (
          <div key={skill.id} className={styles.description}>
            <SkillCard skill={skill} size={75} />
          </div>
        ))}
      </div>
    </section>
  );
}
