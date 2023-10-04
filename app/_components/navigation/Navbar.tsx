import '@/app/_styles/navigation.css';

import Link from 'next/link';
import AuthStatusButton from '@/app/_components/auth/AuthStatusButton';
import Icon from '@/app/_components/common/Icon';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { getServerSession } from 'next-auth/next';
import options from '@/app/api/auth/[...nextauth]/options';
import { Session } from 'next-auth';

const name = process.env.NAME || 'Home';

const Navbar = async () => {
  const session: Session | null = await getServerSession(options as any);

  const menuProps: [string, string, IconProp][] = [
    [
      'About',
      '/about',
      ['fas', 'user'],
    ],
    [
      'Skills',
      '/skills',
      ['fas', 'hammer'],
    ],
    [
      'Projects',
      '/projects',
      ['fas', 'folder-open'],
    ],
    [
      'Contact',
      '/home#contact',
      ['fas', 'envelope'],
    ],
  ];

  if (!session) {
    return (
      <div className={'navbar-container'}>
        <nav className={'navbar'}>
          <Link href={'/home'} className={'navbar__main'}>
            <Icon icon={['fas', 'laptop-code']} /> {name}
          </Link>
          <ul id={'menu-content'}>
            <li><AuthStatusButton session={session} /></li>
          </ul>
        </nav>
      </div>
    );
  }

  return (
    <div className={'navbar-container'}>
      <nav className={'navbar'}>
        <Link href={'/home'} className={'navbar__main'}>
          <Icon icon={['fas', 'laptop-code']} /> {name}
        </Link>
        <input className={'hamburger-menu'} type={'checkbox'} id={'hamburger-menu'} />
        <label className={'hamburger'} htmlFor={'hamburger-menu'}><span className={'hamburger-line'}></span></label>
        <div className={'hamburger-menu-content'}>
          <ul id={'menu-content'}>
            {menuProps.map(([title, url, icon], index) => (
              <li key={index}>
                <Link key={index} href={url}>
                  <Icon icon={icon} /> {title}
                </Link>
              </li>
            ))}
            <li key={'auth'}><AuthStatusButton session={session} /></li>
          </ul>
        </div>
      </nav>
    </div>
  );
};
export default Navbar;
