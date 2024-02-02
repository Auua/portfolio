import styles from '@/app/_styles/navigation.module.css';

import { getServerSession } from 'next-auth';
import options from '@/app/api/auth/[...nextauth]/options';
import AuthSwitch from './auth/AuthSwitch';
import LangSwitch from './lang/LangSwitch';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';

const Navbar = async ({ locale }: { locale: string }) => {
  const session = await getServerSession(options);
  const t = await getTranslations('Navbar');

  return (
    <nav className={styles.main}>
      <div className={styles.first}>
        <Link className={styles.skip} href={'#main'}>
          {t('skip')}
        </Link>
      </div>
      <span className={`${styles.centered} ${styles.label}`}>{t('name')}</span>
      <div className={styles.group}>
        <LangSwitch locale={locale} t={t} />
        <AuthSwitch session={session} t={t} />
      </div>
    </nav>
  );
};

export default Navbar;
