import '@/app/_styles/navigation.css';

import Link from 'next/link';
import Icon from '@/app/_components/common/icons/Icon';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { getServerSession } from 'next-auth/next';
import options from '@/app/api/auth/[...nextauth]/options';
import { Session } from 'next-auth';
import DarkModeButton from '@/app/_components/navigation/DarkMode';
import AuthStatusButton from '@/app/_components/navigation/AuthStatusButton';

const name = process.env.NAME || 'Home';

const menuProps: [string, string, IconProp][] = [
  ['About', '/about', ['fas', 'user']],
  ['Skills', '/skills', ['fas', 'hammer']],
  ['Projects', '/projects', ['far', 'folder-open']],
  ['Contact', '/home#contact', ['far', 'envelope']],
];

const Navbar = async () => {
  const session: Session | null = await getServerSession(options as never);

  if (!session) {
    return (
      <div className={'navbar-container'}>
        <nav className={'navbar'}>
          <Link href={'/home'} className={'navbar__main link'}>
            <Icon icon={['fas', 'laptop-code']} /> {name}
          </Link>
          <ul id={'menu-content'}>
            <li>
              <DarkModeButton />
            </li>
            <li className={'link'}>
              <AuthStatusButton session={session} />
            </li>
          </ul>
        </nav>
      </div>
    );
  }

  return (
    <div className={'navbar-container'}>
      <nav className={'navbar'}>
        <Link href={'/home'} className={'navbar__main link'}>
          <Icon icon={['fas', 'laptop-code']} /> {name}
        </Link>
        <DarkModeButton />
        <input
          className={'hamburger-menu'}
          type={'checkbox'}
          id={'hamburger-menu'}
        />
        <label className={'hamburger'} htmlFor={'hamburger-menu'}>
          <span className={'hamburger-line'} />
          <span className={'visually--hidden'}>menu</span>
        </label>
        <div className={'hamburger-menu-content'}>
          <ul id={'menu-content'}>
            {menuProps.map(([title, url, icon], index) => (
              <li key={`${title}-${index}`} className={'link'}>
                <Link key={`${title}-${index}`} href={url}>
                  <Icon icon={icon} /> {title}
                </Link>
              </li>
            ))}
            <li key={'auth'} className={'link'}>
              <AuthStatusButton session={session} />
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};
export default Navbar;
