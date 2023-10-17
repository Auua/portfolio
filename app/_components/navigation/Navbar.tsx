import '@/app/_styles/navigation.css';

import Link from 'next/link';
import Icon from '@/app/_components/common/Icon';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { getServerSession } from 'next-auth/next';
import options from '@/app/api/auth/[...nextauth]/options';
import { Session } from 'next-auth';
import DarkModeButton from '@/app/_components/common/DarkMode';
import AuthStatusButton from '@/app/_components/common/AuthStatusButton';

const name = process.env.NAME || 'Home';

const Navbar = async () => {
  const session: Session | null = await getServerSession(options as never);

  const menuProps: [string, string, IconProp][] = [
    ['About', '/about', ['fas', 'user']],
    ['Skills', '/skills', ['fas', 'hammer']],
    ['Projects', '/projects', ['far', 'folder-open']],
    ['Contact', '/home#contact', ['far', 'envelope']],
  ];

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
            <li>
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
              <li key={index}>
                <Link key={index} href={url} className={'link'}>
                  <Icon icon={icon} /> {title}
                </Link>
              </li>
            ))}
            <li key={'auth'}>
              <AuthStatusButton session={session} />
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};
export default Navbar;
