'use client';
import styles from '@/app/_styles/tabs.module.css';
import { Link, usePathname } from '@/i18n';

const links = [
  { href: '/', title: 'About' },
  { href: '/skills', title: 'Skills' },
  { href: '/experience', title: 'Experience' },
  { href: '/projects', title: 'Projects' },
];

export default function TabBar() {
  const asPath = usePathname();

  const isActive = (path: string) => {
    return asPath === path;
  };

  return (
    <nav aria-label={'tabs'} id={'tabs'} className={styles.tabs}>
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          scroll={false}
          className={`${isActive(link.href) ? styles.active : ''} ${styles.tab}`}
        >
          {link.title}
        </Link>
      ))}
    </nav>
  );
}
