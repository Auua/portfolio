import { mapParagraphs } from '@/app/_utils/ui/utils';
import styles from '../page.module.css';
import { getTranslations } from 'next-intl/server';

const Section = ({ title, content }: { title: string; content: string }) => (
  <div>
    <h2>{title}</h2>
    <p>{mapParagraphs(content)}</p>
  </div>
);

export default async function MainTabPage() {
  const t = await getTranslations('About');
  return (
    <div className={styles.content}>
      <Section title={t('overview.title')} content={t('overview.content')} />
      <Section title={t('engineer.title')} content={t('engineer.content')} />
      <Section title={t('outside.title')} content={t('outside.content')} />
    </div>
  );
}
