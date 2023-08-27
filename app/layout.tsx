import './globals.css';

import { Inter } from 'next/font/google';
import React from 'react';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: {
    default: 'Portfolio',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
    <body className={inter.className}>
    <div className="page-container">
      {children}
    </div>
    </body>
    </html>
  );
}
