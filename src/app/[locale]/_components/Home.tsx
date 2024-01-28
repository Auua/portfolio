import { SessionProps } from '@/app/_types/common';
import { useTranslations } from 'next-intl';

export default function Home({ session }: SessionProps) {
  const t = useTranslations('Home');
  if (session) {
    return (
      <main>
        <h1>{t('title')} Logged in</h1>
      </main>
    );
  }

  return <main>{t('title')}</main>;
}
