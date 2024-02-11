import styles from '../page.module.css';
import { useTranslations } from 'next-intl';
import { Skill } from '@prisma/client';
import TopSkills from './TopSkills';

export default function Home({ skills }: { skills: Skill[] }) {
  const t = useTranslations('Home');
  return (
    <main className={styles.main}>
      <div className={styles.content}>
        <section className={styles.about}>
          <h1 id={'main'}>{t('title')}</h1>
          <div className={styles.description}>
            <ul className={styles.aboutList}>
              {t
                .raw('content.list')
                .map(
                  (
                    {
                      title,
                      description,
                    }: { title: string; description: string },
                    index: number,
                  ) => (
                    <li key={`content-${index}`}>
                      <b>{title}</b>: {description}
                    </li>
                  ),
                )}
            </ul>
          </div>
        </section>
        <TopSkills skills={skills} session={null} />
      </div>
    </main>
  );
}
