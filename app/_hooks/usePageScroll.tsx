'use client';

import { useEffect } from 'react';

export const usePageScroll = (callback: (name: string) => void) => {
  useEffect(() => {
    const sections = document.querySelectorAll(
      ".main__section, .main__header, [class*='main__section'], .page-item",
    );
    const handleScroll = () => {
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (
          (rect.top >= 0 && rect.top <= window.innerHeight / 3) ||
          (rect.top < 0 && rect.bottom >= window.innerHeight / 3)
        ) {
          const sectionId = section.getAttribute('id');
          const hash = sectionId ? `#${sectionId}` : '#';
          callback(hash);
          history.replaceState(null, '', hash);
        }
      });
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [callback]);
};

export default usePageScroll;
