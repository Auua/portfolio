import './globals.css';

import { Inter } from 'next/font/google';
import React from 'react';
import { Metadata, ResolvingMetadata } from 'next';
import { Page } from '@prisma/client';
import { getHomePage } from '@/lib/pages';

const inter = Inter({ subsets: ['latin'] });

export async function generateMetadata(
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const page: Page = await getHomePage();

  return {
    title: {
      default: page.title,
      template: `%s | ${page.title}`,
    },
    description: page.desc,
    keywords: page.metadata.keywords,
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
    <body className={inter.className}>
    {children}
    </body>
    </html>
  );
}
