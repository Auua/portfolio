import '@/app/_styles/navigation.css';

import { getServerSession } from 'next-auth';
import options from '@/app/api/auth/[...nextauth]/options';
import AuthSwitch from '../auth/AuthSwitch';
import LangSwitch from '../lang/LangSwitch';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import Link from 'next/link';

const Navbar = async ({ locale }: { locale: string }) => {
  unstable_setRequestLocale(locale);

  const session = await getServerSession(options);
  const t = await getTranslations('Navbar');

  return (
    <nav>
      <Link className={'nav-item__skip'} href={'#main'}>
        {t('skip')}
      </Link>
      <h1 className={'nav-item__center'}>{t('name')}</h1>
      <div className={'nav-group__end'}>
        <LangSwitch locale={locale} t={t} />
        <AuthSwitch session={session} t={t} />
      </div>
    </nav>
  );
};

export default Navbar;
