import { Link } from '@/i18n';
import { SessionAndTranslationsProps } from '@/app/_types/common';

export default async function AuthSwitch({
  session,
  t,
}: Pick<SessionAndTranslationsProps, 'session' | 't'>) {
  if (session) {
    return (
      <Link type={'button'} href={'/logout'}>
        {t('Login.logout')}
      </Link>
    );
  }
  return (
    <Link type={'button'} href={'/login'}>
      {t('Login.login')}
    </Link>
  );
}
