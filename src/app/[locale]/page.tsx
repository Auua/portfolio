import styles from './page.module.css';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import TopSkills from './_components/TopSkills';
import Main from './_components/Main';
import { Suspense } from 'react';
import LoadingComponent from '../_components/loading/LoadingComponent';

export default async function IndexPage({
  params,
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(params.locale);
  const t = await getTranslations('Home');
  return (
    <main className={styles.main}>
      <div className={styles.content}>
        <Main header={t('title')} list={t.raw('content.list')} />
        <div className={styles.second}>
          <Suspense fallback={<LoadingComponent />}>
            <TopSkills header={t('titleSkills')} />
          </Suspense>
          <section>
            <p className={styles.based}>- {t('based')} -</p>
            <p className={styles.clifton}>{t('clifton')}</p>
          </section>
        </div>
      </div>
    </main>
  );
}
