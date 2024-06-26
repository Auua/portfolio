'use client';

import { ThemeProvider } from 'next-themes';
import { ReactNode } from 'react';

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider defaultTheme={'dark'} themes={['light', 'dark']}>
      {children}
    </ThemeProvider>
  );
}
