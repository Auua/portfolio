import './globals.css';
import '@fortawesome/fontawesome-svg-core/styles.css';

import { Analytics } from '@vercel/analytics/react';
import { Inter } from 'next/font/google';
import React, { Suspense } from 'react';
import { Metadata } from 'next';
import { Page } from '@prisma/client';
import Loading from '@/app/loading';
import { getPage } from '@/app/_lib/pages';
import { config } from '@fortawesome/fontawesome-svg-core';
import Navbar from '@/app/_components/navigation/Navbar';
import Providers from '@/app/_components/providers/Providers';

config.autoAddCss = false;

const inter = Inter({ subsets: ['latin'] });

export async function generateMetadata(): Promise<Metadata> {
  try {
    const page: Page = await getPage('home');
    return {
      title: {
        default: page.title,
        template: `%s | ${page.title}`,
      },
      description: page.desc,
      keywords: page.metadata.keywords,
    };
  } catch (error) {
    return {
      title: {
        default: 'Portfolio',
        template: '%s | Portfolio',
      },
      description: 'Welcome',
      keywords: 'Portfolio',
    };
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
    <body className={inter.className}>
    <Providers>
      <Suspense fallback={<Loading />}>
        <Navbar />
        {children}
      </Suspense>
    </Providers>
    <Analytics />
    </body>
    </html>
  );
}
