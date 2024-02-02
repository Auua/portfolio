import Link from 'next/link';
import { SessionAndTranslationsProps } from '@/app/_types/common';

export default async function AuthSwitch({
  session,
  t,
}: Pick<SessionAndTranslationsProps, 'session' | 't'>) {
  if (session) {
    return (
      <Link type={'button'} href={'/api/auth/signout'}>
        {t('Login.logout')}
      </Link>
    );
  }
  return (
    <Link type={'button'} href={'/api/auth/signin'}>
      {t('Login.login')}
    </Link>
  );
}
