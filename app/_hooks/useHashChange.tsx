'use client';

import { useEffect } from 'react';

export const useHashChange = (callback: (name: string) => void) => {
  useEffect(() => {
    const handleHashChange = () => {
      const { hash } = window.location;
      callback(hash);
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [callback]);
};
export default useHashChange;
