'use client';
import Form from '@/app/_components/form/ContactForm';
import LoadingComponent from '@/app/_components/loading/LoadingComponent';
import { Suspense } from 'react';

export default function ContactPage() {
  const { header, content } = Form();

  return (
    <main>
      <Suspense fallback={<LoadingComponent />}>
        <h1>{header}</h1>
        {content}
      </Suspense>
    </main>
  );
}
