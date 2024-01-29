import styles from '../page.module.css';
import { SessionProps } from '@/app/_types/common';
import { useTranslations } from 'next-intl';
import { Skill } from '@prisma/client';

export default function Home({
  session,
  skills,
}: SessionProps & { skills: Skill[] }) {
  const t = useTranslations('Home');
  console.log(session);
  return (
    <main className={styles.main}>
      <div className={styles.content}>
        <section className={styles.container}>
          <h2>{t('title')}</h2>
          <div className={styles.description}>{t('content')}</div>
        </section>
        <section className={styles.container}>
          <h2>{t('titleSkills')}</h2>
          {skills.map((skill) => (
            <div key={skill.id} className={styles.description}>
              {skill.title}
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}
