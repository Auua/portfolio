import styles from '@/app/_styles/navigation.module.css';

import { auth } from '@/app/_utils/auth/config';

import AuthSwitch from './auth/AuthSwitch';
import LangSwitch from './lang/LangSwitch';
import DarkModeSwitch from './theme/DarkModeSwitch';
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
        <input
          className={styles.hamburger_menu}
          type={'checkbox'}
          id={'hamburger-menu'}
        />
        <label className={styles.hamburger} htmlFor={'hamburger-menu'}>
          <span className={styles.hamburger_line} />
          <span className={'screen-reader-only'}>menu</span>
        </label>
        <div className={styles.group}>
          <DarkModeSwitch />
          <LangSwitch locale={locale} t={t} />
          <AuthSwitch session={session} t={t} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
