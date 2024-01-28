import { getServerSession } from 'next-auth';
import options from '@/app/api/auth/[...nextauth]/options';
import AuthSwitch from '../auth/AuthSwitch';
import LangSwitch from '../lang/LangSwitch';
import { useLocale } from 'next-intl';

const Navbar = async () => {
  const session = await getServerSession(options);
  const locale = useLocale();

  return (
    <nav>
      <LangSwitch locale={locale} />
      <AuthSwitch session={session} />
    </nav>
  );
};

export default Navbar;
