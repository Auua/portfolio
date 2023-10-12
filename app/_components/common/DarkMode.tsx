'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import Icon from '@/app/_components/common/Icon';
import Button from '@/app/_components/common/Button';

const DarkModeButton = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Button
      classNames={'end'}
      onClick={() => (theme === 'dark' ? setTheme('light') : setTheme('dark'))}
    >
      {theme === 'dark' ? (
        <Icon icon={['far', 'moon']} style={{ fontSize: '24px' }} />
      ) : (
        <Icon icon={['far', 'sun']} style={{ fontSize: '24px' }} />
      )}
    </Button>
  );
};

export default DarkModeButton;
