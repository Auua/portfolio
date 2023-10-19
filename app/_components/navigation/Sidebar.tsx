'use client';

import '@/app/_styles/navigation.css';

import React, { Suspense, useState } from 'react';
import Icon from '@/app/_components/common/Icon';
import { PageMetadataPageItems } from '@prisma/client';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import Loading from '@/app/loading';
import { useHashChange, usePageScroll } from '@/app/_hooks';

const Sidebar = ({
  pageItems,
  narrow,
}: {
  pageItems: PageMetadataPageItems[];
  narrow: boolean;
}) => {
  const [activeSection, setActiveSection] = useState('');
  const scrollToSection = (targetId: string) => {
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
      const offset = targetSection.offsetTop - 110;
      window.scrollTo({ top: offset, behavior: 'instant' });
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
    const hash = targetId ? `#${targetId}` : '#';
    setActiveSection(`#${targetId}`);
    history.replaceState(null, '', hash);
  };

  const handleActiveSection = (position: string) => {
    setActiveSection(position);
  };

  useHashChange(handleActiveSection);
  usePageScroll(handleActiveSection);

  return (
    <Suspense fallback={<Loading />}>
      <aside className={`sidebar-container${narrow ? '--narrow' : '--full'}`}>
        <div className="sidebar">
          <ul className="sidebar__list">
            {pageItems
              .sort((a, b) => a.order - b.order)
              .map((item) => {
                const isActive = activeSection.replace('#', '') === item.slug;
                return (
                  <li key={item.slug}>
                    <button
                      key={`${item.slug}__link`}
                      onClick={() => scrollToSection(item.slug)}
                      className={`sidebar__item${
                        narrow ? '--narrow' : '--full'
                      } ${isActive ? 'sidebar__item__active' : ''}`}
                    >
                      <Icon
                        icon={item.icon as IconProp}
                        className="sidebar__icon"
                      />
                      <span className="sidebar__text">{item.title}</span>
                    </button>
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
