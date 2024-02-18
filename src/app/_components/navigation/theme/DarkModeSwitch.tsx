'use client';
import { useCallback, useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { BsFillMoonStarsFill, BsFillSunFill } from 'react-icons/bs';

const DarkModeSwitch = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, systemTheme } = useTheme();

  const setThemeCallback = useCallback(() => {
    setTheme(systemTheme ?? 'dark');
  }, [setTheme, systemTheme]);

  useEffect(() => {
    setMounted(true);
    setThemeCallback();
  }, [setThemeCallback]);

  if (!mounted) {
    return null;
  }

  return (
    <button
      className={'ghost'}
      aria-label={`Change app theme to ${theme === 'dark' ? 'light' : 'dark'}`}
      onClick={() => (theme === 'dark' ? setTheme('light') : setTheme('dark'))}
      style={{ fontSize: '1.3rem' }}
    >
      {theme === 'dark' ? <BsFillMoonStarsFill /> : <BsFillSunFill />}
    </button>
  );
};

export default DarkModeSwitch;
