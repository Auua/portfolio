import './globals.css';
import '@fortawesome/fontawesome-svg-core/styles.css';

import { Analytics } from '@vercel/analytics/react';
import React, { Suspense } from 'react';
import { Metadata } from 'next';
import Loading from '@/app/loading';
import { config } from '@fortawesome/fontawesome-svg-core';
import Navbar from '@/app/_components/navigation/Navbar';
import Providers from '@/app/_components/providers/Providers';
import { karla, quicksand } from './_utils/fonts';

config.autoAddCss = false;
const name = process.env.NAME || 'a Software Engineer';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: {
      default: 'Portfolio',
      template: `%s | Portfolio of ${name}`,
    },
    description: 'Welcome to my dev portfolio!',
    keywords: 'Portfolio',
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${karla.className} ${quicksand.variable}`}>
      <body>
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
