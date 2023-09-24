'use client';

import '@/app/_styles/navigation.css';

import React, { Suspense, useEffect, useState } from 'react';
import Link from 'next/link';
import Icon from '@/app/_components/common/Icon';
import { PageMetadataPageItems } from '@prisma/client';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import Loading from '@/app/loading';

const Sidebar = ({ pageItems }: { pageItems: PageMetadataPageItems[] }) => {
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      { threshold: 0.5 },
    );

    const sections = document.querySelectorAll('.main__section, .main__header');
    sections.forEach((section) => {
      sectionObserver.observe(section);
    });

    return () => {
      sectionObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      const { hash } = window.location;
      setActiveSection(hash);
    };

    window.addEventListener('hashchange', handleHashChange);

    // Initial setup
    handleHashChange();

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  useEffect(() => {
    window.location.hash = activeSection;
  }, [activeSection]);

  return (
    <Suspense fallback={<Loading />}>
      <aside className='sidebar-container'>
        <div className='sidebar'>
          <ul className='sidebar__list'>
            {pageItems.sort((a, b) => a.order - b.order).map((item) => {
              const isActive = activeSection.replace('#', '') === item.slug;
              return (
                <li key={item.slug}>
                  <Link href={`#${item.slug}`} key={`${item.slug}__link`}
                        className={`sidebar__item ${isActive ? 'sidebar__item__active' : ''}`}>
                    <Icon icon={item.icon as IconProp} className='sidebar__icon' />
                    <span className='sidebar__text'>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </aside>
    </Suspense>
  );
};
export default Sidebar;
