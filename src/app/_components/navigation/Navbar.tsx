import styles from '@/app/_styles/navigation.module.css';

import { auth } from '@/app/_utils/auth/config';

import AuthSwitch from './auth/AuthSwitch';
import LangSwitch from './lang/LangSwitch';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';

const Navbar = async ({ locale }: { locale: string }) => {
  const sessionPromise = auth();
  const tPromise = getTranslations('Navbar');

  const [t, session] = await Promise.all([tPromise, sessionPromise]);

  return (
    <nav className={styles.placeholder}>
      <div className={styles.main}>
        <div className={styles.first}>
          <Link className={styles.skip} href={'#main'}>
            {t('skip')}
          </Link>
        </div>
        <span className={`${styles.centered} ${styles.label}`}>
          {t('name')}
        </span>
        <div className={styles.group}>
          <LangSwitch locale={locale} t={t} />
          <AuthSwitch session={session} t={t} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
